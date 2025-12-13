
let stepId = 1;
const historyStack = [];

function byId(id){ return document.getElementById(id); }

function renderTop(shell){
  const top = document.createElement("div");
  top.className = "topbar";
  top.innerHTML = `
    <div class="jump">
      <label for="jumpSel">Jump to step:</label>
      <select id="jumpSel"></select>
    </div>
    <button class="btn outline inline" type="button" id="startOverBtn">Start over</button>
  `;
  shell.appendChild(top);

  const sel = top.querySelector("#jumpSel");
  window.FKR_STEPS.forEach(s=>{
    const opt = document.createElement("option");
    opt.value = String(s.id);
    opt.textContent = `Step ${s.id}: ${s.title}`;
    sel.appendChild(opt);
  });
  sel.value = String(stepId);
  sel.addEventListener("change", ()=>{
    historyStack.push(stepId);
    stepId = Number(sel.value);
    render();
  });

  top.querySelector("#startOverBtn").addEventListener("click", ()=>{
    historyStack.length = 0;
    stepId = 1;
    render();
  });

  const prog = document.createElement("div");
  prog.className = "progress";
  const total = window.FKR_STEPS.length || 1;
  const pct = Math.round((stepId/total)*100);
  prog.innerHTML = `
    <div class="label">Step ${stepId}</div>
    <div class="bar"><div style="width:${pct}%"></div></div>
  `;
  shell.appendChild(prog);
}

function wireAccordions(scope){
  scope.querySelectorAll(".accordion").forEach(acc=>{
    const head = acc.querySelector(".acc-head");
    if(!head) return;
    head.addEventListener("click", ()=>{
      const isOpen = acc.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

function openHelp(helpId){
  const h = window.FKR_HELP[helpId];
  if(!h) return;
  byId("helpTitle").textContent = h.title || "";
  const body = byId("helpBody");
  body.innerHTML = "";
  if(h.bodyHtml){
    body.insertAdjacentHTML("beforeend", h.bodyHtml);
  }
  if(Array.isArray(h.images)){
    h.images.forEach(img=>{
      const el = document.createElement("img");
      el.src = "images/" + img;
      el.alt = h.title || "";
      el.loading = "lazy";
      body.appendChild(el);
    });
  }
  byId("helpModal").classList.remove("hidden");
  // ensure top of modal content visible
  byId("helpBody").scrollTop = 0;
  byId("helpClose").focus();
}

function closeHelp(){
  byId("helpModal").classList.add("hidden");
}

function render(){
  const app = byId("app");
  app.innerHTML = "";

  const shell = document.createElement("div");
  shell.className = "card";

  renderTop(shell);

  const step = window.FKR_STEPS.find(s=>s.id===stepId) || window.FKR_STEPS[0];
  const h2 = document.createElement("h2");
  h2.textContent = `Step ${step.id}: ${step.title}`;
  shell.appendChild(h2);

  const meta = document.createElement("div");
  meta.className = "meta";
  const sec = step.section ? `Section: ${step.section}` : "";
  const ph = step.phase ? `Phase: ${step.phase}` : "";
  meta.textContent = [sec, ph].filter(Boolean).join(" | ");
  if(meta.textContent) shell.appendChild(meta);

  const content = document.createElement("div");
  content.innerHTML = step.html || "";
  shell.appendChild(content);

  wireAccordions(shell);

  // Next buttons
  content.querySelectorAll("[data-next]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.push(stepId);
      const n = Number(btn.getAttribute("data-next"));
      stepId = (n === 28) ? 1 : n;
      render();
    });
  });
  // Back buttons
  content.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(historyStack.length){
        stepId = historyStack.pop();
      } else {
        stepId = Math.max(1, stepId - 1);
      }
      render();
    });
  });

  // Help buttons
  content.querySelectorAll("[data-help]").forEach(btn=>{
    btn.addEventListener("click", ()=>openHelp(btn.getAttribute("data-help")));
  });

  // Modal close
  byId("helpClose").onclick = closeHelp;
  byId("helpModal").addEventListener("click", (e)=>{
    if(e.target.id === "helpModal") closeHelp();
  });
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeHelp();
  }, { once: true });

  app.appendChild(shell);
}

byId("helpClose").addEventListener("click", closeHelp);
render();
