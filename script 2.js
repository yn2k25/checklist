
// FKR Adoption Workflow - script (v4 robust)
// Goal: make the app work even if IDs/classes vary slightly.
// - Builds step list from DOM (.step elements)
// - Builds Jump menu from those steps
// - Wires buttons based on data-btn (preferred) OR button text (fallback)
// - Does NOT show any static help panel; help is a modal opened from per-step help buttons

let steps = [];
let stepIndexById = new Map();
let currentStepId = null;
let interactionType = null; // "appointment" | "walkin"

function $(sel, root=document) { return root.querySelector(sel); }
function $all(sel, root=document) { return Array.from(root.querySelectorAll(sel)); }

function collectSteps() {
  steps = $all('.step[data-step-id]');
  if (steps.length === 0) {
    // Fallback: any .step without data-step-id gets one
    steps = $all('.step');
    steps.forEach((el, i) => {
      if (!el.getAttribute('data-step-id')) el.setAttribute('data-step-id', `step${i+1}`);
    });
  }
  stepIndexById = new Map();
  steps.forEach((el, i) => stepIndexById.set(el.getAttribute('data-step-id'), i));
}

function showStep(stepId) {
  steps.forEach(el => el.classList.remove('active'));
  const target = steps.find(el => el.getAttribute('data-step-id') === stepId);
  if (!target) return;

  currentStepId = stepId;
  target.classList.add('active');
  updateProgress();
  syncJump(stepId);
}

function updateProgress() {
  const label = $('#progress-label') || $('.progress span') || null;
  const bar = $('#progress-bar') || $('.progress-bar') || null;

  const idx = stepIndexById.get(currentStepId);
  if (idx === undefined) return;

  if (label) label.textContent = `Step ${idx + 1}`;
  if (bar) {
    const pct = ((idx + 1) / Math.max(steps.length, 1)) * 100;
    bar.style.width = `${pct}%`;
  }
}

