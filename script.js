(() => {
  const el = (id) => document.getElementById(id);

  const state = {
    steps: [],
    help: {},
    currentIndex: 0,
    started: false
  };

  // ------- Modal helpers -------
  const backdrop = () => el('helpBackdrop');
  const helpBody = () => el('helpBody');

  function openHelp(payload) {
    // payload can be: {title, html} OR {title, image, description} OR {title, text}
    const bd = backdrop();
    if (!bd) return;

    el('helpTitle').textContent = payload?.title || 'Help';

    const parts = [];
    if (payload?.html) parts.push(payload.html);
    if (payload?.text) parts.push(`<p>${escapeHtml(payload.text)}</p>`);
    if (payload?.description) parts.push(`<p><em>${escapeHtml(payload.description)}</em></p>`);
    if (payload?.image) parts.push(`<img src="${encodeURI(payload.image)}" alt="${escapeHtml(payload.title || 'Help image')}" />`);

    helpBody().innerHTML = parts.join('') || '<p>No help content available.</p>';

    bd.hidden = false;
    document.body.style.overflow = 'hidden';

    // focus Close for accessibility and to avoid "can't click" feeling on some overlays
    el('helpCloseBtn')?.focus({preventScroll:true});
  }

  function closeHelp() {
    const bd = backdrop();
    if (!bd) return;
    bd.hidden = true;
    helpBody().innerHTML = '';
    document.body.style.overflow = '';
  }

  // Clicking on the dim backdrop closes; clicking inside modal does not.
  function wireModal() {
    const bd = backdrop();
    if (!bd) return;

    bd.addEventListener('click', (e) => {
      if (e.target === bd) closeHelp();
    });

    el('helpCloseBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeHelp();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !bd.hidden) closeHelp();
    });
  }

  // ------- Data loading -------
  async function fetchJsonNoStore(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${path} ${res.status}`);
    return await res.json();
  }

  function normalizeStepsJson(raw) {
    // Accept: [ ... ]  OR  { steps: [ ... ] }  OR  { data: [ ... ] }
    if (Array.isArray(raw)) return raw;
    if (raw && Array.isArray(raw.steps)) return raw.steps;
    if (raw && Array.isArray(raw.data)) return raw.data;
    return [];
  }

  function normalizeHelpJson(raw) {
    // Accept map: { "<key>": { ... } } or { help: { ... } }
    if (!raw) return {};
    if (raw.help && typeof raw.help === 'object') return raw.help;
    return raw;
  }

  function computeStepNumber(step, idx) {
    // Prefer explicit numeric fields if present
    const n = step.stepNumber ?? step.step ?? step.number ?? step.num;
    if (typeof n === 'number' && isFinite(n)) return n;
    // Sometimes it's a string like "8"
    const parsed = parseInt(n, 10);
    if (!Number.isNaN(parsed)) return parsed;
    return idx + 1;
  }

  function getStepTitle(step, idx) {
    const base = step.title || step.question || step.name || '';
    const n = computeStepNumber(step, idx);
    // If title already starts with "Step X:" don't duplicate
    if (/^Step\s+\d+\s*:/i.test(base)) return base;
    return base ? `Step ${n}: ${base}` : `Step ${n}`;
  }

  function getSectionPill(step) {
    return step.pill || step.sectionPill || step.sectionLabel || step.section || ' ';
  }

  function getBodyHtml(step) {
    // The steps.json may store already-sanitized HTML in bodyHtml/contentHtml/html.
    const html = step.bodyHtml ?? step.contentHtml ?? step.html ?? '';
    if (html) return html;

    // Or it may store structured text: paragraphs, bullets, tables
    if (Array.isArray(step.paragraphs)) {
      return step.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    }
    return '';
  }

  function getActions(step) {
    // Support multiple possible field names
    const actions = step.actions || step.buttons || step.ctas || [];
    return Array.isArray(actions) ? actions : [];
  }

  function render() {
    const steps = state.steps;
    if (!steps.length) {
      el('sectionPillText').textContent = 'No steps loaded';
      el('stepTitle').textContent = 'Missing steps.json';
      el('stepBody').innerHTML = '<p>Please confirm steps.json exists at the repo root and is valid JSON.</p>';
      el('actions').innerHTML = '';
      el('progressLabel').textContent = 'Step';
      el('progressFill').style.width = '0%';
      return;
    }

    const idx = Math.max(0, Math.min(state.currentIndex, steps.length - 1));
    state.currentIndex = idx;

    const step = steps[idx];
    const n = computeStepNumber(step, idx);

    el('progressLabel').textContent = `Step ${n}`;
    el('progressFill').style.width = `${Math.round(((idx + 1) / steps.length) * 100)}%`;

    el('sectionPillText').textContent = String(getSectionPill(step)).toUpperCase();
    el('stepTitle').textContent = getStepTitle(step, idx);

    el('stepBody').innerHTML = getBodyHtml(step) || '<p></p>';

    // Actions
    const actionsEl = el('actions');
    actionsEl.innerHTML = '';

    const actions = getActions(step);

    actions.forEach((a) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn ' + (
        a.style === 'primary' ? 'btn--primary' :
        a.style === 'danger'  ? 'btn--danger' :
        'btn--outline'
      );
      btn.textContent = a.label || 'Continue';

      btn.addEventListener('click', () => {
        if (a.type === 'help') {
          // helpKey can reference help.json, or provide inline help data
          if (a.helpKey && state.help[a.helpKey]) {
            openHelp(normalizeHelpEntry(a.label, state.help[a.helpKey]));
            return;
          }
          if (a.image || a.description || a.text || a.html) {
            openHelp({ title: a.label || 'Help', image: a.image, description: a.description, text: a.text, html: a.html });
            return;
          }
          openHelp({ title: a.label || 'Help', text: 'No help content available.' });
          return;
        }

        if (a.type === 'nav') {
          // by index
          if (typeof a.toIndex === 'number') {
            state.currentIndex = a.toIndex;
            render();
            syncJump();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          // by step number
          if (typeof a.toStepNumber === 'number') {
            const target = state.steps.findIndex((s, i) => computeStepNumber(s, i) === a.toStepNumber);
            if (target >= 0) {
              state.currentIndex = target;
              render();
              syncJump();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
          }
          // by id
          if (a.toId) {
            const target = state.steps.findIndex((s) => (s.id || s.stepId || '') === a.toId);
            if (target >= 0) {
              state.currentIndex = target;
              render();
              syncJump();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
          }
        }

        if (a.type === 'back') {
          state.currentIndex = Math.max(0, state.currentIndex - 1);
          render();
          syncJump();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Default: next
        state.currentIndex = Math.min(state.steps.length - 1, state.currentIndex + 1);
        render();
        syncJump();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      actionsEl.appendChild(btn);
    });
  }

  function normalizeHelpEntry(title, entry) {
    // entry might be {image, description} or {html} or {text}
    return {
      title: title || entry.title || 'Help',
      image: entry.image || entry.img || entry.screenshot,
      description: entry.description || entry.desc,
      text: entry.text,
      html: entry.html
    };
  }

  function buildJump() {
    const sel = el('jumpSelect');
    sel.innerHTML = '';
    state.steps.forEach((s, idx) => {
      const n = computeStepNumber(s, idx);
      const base = (s.title || s.question || s.name || '').replace(/^Step\s+\d+\s*:\s*/i, '');
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = `${n}. ${base || `Step ${n}`}`;
      sel.appendChild(opt);
    });

    sel.addEventListener('change', () => {
      const idx = parseInt(sel.value, 10);
      if (!Number.isNaN(idx)) {
        state.currentIndex = idx;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  function syncJump() {
    const sel = el('jumpSelect');
    if (!sel) return;
    sel.value = String(state.currentIndex);
  }

  function wireStartOver() {
    el('startOverBtn')?.addEventListener('click', () => {
      state.currentIndex = 0;
      render();
      buildJump();
      syncJump();
      closeHelp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  async function init() {
    wireModal();
    wireStartOver();

    try {
      const [stepsRaw, helpRaw] = await Promise.all([
        fetchJsonNoStore('./steps.json'),
        // help.json is optional
        fetchJsonNoStore('./help.json').catch(() => ({}))
      ]);

      state.steps = normalizeStepsJson(stepsRaw);
      state.help = normalizeHelpJson(helpRaw);

      buildJump();
      syncJump();
      render();
    } catch (err) {
      console.error(err);
      el('sectionPillText').textContent = 'LOAD ERROR';
      el('stepTitle').textContent = 'Could not load steps.json';
      el('stepBody').innerHTML = `<p><strong>Error:</strong> ${escapeHtml(err?.message || String(err))}</p>`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
