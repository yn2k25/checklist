// FKR Adoption Workflow - script (v3)
// - hides meta sections ("Buttons on this screen:" and below)
// - auto-creates Help buttons per "Help overlay text (TITLE):" blocks
// - opens a modal with image/text help
// - removes any old global Help panel/buttons if present

const linearSteps = [
  "step1","step2","step3","step4","step5",
  "step6","step7","step8","step9","step10",
  "step11","step12","step13","step14","step15",
  "step16","step17","step18","step19","step20",
  "step21","step22","step23","step24","step25",
  "step26","step27"
];

const branchSteps = ["wrap_no_adopt"];

let currentStepId = "step1";
let interactionType = null; // "appointment" | "walkin"

function showStep(stepId) {
  document.querySelectorAll(".step").forEach(el => el.classList.remove("active"));
  const target = document.querySelector(`.step[data-step-id="${stepId}"]`);
  if (!target) return;
  currentStepId = stepId;
  target.classList.add("active");
  updateProgress();
  syncJumpMenu(stepId);
}

function updateProgress() {
  const label = document.getElementById("progress-label");
  const bar = document.getElementById("progress-bar");
  const idx = linearSteps.indexOf(currentStepId);

  if (idx === -1) {
    if (label) label.textContent = "Branch";
    if (bar) bar.style.width = "0%";
    return;
  }

  const stepNum = idx + 1;
  const total = linearSteps.length;
  if (label) label.textContent = `Step ${stepNum}`;
  if (bar) bar.style.width = `${(stepNum / total) * 100}%`;
}

function populateJumpMenu() {
  const select = document.getElementById("step-jump");
  if (!select) return;

  select.innerHTML = "";
  linearSteps.forEach((id, i) => {
    const el = document.querySelector(`.step[data-step-id="${id}"]`);
    if (!el) return;
    const title = el.querySelector(".step-title")?.textContent || `Step ${i + 1}`;
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `${i + 1}. ${title.replace(/^Step \d+:\s*/, "")}`;
    select.appendChild(option);
  });
}

function syncJumpMenu(stepId) {
  const select = document.getElementById("step-jump");
  if (!select) return;
  if (linearSteps.includes(stepId)) select.value = stepId;
}

function wireChrome() {
  const jump = document.getElementById("step-jump");
  if (jump) {
    jump.addEventListener("change", e => {
      const val = e.target.value;
      if (val) showStep(val);
    });
  }

  const topRestart = document.getElementById("start-over-top");
  if (topRestart) {
    topRestart.addEventListener("click", () => {
      interactionType = null;
      showStep("step1");
    });
  }
}

function handleButtonClick(stepId, btnType) {
  const idx = linearSteps.indexOf(stepId);

  switch (stepId) {
    case "step1":
      if (btnType === "appointment") { interactionType = "appointment"; showStep("step2"); }
      if (btnType === "walkin") { interactionType = "walkin"; showStep("step3"); }
      break;

    case "step2":
    case "step3":
      if (btnType === "next") showStep("step4");
      if (btnType === "back") showStep("step1");
      break;

    case "step4":
      if (btnType === "no_concern") showStep("step5");
      if (btnType === "concern") showStep("step26");
      if (btnType === "back") {
        if (interactionType === "appointment") showStep("step2");
        else if (interactionType === "walkin") showStep("step3");
        else showStep("step1");
      }
      break;

    case "step5":
      if (btnType === "yes_cat") showStep("step6");
      if (btnType === "no_cat") showStep("wrap_no_adopt");
      if (btnType === "back") showStep("step4");
      break;

    case "wrap_no_adopt":
      if (btnType === "finish_no_adopt") showStep("step27");
      if (btnType === "back") showStep("step5");
      break;

    case "step26":
      if (btnType === "stop_staff") showStep("step1");
      if (btnType === "back") showStep("step4");
      break;

    case "step27":
      if (btnType === "restart") { interactionType = null; showStep("step1"); }
      break;

    default:
      if (btnType === "next" && idx !== -1 && idx < linearSteps.length - 1) showStep(linearSteps[idx + 1]);
      if (btnType === "back" && idx > 0) showStep(linearSteps[idx - 1]);
      break;
  }
}

function wireNavButtons() {
  document.querySelectorAll(".step").forEach(step => {
    step.querySelectorAll(".btn-row button").forEach(btn => {
      const type = btn.getAttribute("data-btn");
      if (!type) return;
      // help buttons are wired separately
      if (type === "help") return;
      btn.addEventListener("click", () => {
        const sid = step.getAttribute("data-step-id");
        if (!sid) return;
        handleButtonClick(sid, type);
      });
    });
  });
}

function hideMetaSections() {
  document.querySelectorAll(".step-body").forEach(body => {
    let hideFromHere = false;
    Array.from(body.children).forEach(el => {
      if (hideFromHere) {
        el.classList.add("step-meta-hidden");
        return;
      }
      const text = (el.textContent || "").trim();
      if (text.startsWith("Buttons on this screen:")) {
        hideFromHere = true;
        el.classList.add("step-meta-hidden");
      }
    });
  });
}