function populateJump() {
  const select = $('#step-jump') || $('select');
  if (!select) return;

  select.innerHTML = '';
  steps.forEach((el, i) => {
    const id = el.getAttribute('data-step-id');
    const titleEl = el.querySelector('.step-title') || el.querySelector('h2,h3,.title');
    const title = (titleEl ? titleEl.textContent : `Step ${i+1}`).trim();
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${i+1}. ${title.replace(/^Step\s*\d+\s*:\s*/i,'')}`;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    const v = e.target.value;
    if (v) showStep(v);
  });
}

function syncJump(stepId) {
  const select = $('#step-jump') || $('select');
  if (!select) return;
  select.value = stepId;
}

function wireStartOver() {
  const top = $('#start-over-top') || $('button#startOver') || $('button.outline') || null;
  // Prefer the one whose text is "Start over"
  const candidates = $all('button').filter(b => (b.textContent||'').trim().toLowerCase() === 'start over');
  const btn = candidates[0] || top;
  if (!btn) return;

  btn.addEventListener('click', () => {
    interactionType = null;
    showStep(steps[0].getAttribute('data-step-id'));
  });
}

function hideMetaSections() {
  // Hide everything starting at "Buttons on this screen:" within each step body
  steps.forEach(step => {
    const body = step.querySelector('.step-body') || step;
    let hide = false;
    Array.from(body.children).forEach(el => {
      const t = (el.textContent || '').trim();
      if (!hide && t.startsWith('Buttons on this screen:')) {
        hide = true;
        el.classList.add('step-meta-hidden');
        return;
      }
      if (hide) el.classList.add('step-meta-hidden');
    });
  });
}

// ----- Help modal (per-topic buttons) -----

function ensureHelpOverlay() {
  let overlay = document.getElementById('help-overlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'help-overlay';
  overlay.className = 'help-overlay';
  overlay.innerHTML = `
    <div class="help-card" role="dialog" aria-modal="true">
      <button class="help-close" id="help-close" aria-label="Close">×</button>
      <div id="help-content"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.classList.remove('active');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  $('#help-close', overlay).addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  return overlay;
}

function openHelpModal({ title, img, desc, bullets }) {
  const overlay = ensureHelpOverlay();
  const content = document.getElementById('help-content');
  const esc = (s) => (s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');

  let html = `<div class="help-title">${esc(title)}</div>`;
  if (img) html += `<img class="help-img" src="${esc(img)}" alt="${esc(title)}">`;
  if (desc) html += `<div class="help-desc">${esc(desc)}</div>`;
  if (bullets && bullets.length) {
    html += `<div class="help-text"><ul>${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul></div>`;
  }
  content.innerHTML = html;
  overlay.classList.add('active');
}

function parseHelpBlocks(step) {
  const body = step.querySelector('.step-body') || step;
  const meta = $all('.step-meta-hidden', body);
  const text = meta.map(n => (n.textContent||'')).join('\n');
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const items = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^Help overlay text\s*\((.+?)\)\s*:?$/i);
    if (!m) { i++; continue; }

    const title = m[1].trim();
    let img = null, desc = null;
    const bullets = [];
    i++;

    while (i < lines.length && !/^Help overlay text\s*\(/i.test(lines[i])) {
      const ln = lines[i];

      const show = ln.match(/^Show\s+(.+\.(png|jpg|jpeg|webp))$/i);
      if (show) { img = show[1].trim(); i++; continue; }

      const d = ln.match(/^Description:\s*(.+)$/i);
      if (d) { desc = d[1].trim(); i++; continue; }

      bullets.push(ln);
      i++;
    }

    items.push({ title, img, desc, bullets: bullets.filter(b => !/^Show\s+/i.test(b) && !/^Description:/i.test(b)) });
  }
  return items;
}

function addHelpButtons() {
  steps.forEach(step => {
    const helps = parseHelpBlocks(step);
    if (!helps.length) return;

    const btnRow = step.querySelector('.btn-row');
    if (!btnRow) return;

    // Insert help buttons above Back if present
    const back = btnRow.querySelector('button[data-btn="back"]') ||
                 $all('button', btnRow).find(b => (b.textContent||'').trim().toLowerCase() === 'back');

    helps.forEach(h => {
      // avoid duplicates
      if ($all('button', btnRow).some(b => (b.textContent||'').trim() === h.title)) return;

      const b = document.createElement('button');
      b.className = 'outline';
      b.type = 'button';
      b.textContent = h.title;
      b.addEventListener('click', () => openHelpModal(h));
      if (back) btnRow.insertBefore(b, back);
      else btnRow.appendChild(b);
    });
  });
}

// ----- Navigation button wiring -----

function gotoNextLinear() {
  const idx = stepIndexById.get(currentStepId);
  if (idx === undefined) return;
  const next = steps[idx + 1];
  if (next) showStep(next.getAttribute('data-step-id'));
}

function gotoPrevLinear() {
  const idx = stepIndexById.get(currentStepId);
  if (idx === undefined) return;
  const prev = steps[idx - 1];
  if (prev) showStep(prev.getAttribute('data-step-id'));
}

function wireButtons() {
  steps.forEach(step => {
    const sid = step.getAttribute('data-step-id');
    const btnRow = step.querySelector('.btn-row') || step;
    const buttons = $all('button', btnRow);

    buttons.forEach(btn => {
      // Skip top bar buttons
      if (btn.id === 'start-over-top') return;

      const data = (btn.getAttribute('data-btn') || '').trim();
      const text = (btn.textContent || '').trim().toLowerCase();

      btn.addEventListener('click', () => {
        // Preferred: data-btn
        if (data) {
          if (data === 'back') return handleBack(sid);
          if (data === 'next') return handleNext(sid);
          return handleByDataBtn(sid, data);
        }

        // Fallback: by label text
        if (text === 'back') return handleBack(sid);
        if (text.includes('scheduled')) { interactionType = 'appointment'; return showStep(findStepIdLike('step2') || nextAfter(sid)); }
        if (text.includes('walk')) { interactionType = 'walkin'; return showStep(findStepIdLike('step3') || nextAfter(sid)); }
        if (text.startsWith('yes')) return handleNext(sid);
        if (text.startsWith('no')) return handleNext(sid);
      });
    });
  });
}

function nextAfter(stepId) {
  const idx = stepIndexById.get(stepId);
  if (idx === undefined) return null;
  const next = steps[idx + 1];
  return next ? next.getAttribute('data-step-id') : null;
}

function findStepIdLike(prefix) {
  // find exact "step2" etc if present
  const el = steps.find(s => s.getAttribute('data-step-id') === prefix);
  return el ? prefix : null;
}

function handleByDataBtn(stepId, btnType) {
  // Branch rules for early steps
  if (stepId === 'step1') {
    if (btnType === 'appointment') { interactionType = 'appointment'; return showStep('step2'); }
    if (btnType === 'walkin') { interactionType = 'walkin'; return showStep('step3'); }
  }

  if (stepId === 'step2' || stepId === 'step3') {
    if (btnType === 'next') return showStep('step4');
  }

  if (stepId === 'step4') {
    if (btnType === 'no_concern') return showStep('step5');
    if (btnType === 'concern') return showStep('step26');
  }

  if (stepId === 'step5') {
    if (btnType === 'yes_cat') return showStep('step6');
    if (btnType === 'no_cat') return showStep('wrap_no_adopt');
  }

  if (btnType === 'next') return gotoNextLinear();
  if (btnType === 'back') return gotoPrevLinear();
}

function handleNext(stepId) {
  // step2/3 both lead to step4 if present
  if (stepId === 'step2' || stepId === 'step3') return showStep(findStepIdLike('step4') || nextAfter(stepId));
  // otherwise linear next
  gotoNextLinear();
}

function handleBack(stepId) {
  if (stepId === 'step4') {
    if (interactionType === 'appointment') return showStep('step2');
    if (interactionType === 'walkin') return showStep('step3');
  }
  gotoPrevLinear();
}

function removeBottomStartOver() {
  // Remove any "Start over" in btn rows (keep only top)
  steps.forEach(step => {
    const btnRow = step.querySelector('.btn-row');
    if (!btnRow) return;
    $all('button', btnRow).forEach(b => {
      if ((b.textContent||'').trim().toLowerCase() === 'start over') b.remove();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  collectSteps();
  populateJump();
  wireStartOver();
  hideMetaSections();
  addHelpButtons();
  removeBottomStartOver();
  wireButtons();

  // show first step
  if (steps.length) showStep(steps[0].getAttribute('data-step-id'));
});
