/* FKR workflow - v4 (loads steps.json at runtime) */
(function() {
  'use strict';

  function escapeHtml(s) {
    return String(s || '')
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;');
  }

  function showFatal(title, detail) {
    let box = document.getElementById('fkr-fatal');
    if (!box) {
      box = document.createElement('div');
      box.id = 'fkr-fatal';
      box.style.position = 'fixed';
      box.style.left = '12px';
      box.style.right = '12px';
      box.style.bottom = '12px';
      box.style.zIndex = '99999';
      box.style.background = '#fff';
      box.style.border = '2px solid #b62e28';
      box.style.borderRadius = '14px';
      box.style.padding = '12px 12px';
      box.style.boxShadow = '0 10px 30px rgba(0,0,0,.25)';
      box.style.fontFamily = 'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif';
      document.body.appendChild(box);
    }
    box.innerHTML = `<div style="font-weight:900;font-size:16px;color:#b62e28;">${escapeHtml(title)}</div>
                     <div style="margin-top:6px;font-size:13px;white-space:pre-wrap;color:#111;">${escapeHtml(detail || '')}</div>`;
  }

  window.addEventListener('error', (e) => {
    const msg = e?.message || 'Unknown error';
    const src = e?.filename ? `${e.filename}:${e.lineno || ''}:${e.colno || ''}` : '';
    showFatal('JavaScript error', msg + (src ? "\n" + src : ''));
  });

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e?.reason ? (e.reason.stack || String(e.reason)) : 'Unknown rejection';
    showFatal('Unhandled promise rejection', reason);
  });

  function $(id) { return document.getElementById(id); }

  function cleanBodyHtml(html) {
    return (html || '')
      .replace(/<p[^>]*>\s*<i>\s*Section:\s*[^<]+<\/i>\s*<\/p>/gi,'')
      .replace(/class="Mso[^"]*"/g, '')
      .replace(/class=Mso[^\s>]+/g, '');
  }

  async function loadSteps() {
    const url = 'steps.json?_=' + Date.now();
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load steps.json (${res.status})`);
    return await res.json();
  }

  function initApp(STEPS) {
    if (!Array.isArray(STEPS) || STEPS.length === 0) {
      showFatal('No steps loaded', 'STEPS array is empty. Check steps.json content.');
      return;
    }

    const els = {
      jump: $('jumpSelect'),
      startOver: $('btn-startover'),
      progressLabel: $('progressLabel'),
      progressFill: $('progressFill'),
      sectionName: $('sectionName'),
      stepTitle: $('stepTitle'),
      stepBody: $('stepBody'),
      buttonsRow: $('buttonsRow'),
      helpOverlay: $('helpOverlay'),
      helpClose: $('helpClose'),
      helpTitle: $('helpTitle'),
      helpContent: $('helpContent'),
    };

    const missing = Object.entries(els).filter(([k,v]) => !v).map(([k]) => k);
    if (missing.length) {
      showFatal('Page markup mismatch', 'Missing element ids in index.html: ' + missing.join(', ') +
        '\nMake sure you replaced index.html exactly.');
      return;
    }

    let currentId = STEPS[0].id;
    let interactionType = null;

    function idxById(id) { return STEPS.findIndex(s => s.id === id); }

    function setProgress() {
      const i = idxById(currentId);
      const n = Math.max(STEPS.length, 1);
      els.progressLabel.textContent = `Step ${i >= 0 ? (i + 1) : 1}`;
      els.progressFill.style.width = `${((i+1)/n)*100}%`;
    }

    function openHelp(item) {
      els.helpTitle.textContent = item.title || 'Help';
      let html = '';
      if (item.img) html += `<img src="${item.img}" alt="${escapeHtml(item.title || 'Help')}">`;
      if (item.desc) html += `<div class="desc">${escapeHtml(item.desc)}</div>`;
      if (item.bullets && item.bullets.length) {
        html += `<ul>${item.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`;
      }
      els.helpContent.innerHTML = html || '<p>No help content available.</p>';
      els.helpOverlay.classList.add('active');
      els.helpOverlay.setAttribute('aria-hidden','false');
    }

    function closeHelp() {
      els.helpOverlay.classList.remove('active');
      els.helpOverlay.setAttribute('aria-hidden','true');
    }

    function buildButtons(step, goto) {
      els.buttonsRow.innerHTML = '';
      const btns = step.buttons || [];
      const helps = step.helps || [];

      const add = (label, style, onClick) => {
        const b = document.createElement('button');
        b.className = `btn ${style}`;
        b.type = 'button';
        b.textContent = label;
        b.addEventListener('click', onClick);
        els.buttonsRow.appendChild(b);
        return b;
      };

      function nextLinear() {
        const i = idxById(currentId);
        if (i >= 0 && i < STEPS.length - 1) goto(STEPS[i+1].id);
      }
      function prevLinear() {
        const i = idxById(currentId);
        if (i > 0) goto(STEPS[i-1].id);
      }

      btns.forEach((b) => {
        if (!b || b.kind === 'help' || b.kind === 'restart') return;

        if (b.kind === 'back') {
          add('Back', 'outline', () => {
            if (step.id === 'step4') {
              if (interactionType === 'appointment') return goto('step2');
              if (interactionType === 'walkin') return goto('step3');
            }
            prevLinear();
          });
          return;
        }

        if (step.id === 'step1') {
          const lower = (b.label || '').toLowerCase();
          if (lower.includes('scheduled')) {
            add('Scheduled appointment', 'outline', () => { interactionType = 'appointment'; goto('step2'); });
            return;
          }
          if (lower.includes('walk')) {
            add('Walk in', 'outline', () => { interactionType = 'walkin'; goto('step3'); });
            return;
          }
        }

        if (step.id === 'step4') {
          const lower = (b.label || '').toLowerCase();
          if (lower.startsWith('no')) { add(b.label, 'primary', () => goto('step5')); return; }
          if (lower.startsWith('yes')) { add(b.label, 'danger', () => goto('step26_stop')); return; }
        }

        if (step.id === 'step5') {
          const lower = (b.label || '').toLowerCase();
          if (lower.startsWith('yes')) { add(b.label, 'primary', () => goto('step6')); return; }
          if (lower.startsWith('no')) { add(b.label, 'danger', () => goto('step26_wrap')); return; }
        }

        if (b.kind === 'next') {
          add(b.label, 'primary', () => {
            if (step.id === 'step2' || step.id === 'step3') return goto('step4');
            nextLinear();
          });
          return;
        }

        if (b.kind === 'branch_no') {
          add(b.label, 'danger', () => nextLinear());
          return;
        }
      });

      const backBtn = Array.from(els.buttonsRow.children).find(x => x.textContent.trim().toLowerCase() === 'back') || null;
      helps.forEach(h => {
        const b = document.createElement('button');
        b.className = 'btn outline';
        b.type = 'button';
        b.textContent = h.title || 'Help';
        b.addEventListener('click', () => openHelp(h));
        if (backBtn) els.buttonsRow.insertBefore(b, backBtn);
        else els.buttonsRow.appendChild(b);
      });
    }

    function renderJump() {
      els.jump.innerHTML = '';
      STEPS.forEach((s, i) => {
        const opt = document.createElement('option');
        opt.value = s.id;
        let label = s.title || '';
        if (s.id === 'step26_wrap') label = 'Step 26: Wrap up - no adoption';
        if (s.id === 'step26_stop') label = 'Step 26: Stop and notify staff';
        const nice = label.replace(/^Step\s+\d+\s*:\s*/i,'');
        opt.textContent = `${i+1}. ${nice}`;
        els.jump.appendChild(opt);
      });
    }

    function goto(id) {
      const step = STEPS.find(s => s.id === id);
      if (!step) return;
      currentId = id;
      els.jump.value = id;
      els.sectionName.textContent = (step.section || '').toUpperCase() || 'WORKFLOW';
      els.stepTitle.textContent = step.title || '';
      els.stepBody.innerHTML = cleanBodyHtml(step.bodyHtml || '');
      buildButtons(step, goto);
      setProgress();
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    els.helpClose.addEventListener('click', closeHelp);
    els.helpOverlay.addEventListener('click', (e) => { if (e.target === els.helpOverlay) closeHelp(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHelp(); });

    els.startOver.addEventListener('click', () => { interactionType = null; goto('step1'); });
    els.jump.addEventListener('change', (e) => goto(e.target.value));

    renderJump();
    goto('step1');
  }

  async function boot() {
    try {
      const steps = await loadSteps();
      initApp(steps);
    } catch (e) {
      showFatal('Failed to start app', e.stack || String(e));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
