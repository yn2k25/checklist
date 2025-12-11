// FKR Adoption Workflow v2 - navigation logic

const linearSteps = [
  "step1","step2","step3","step4","step5",
  "step6","step7","step8","step9","step10",
  "step11","step12","step13","step14","step15",
  "step16","step17","step18","step19","step20",
  "step21","step22","step23","step24","step25",
  "step26","step27"
];

// separate branch screen (Wrap up - no adoption)
const branchSteps = ["wrap_no_adopt"];

let currentStepId = "step1";
let historyStack = [];
let interactionType = null; // "appointment" or "walkin"

function showStep(stepId, pushHistory = true) {
  const all = document.querySelectorAll(".step");
  all.forEach(el => el.classList.remove("active"));

  const target = document.querySelector(`.step[data-step-id="${stepId}"]`);
  if (!target) return;

  if (pushHistory && currentStepId && currentStepId !== stepId) {
    historyStack.push(currentStepId);
  }

  currentStepId = stepId;
  target.classList.add("active");
  updateProgress();
}

function updateProgress() {
  const label = document.getElementById("progress-label");
  const bar = document.getElementById("progress-bar");
  const idx = linearSteps.indexOf(currentStepId);

  if (idx === -1) {
    label.textContent = "Branch";
    bar.style.width = "0%";
    return;
  }

  const stepNum = idx + 1;
  const total = linearSteps.length;
  label.textContent = `Step ${stepNum}`;
  bar.style.width = `${(stepNum / total) * 100}%`;
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

function handleButtonClick(stepId, btnType) {
  const idx = linearSteps.indexOf(stepId);

  switch (stepId) {
    case "step1":
      if (btnType === "appointment") {
        interactionType = "appointment";
        showStep("step2");
      } else if (btnType === "walkin") {
        interactionType = "walkin";
        showStep("step3");
      }
      break;

    case "step2":
    case "step3":
      if (btnType === "next") {
        showStep("step4");
      } else if (btnType === "back") {
        showStep("step1");
      }
      break;

    case "step4":
      if (btnType === "no_concern") {
        showStep("step5");
      } else if (btnType === "concern") {
        showStep("step26");
      } else if (btnType === "back") {
        if (interactionType === "appointment") {
          showStep("step2");
        } else if (interactionType === "walkin") {
          showStep("step3");
        } else {
          showStep("step1");
        }
      }
      break;

    case "step5":
      if (btnType === "yes_cat") {
        showStep("step6");
      } else if (btnType === "no_cat") {
        showStep("wrap_no_adopt");
      } else if (btnType === "back") {
        showStep("step4");
      }
      break;

    case "wrap_no_adopt":
      if (btnType === "finish_no_adopt") {
        showStep("step27");
      } else if (btnType === "back") {
        showStep("step5");
      }
      break;

    case "step26":
      if (btnType === "stop_staff") {
        showStep("step1");
      } else if (btnType === "back") {
        showStep("step4");
      }
      break;

    case "step27":
      if (btnType === "restart") {
        historyStack = [];
        interactionType = null;
        showStep("step1", false);
      }
      break;

    default:
      if (btnType === "next") {
        if (idx !== -1 && idx < linearSteps.length - 1) {
          showStep(linearSteps[idx + 1]);
        }
      } else if (btnType === "back") {
        if (idx > 0) {
          showStep(linearSteps[idx - 1]);
        }
      }
      break;
  }
}

function wireButtons() {
  document.querySelectorAll(".step").forEach(step => {
    step.querySelectorAll(".btn-row button").forEach(btn => {
      const type = btn.getAttribute("data-btn");
      if (!type) return;
      btn.addEventListener("click", () => {
        const sid = step.getAttribute("data-step-id");
        if (!sid) return;
        handleButtonClick(sid, type);
      });
    });
  });
}

function wireChrome() {
  const jump = document.getElementById("step-jump");
  if (jump) {
    jump.addEventListener("change", e => {
      const val = e.target.value;
      if (!val) return;
      showStep(val);
    });
  }

  const topRestart = document.getElementById("start-over-top");
  if (topRestart) {
    topRestart.addEventListener("click", () => {
      historyStack = [];
      interactionType = null;
      showStep("step1", false);
    });
  }
}

// Hide meta spec text that should not appear on the screen
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

document.addEventListener("DOMContentLoaded", () => {
  populateJumpMenu();
  wireButtons();
  wireChrome();
  hideMetaSections();
  showStep("step1", false);
});
