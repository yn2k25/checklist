(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const els = {
    startOverBtn: $("startOverBtn"),
    jumpSelect: $("jumpSelect"),
    progressLabel: $("progressLabel"),
    progressFill: $("progressFill"),
    phasePill: $("phasePill"),
    phasePillText: $("phasePillText"),
    stepTitle: $("stepTitle"),
    stepMeta: $("stepMeta"),
    accordion: $("accordion"),
    actions: $("actions"),
    modalBackdrop: $("modalBackdrop"),
    modal: $("modal"),
    modalTitle: $("modalTitle"),
    modalBody: $("modalBody"),
    modalClose: $("modalClose"),
  };

  const state = {
    steps: [],
    byId: new Map(),
    help: {},
    order: [],
    currentId: null,
    history: [],
  };

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function loadSteps() {
    const res = await fetch("steps.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load steps.json (${res.status})`);
    return await res.json();
  }

  function buildIndex(data) {
    const steps = Array.isArray(data.steps) ? data.steps : [];
    const help = data.helpTopics && typeof data.helpTopics === "object" ? data.helpTopics : {};

    // Sort steps by numeric id if possible, otherwise keep file order
    const normalized = steps.map((s, idx) => ({
      ...s,
      __idx: idx,
      idNum: Number.isFinite(Number(s.id)) ? Number(s.id) : null,
    }));

    normalized.sort((a, b) => {
      if (a.idNum !== null && b.idNum !== null) return a.idNum - b.idNum;
      return a.__idx - b.__idx;
    });

    state.steps = normalized;
    state.help = help;
    state.byId.clear();
    state.order = normalized.map((s) => s.id);

    for (const s of normalized) state.byId.set(s.id, s);
  }

  function setModal(open, title = "", html = "") {
    if (open) {
      els.modalTitle.textContent = title || "Help";
      els.modalBody.innerHTML = html || "";
      els.modalBackdrop.hidden = false;
      els.modal.hidden = false;
      document.body.style.overflow = "hidden";
      els.modalClose.focus({ preventScroll: true });
    } else {
      els.modalBackdrop.hidden = true;
      els.modal.hidden = true;
      els.modalBody.innerHTML = "";
      document.body.style.overflow = "";
    }
  }

  function renderHelpTopic(key) {
    const topic = state.help[key];
    if (!topic) {
      return {
        title: "Help",
        html: `<p>No help content found for key: <b>${escapeHtml(key)}</b></p>`,
      };
    }

    const title = topic.title || "Help";
    const blocks = [];

    // Support:
    // { type:"image", src:"file.png", description:"..." }
    // { type:"text", text:"..." }
    // { items:[ ... ] } multiple
    const renderOne = (t) => {
      if (!t) return "";

      if (t.type === "text") {
        const lines = Array.isArray(t.lines) ? t.lines : null;
        if (lines) {
          return `<div>
            <ul>${lines.map(li => `<li>${escapeHtml(li)}</li>`).join("")}</ul>
          </div>`;
        }
        return `<p>${escapeHtml(t.text || "")}</p>`;
      }

      if (t.type === "image") {
        const desc = t.description ? `<div class="help-desc">${escapeHtml(t.description)}</div>` : "";
        return `<div>
          <img src="${escapeHtml(t.src)}" alt="${escapeHtml(t.description || t.src)}" />
          ${desc}
        </div>`;
      }

      // shorthand {src, description}
      if (t.src) {
        const desc = t.description ? `<div class="help-desc">${escapeHtml(t.description)}</div>` : "";
        return `<div>
          <img src="${escapeHtml(t.src)}" alt="${escapeHtml(t.description || t.src)}" />
          ${desc}
        </div>`;
      }

      // fallback
      return `<pre>${escapeHtml(JSON.stringify(t, null, 2))}</pre>`;
    };

    if (Array.isArray(topic.items)) {
      for (const it of topic.items) blocks.push(renderOne(it));
    } else {
      blocks.push(renderOne(topic));
    }

    return { title, html: blocks.join("") };
  }

  function renderJump() {
    els.jumpSelect.innerHTML = "";
    for (const step of state.steps) {
      const opt = document.createElement("option");
      opt.value = String(step.id);
      opt.textContent = `${step.id}. ${step.title || ""}`.trim();
      els.jumpSelect.appendChild(opt);
    }
  }

  function setProgress(currentId) {
    const idx = state.order.indexOf(currentId);
    const total = Math.max(1, state.order.length);
    const pct = Math.round(((idx + 1) / total) * 100);

    els.progressLabel.textContent = `Step ${currentId}`;
    els.progressFill.style.width = `${pct}%`;
  }

  function renderStep(stepId, pushHistory = true) {
    const step = state.byId.get(stepId);
    if (!step) return;

    if (pushHistory && state.currentId !== null && state.currentId !== stepId) {
      state.history.push(state.currentId);
      if (state.history.length > 250) state.history.shift();
    }

    state.currentId = stepId;
    setProgress(stepId);

    // Phase pill
    const phase = step.phase || "";
    if (phase) {
      els.phasePill.hidden = false;
      els.phasePillText.textContent = String(phase).toUpperCase();
    } else {
      els.phasePill.hidden = true;
    }

    els.stepTitle.textContent = `Step ${step.id}: ${step.title || ""}`.trim();
    els.stepMeta.textContent = step.section ? `Section: ${step.section}` : "";

    // Accordion checklist
    const checklist = Array.isArray(step.checklist) ? step.checklist : [];
    els.accordion.innerHTML = checklist.map((item, i) => {
      const details = Array.isArray(item.details) ? item.details : [];
      const detailsHtml = item.detailsHtml ? String(item.detailsHtml) : "";
      const bodyParts = [];

      if (details.length) {
        bodyParts.push(`<ul>${details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`);
      }
      if (detailsHtml) {
        bodyParts.push(detailsHtml);
      }

      return `
        <div class="acc-item" data-acc="${i}">
          <button class="acc-header" type="button" data-acc-toggle="${i}">
            <span>${escapeHtml(item.title || "")}</span>
            <span class="acc-caret" aria-hidden="true"></span>
          </button>
          <div class="acc-body">
            ${bodyParts.join("")}
          </div>
        </div>
      `;
    }).join("");

    // Actions (explicit buttons)
    const buttons = Array.isArray(step.buttons) ? step.buttons : [];
    els.actions.innerHTML = buttons.map((b) => {
      const style = (b.style === "primary" || b.style === "danger" || b.style === "outline") ? b.style : "outline";
      const attrs = [];

      if (b.next !== undefined && b.next !== null) attrs.push(`data-next="${escapeHtml(b.next)}"`);
      if (b.back) attrs.push(`data-back="1"`);
      if (b.help) attrs.push(`data-help="${escapeHtml(b.help)}"`);

      return `<button type="button" class="btn ${style}" ${attrs.join(" ")}>${escapeHtml(b.label || "Continue")}</button>`;
    }).join("");

    // Sync jump
    els.jumpSelect.value = String(step.id);

    // Scroll to top of card (nice UX)
    document.querySelector(".card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startOver() {
    state.history = [];
    setModal(false);
    renderStep(state.order[0], false);
  }

  function goBack() {
    const prev = state.history.pop();
    if (prev === undefined || prev === null) return;
    setModal(false);
    renderStep(prev, false);
  }

  function goNext(nextId) {
    const idNum = Number(nextId);
    const target = Number.isFinite(idNum) ? idNum : nextId;
    if (!state.byId.has(target)) return;
    setModal(false);
    renderStep(target, true);
  }

  function wireEvents() {
    // Start over
    els.startOverBtn.addEventListener("click", startOver);

    // Jump
    els.jumpSelect.addEventListener("change", () => {
      const val = els.jumpSelect.value;
      const num = Number(val);
      const target = Number.isFinite(num) ? num : val;
      state.history = [];
      renderStep(target, false);
    });

    // Event delegation: accordion + action buttons
    document.addEventListener("click", (e) => {
      const accBtn = e.target.closest("[data-acc-toggle]");
      if (accBtn) {
        const idx = accBtn.getAttribute("data-acc-toggle");
        // One open at a time
        const all = document.querySelectorAll(".acc-item");
        all.forEach((el) => {
          if (el.getAttribute("data-acc") === idx) {
            el.classList.toggle("open");
          } else {
            el.classList.remove("open");
          }
        });
        return;
      }

      const btn = e.target.closest("#actions button");
      if (btn) {
        if (btn.dataset.next) goNext(btn.dataset.next);
        else if (btn.dataset.back) goBack();
        else if (btn.dataset.help) {
          const { title, html } = renderHelpTopic(btn.dataset.help);
          setModal(true, title, html);
        }
        return;
      }
    });

    // Modal close
    const close = () => setModal(false);
    els.modalClose.addEventListener("click", close);
    els.modalBackdrop.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modal.hidden) close();
    });
  }

  async function boot() {
    try {
      const data = await loadSteps();
      buildIndex(data);
      renderJump();
      wireEvents();
      renderStep(state.order[0], false);
    } catch (err) {
      console.error(err);
      els.stepTitle.textContent = "Error loading workflow";
      els.stepMeta.textContent = "";
      els.accordion.innerHTML = "";
      els.actions.innerHTML = "";
      els.phasePill.hidden = true;
      els.progressLabel.textContent = "Error";
      els.progressFill.style.width = "0%";
      const msg = escapeHtml(err?.message || String(err));
      els.accordion.innerHTML = `<div style="padding:12px 0;color:#b91c1c;font-weight:900;">${msg}</div>`;
    }
  }

  boot();
})();
