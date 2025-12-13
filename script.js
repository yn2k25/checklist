// FKR Workflow App (all content from steps.json + help.json)
function getJsonFromScriptTag(id){
  const tag = document.getElementById(id);
  try { return JSON.parse(tag.textContent); } catch(e){ return null; }
}

const STEPS = getJsonFromScriptTag("steps-data") || [];
const HELP = getJsonFromScriptTag("help-data") || {};

let currentStepId = 1;
const historyStack = [];

function byId(id){ return document.getElementById(id); }

function openHelp(helpId){
  const h = HELP[helpId];
  if(!h) return;
  byId("helpTitle").textContent = h.title || "";
  const body = byId("helpBody");
  body.innerHTML = "";
  if(h.text && h.text.length){
    h.text.forEach(t=>{
      const p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });
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
  body.scrollTop = 0;
  byId("helpClose").focus();
}

function closeHelp(){
  byId("helpModal").classList.add("hidden");
}

function render(){
  const step = STEPS.find(s=>s.id===currentStepId) || STEPS[0];
  const app = byId("app");
  app.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  // Topbar
  const top = document.createElement("div");
  top.className = "topbar";
  top.innerHTML = `
    <div class="jump">
      <label for="jumpSel">Jump to step:</label>
      <select id="jumpSel"></select>
    </div>
    <button class="btn outline inline" type="button" id="startOverBtn">Start over</button>
  `;
  card.appendChild(top);

  // Jump options
  const sel = top.querySelector("#jumpSel");
  STEPS.forEach(s=>{
    const opt = document.createElement("option");
    opt.value = String(s.id);
    opt.textContent = `Step ${s.id}: ${s.title}`;
    sel.appendChild(opt);
  });
  sel.value = String(currentStepId);
  sel.addEventListener("change", ()=>{
    historyStack.push(currentStepId);
    currentStepId = Number(sel.value);
    render();
  });
  top.querySelector("#startOverBtn").addEventListener("click", ()=>{
    historyStack.length = 0;
    currentStepId = 1;
    render();
  });

  // Progress
  const prog = document.createElement("div");
  prog.className = "progress";
  const total = STEPS.length || 1;
  const pct = Math.round((currentStepId/total)*100);
  prog.innerHTML = `<div class="label">Step ${currentStepId}</div><div class="bar"><div style="width:${pct}%"></div></div>`;
  card.appendChild(prog);

  // Title/meta
  const h2 = document.createElement("h2");
  h2.textContent = `Step ${step.id}: ${step.title}`;
  card.appendChild(h2);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = [step.section ? `Section: ${step.section}` : "", step.phase ? `Phase: ${step.phase}` : ""].filter(Boolean).join(" | ");
  if(meta.textContent) card.appendChild(meta);

  // Content
  const content = document.createElement("div");
  content.innerHTML = step.html || "";
  card.appendChild(content);

  // Wire accordions
  content.querySelectorAll(".accordion").forEach(acc=>{
    const head = acc.querySelector(".acc-head");
    if(!head) return;
    head.addEventListener("click", ()=>{
      const isOpen = acc.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Wire next/back/help
  content.querySelectorAll("[data-next]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.push(currentStepId);
      const n = Number(btn.getAttribute("data-next"));
      // Step 28 means "start over"
      currentStepId = (n === 28) ? 1 : n;
      render();
    });
  });
  content.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      currentStepId = historyStack.pop() || 1;
      render();
    });
  });
  content.querySelectorAll("[data-help]").forEach(btn=>{
    btn.addEventListener("click", ()=>openHelp(btn.getAttribute("data-help")));
  });

  app.appendChild(card);
}

// Modal wiring
byId("helpClose").addEventListener("click", closeHelp);
byId("helpModal").addEventListener("click", (e)=>{ if(e.target.id==="helpModal") closeHelp(); });
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeHelp(); });

render();
