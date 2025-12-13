let STEPS = [];
let STEP_MAP = {};
let CURRENT = null;
let HISTORY = [];

/* Help content map */
const HELP = {
  cf_location: {
    title: "Where is the Consultation Form in PP?",
    image: "1-CF-in-PP.png",
    description: "Consultation Form location in PetPoint"
  },
  dna_location: {
    title: "Where to check Do Not Adopt (DNA)?",
    image: "2-DNA-in-PP.png",
    description: "DNA flag in PetPoint"
  },
  create_person: {
    title: "How to create a Person record",
    image: "3-create-person.png",
    description: "Creating a Person record in PetPoint"
  },
  edit_contact: {
    title: "How to edit contact info",
    image: "4-edit-contact.png",
    description: "Editing adopter contact details"
  }
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const res = await fetch("steps.json");
  const data = await res.json();

  STEPS = data.steps;
  STEP_MAP = Object.fromEntries(STEPS.map(s => [s.id, s]));

  buildJump();
  goTo(1);
}

/* Navigation */

function buildJump() {
  const sel = document.getElementById("jumpSelect");
  sel.innerHTML = STEPS.map(s =>
    `<option value="${s.id}">${s.id}. ${s.title}</option>`
  ).join("");

  sel.addEventListener("change", () => {
    HISTORY = [];
    goTo(Number(sel.value));
  });
}

function goTo(id) {
  if (!STEP_MAP[id]) return;
  if (CURRENT !== null) HISTORY.push(CURRENT);
  CURRENT = id;
  render(STEP_MAP[id]);
  updateProgress(id);
}

function back() {
  if (!HISTORY.length) return;
  CURRENT = HISTORY.pop();
  render(STEP_MAP[CURRENT]);
}

/* Rendering */

function render(step) {
  const c = document.getElementById("stepContainer");

  c.innerHTML = `
    <h2 class="step-title">Step ${step.id}: ${step.title}</h2>
    <div class="step-meta">Section: ${step.section}</div>

    <div class="accordion">
      ${step.checklist.map((item, i) => `
        <div class="accordion-item">
          <button class="accordion-header">${item.title}</button>
          <div class="accordion-body">
            <ul>
              ${(item.details || []).map(d => `<li>${d}</li>`).join("")}
            </ul>
            ${item.detailsHtml || ""}
          </div>
        </div>
      `).join("")}
    </div>

    <div class="actions">
      ${step.buttons.map(renderButton).join("")}
    </div>
  `;
}

function renderButton(b) {
  if (b.next) {
    return `<button class="btn ${b.style}" data-next="${b.next}">${b.label}</button>`;
  }
  if (b.back) {
    return `<button class="btn outline" data-back="1">${b.label}</button>`;
  }
  if (b.help) {
    return `<button class="btn outline" data-help="${b.help}">${b.label}</button>`;
  }
  return "";
}

/* Events */

document.addEventListener("click", e => {
  const acc = e.target.closest(".accordion-header");
  if (acc) {
    acc.parentElement.classList.toggle("open");
    return;
  }

  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.next) goTo(Number(btn.dataset.next));
  if (btn.dataset.back) back();
  if (btn.dataset.help) openHelp(btn.dataset.help);
});

/* Progress */

function updateProgress(id) {
  const pct = Math.round((id / STEPS.length) * 100);
  document.getElementById("barFill").style.width = pct + "%";
  document.getElementById("stepLabel").textContent = `Step ${id}`;
}

/* Start over */

document.getElementById("startOver").onclick = () => {
  HISTORY = [];
  goTo(1);
};

/* Help modal */

function openHelp(key) {
  const h = HELP[key];
  if (!h) return;

  document.getElementById("modalTitle").textContent = h.title;
  document.getElementById("modalBody").innerHTML = `
    <img src="${h.image}" alt="${h.description}">
    <p>${h.description}</p>
  `;

  document.getElementById("modalBackdrop").classList.remove("hidden");
  document.getElementById("helpModal").classList.remove("hidden");
}

function closeHelp() {
  document.getElementById("modalBackdrop").classList.add("hidden");
  document.getElementById("helpModal").classList.add("hidden");
}

document.getElementById("modalClose").onclick = closeHelp;
document.getElementById("modalBackdrop").onclick = closeHelp;