/* Remove any old help panels/buttons from earlier versions */
function removeOldHelpUI() {
  // remove any sections/divs that look like a static help panel
  document.querySelectorAll("section,div").forEach(el => {
    const id = (el.id || "").toLowerCase();
    const cls = (el.className || "").toString().toLowerCase();
    const txt = (el.textContent || "").trim();

    if (id.includes("help") && !id.includes("help-overlay")) {
      // keep none
      if (el.id !== "help-overlay") el.remove();
    } else if (cls.includes("help-panel") || cls.includes("help-pane") || cls.includes("helpdrawer")) {
      el.remove();
    } else if (txt === "Help" && (cls.includes("card") || cls.includes("panel"))) {
      // heuristic, avoid removing real content
    }
  });

  // remove any global "Help" buttons (not the per-topic help we create)
  document.querySelectorAll("button").forEach(b => {
    const t = (b.textContent || "").trim().toLowerCase();
    if (t === "help") b.remove();
  });
}

/* Modal help overlay */
function ensureHelpOverlay() {
  let overlay = document.getElementById("help-overlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "help-overlay";
  overlay.className = "help-overlay";
  overlay.innerHTML = `
    <div class="help-card" role="dialog" aria-modal="true">
      <button class="help-close" id="help-close" aria-label="Close">×</button>
      <div id="help-content"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.classList.remove("active");

  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelector("#help-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  return overlay;
}

function openHelpModal({ title, img, desc, bullets }) {
  const overlay = ensureHelpOverlay();
  const content = document.getElementById("help-content");
  const esc = (s) => (s || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  let html = `<div class="help-title">${esc(title)}</div>`;
  if (img) html += `<img class="help-img" src="${esc(img)}" alt="${esc(title)}">`;
  if (desc) html += `<div class="help-desc">${esc(desc)}</div>`;
  if (bullets && bullets.length) {
    html += `<div class="help-text"><ul>${bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul></div>`;
  }
  content.innerHTML = html;
  overlay.classList.add("active");
}

function parseHelpBlocksFromStep(stepEl) {
  const body = stepEl.querySelector(".step-body");
  if (!body) return [];

  const metaNodes = Array.from(body.querySelectorAll(".step-meta-hidden"));
  const metaText = metaNodes.map(n => (n.textContent || "")).join("\n");
  const lines = metaText.split("\n").map(l => l.trim()).filter(Boolean);

  const items = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^Help overlay text\s*\((.+?)\)\s*:?$/i);
    if (!m) { i += 1; continue; }

    const title = m[1].trim();
    let img = null;
    let desc = null;
    const bullets = [];
    i += 1;

    while (i < lines.length && !/^Help overlay text\s*\(/i.test(lines[i])) {
      const ln = lines[i];

      const show = ln.match(/^Show\s+(.+\.(png|jpg|jpeg|webp))$/i);
      if (show) { img = show[1].trim(); i += 1; continue; }

      const d = ln.match(/^Description:\s*(.+)$/i);
      if (d) { desc = d[1].trim(); i += 1; continue; }

      // Treat remaining lines as bullets (for text-only help)
      bullets.push(ln);
      i += 1;
    }

    const cleanBullets = bullets.filter(b => !/^Show\s+/i.test(b)).filter(b => !/^Description:\s*/i.test(b));
    items.push({ title, img, desc, bullets: cleanBullets });
  }

  return items;
}

function addHelpButtonsToSteps() {
  document.querySelectorAll(".step").forEach(stepEl => {
    const helps = parseHelpBlocksFromStep(stepEl);
    if (!helps.length) return;

    const btnRow = stepEl.querySelector(".btn-row");
    if (!btnRow) return;

    // Remove any existing outline buttons that match these help titles (prevents duplicates)
    const existing = Array.from(btnRow.querySelectorAll("button.outline"));
    helps.forEach(h => {
      existing.forEach(b => {
        if ((b.textContent || "").trim() === h.title) b.remove();
      });
    });

    const backBtn = btnRow.querySelector('button[data-btn="back"]');

    helps.forEach(h => {
      const b = document.createElement("button");
      b.className = "outline";
      b.type = "button";
      b.textContent = h.title;
      b.addEventListener("click", () => openHelpModal(h));

      if (backBtn) btnRow.insertBefore(b, backBtn);
      else btnRow.appendChild(b);
    });
  });
}

function removeBottomStartOverButtons() {
  document.querySelectorAll(".step").forEach(step => {
    const sid = step.getAttribute("data-step-id");
    if (sid !== "step27") {
      step.querySelectorAll('button[data-btn="restart"],button[data-btn="start_over"]').forEach(b => b.remove());
      step.querySelectorAll(".btn-row button").forEach(b => {
        if ((b.textContent || "").trim().toLowerCase() === "start over") b.remove();
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  removeOldHelpUI();
  populateJumpMenu();
  wireChrome();
  hideMetaSections();
  removeBottomStartOverButtons();
  addHelpButtonsToSteps();
  wireNavButtons();
  showStep("step1");
});
