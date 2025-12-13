let STEPS = [];
let HELP = {};

let currentStepIndex = 0;

const els = {
  startOverBtn: document.getElementById("startOverBtn"),
  jumpSelect: document.getElementById("jumpSelect"),
  progressLabel: document.getElementById("progressLabel"),
  progressFill: document.getElementById("progressFill"),
  stepPill: document.getElementById("stepPill"),
  stepTitle: document.getElementById("stepTitle"),
  stepBody: document.getElementById("stepBody"),
  buttonArea: document.getElementById("buttonArea"),

  modalBackdrop: document.getElementById("modalBackdrop"),
  modalTitle: document.getElementById("modalTitle"),
  modalBody: document.getElementById("modalBody"),
  modalClose: document.getElementById("modalClose"),
};

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeStepsJson(json) {
  // Accept:
  // 1) [ ... ]
  // 2) { steps: [ ... ] } or { data: [ ... ] }
  // 3) { "1": {...}, "2": {...} } (object map)
  if (Array.isArray(json)) return json;

  if (json && typeof json === "object") {
    if (Array.isArray(json.steps)) return json.steps;
    if (Array.isArray(json.data)) return json.data;

    const vals = Object.values(json);
    if (vals.length && vals.every(v => v && typeof v === "object")) return vals;
  }
  return [];
}

function openModal(title, html) {
  els.modalTitle.textContent = title || "Help";
  els.modalBody.innerHTML = html || "";
  els.modalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  els.modalBackdrop.hidden = true;
  els.modalBody.innerHTML = "";
  document.body.style.overflow = "";
}

function render() {
  const step = STEPS[currentStepIndex];
  if (!step) return;

  // progress
  els.progressLabel.textContent = `Step ${step.number}`;
  const pct = (currentStepIndex) / Math.max(1, STEPS.length - 1) * 100;
  els.progressFill.style.width = `${pct}%`;

  // pill
  els.stepPill.querySelector("span:last-child").textContent = step.pill || step.section || "";

  // title + body
  els.stepTitle.textContent = step.title || "";
  els.stepBody.innerHTML = step.bodyHtml || "";

  // buttons
  els.buttonArea.innerHTML = "";
  (step.buttons || []).forEach((b) => {
    const btn = document.createElement("button");
    btn.className = `btn ${b.style || "btn-outline"}`;
    btn.textContent = b.label || "Button";

    btn.addEventListener("click", () => {
      // Help button opens modal
      if (b.helpKey) {
        const help = HELP[b.helpKey];
        if (!help) {
          openModal(b.label, `<p>Missing help content for: <b>${escapeHtml(b.helpKey)}</b></p>`);
          return;
        }

        if (help.type === "image") {
          openModal(
            b.label,
            `<div class="helpBlock">
              <img class="helpImg" src="${escapeHtml(help.src)}" alt="${escapeHtml(help.description || b.label)}" />
              ${help.description ? `<p class="helpDesc">${escapeHtml(help.description)}</p>` : ""}
            </div>`
          );
          return;
        }

        if (help.type === "text") {
          openModal(
            b.label,
            `<div class="helpBlock">
              ${help.html ? help.html : `<p>${escapeHtml(help.text || "")}</p>`}
            </div>`
          );
          return;
        }
      }

      // navigation
      if (typeof b.goto === "number") {
        const idx = STEPS.findIndex(s => s.number === b.goto);
        if (idx >= 0) currentStepIndex = idx;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (b.action === "back") {
        currentStepIndex = Math.max(0, currentStepIndex - 1);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (b.action === "next") {
        currentStepIndex = Math.min(STEPS.length - 1, currentStepIndex + 1);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    });

    els.buttonArea.appendChild(btn);
  });

  // jump select
  els.jumpSelect.value = String(step.number);
}

async function boot() {
  const [stepsRes, helpRes] = await Promise.all([
    fetch("steps.json", { cache: "no-store" }),
    fetch("help.json", { cache: "no-store" }),
  ]);

  if (!stepsRes.ok) throw new Error("Could not load steps.json");
  if (!helpRes.ok) throw new Error("Could not load help.json");

  const rawSteps = await stepsRes.json();
  STEPS = normalizeStepsJson(rawSteps);
  HELP = await helpRes.json();

  if (!Array.isArray(STEPS) || STEPS.length === 0) {
    throw new Error("steps.json loaded but did not contain a steps array");
  }

  // populate jump dropdown
  els.jumpSelect.innerHTML = "";
  STEPS.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = String(s.number);
    opt.textContent = `${s.number}. ${s.title}`;
    els.jumpSelect.appendChild(opt);
  });

  currentStepIndex = 0;
  render();
}

els.startOverBtn.addEventListener("click", () => {
  currentStepIndex = 0;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.jumpSelect.addEventListener("change", (e) => {
  const num = Number(e.target.value);
  const idx = STEPS.findIndex(s => s.number === num);
  if (idx >= 0) currentStepIndex = idx;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.modalClose.addEventListener("click", closeModal);
els.modalBackdrop.addEventListener("click", (e) => {
  if (e.target === els.modalBackdrop) closeModal();
});

boot().catch((err) => {
  document.body.innerHTML =
    `<pre style="padding:16px;white-space:pre-wrap;">${escapeHtml(err.stack || err.message)}</pre>`;
});
