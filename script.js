// FKR Workflow App (content from steps.json + help.json)

let STEPS = [];
let HELP = {};

let currentStepId = 1;
const historyStack = [];

function byId(id){ return document.getElementById(id); }

function showFatal(msg){
  const app = byId("app");
  if(!app) return;
  app.innerHTML = `
    <div class="card">
      <h2>Loading error</h2>
      <p style="margin-top:10px">${escapeHtml(msg)}</p>
      <p style="margin-top:10px">Tip: open <code>steps.json</code> directly in your browser to confirm it loads.</p>
    </div>
  `;
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

async function loadJson(url){
  const res = await fetch(url, { cache: "no-store" });
  if(!res.ok) throw new Error(`${url} failed: ${res.status} ${res.statusText}`);
  return await res.json();
}

function openHelp(helpId){
  const h = HELP[helpId];
  if(!h) return;

  byId("helpTitle").textContent = h.title || "";

  const body = byId("helpBody");
  body.innerHTML = "";

  if(Array.isArray(h.text)){
    h.text.forEach(t=>{
      const p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });
  }

  // IMPORTANT: your images are currently in the repo root
  // so we do NOT prefix with "images/".
  // If you later create /images/, change imageBase to "images/".
  const imageBase = ""; // or "images/"

  if(Array.isArray(h.images)){
    h.images.forEach(img=>{
      const el = document.createElement("img");
      el.src = imageBase + img;
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
  if(!Array.isArray(STEPS) || STEPS.length === 0){
    showFatal("No steps loaded. steps.json is empty or not being read.");
    return;
  }

  const step = STEPS.find(s=>Number(s.id) === Number(currentStepId)) || STEPS[0];
  currentStepId = Number(step.id);

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
    currentStepId = Number(STEPS[0].id) || 1;
    render();
  });

  // Progress
  const prog = document.createElement("div");
  prog.className = "progress";
  const total = STEPS.length || 1;
  const idx = Math.max(1, STEPS.findIndex(s=>Number(s.id)===Number(currentStepId)) + 1);
  const pct = Math.round((idx/total)*100);
  prog.innerHTML = `<div class="label">Step ${currentStepId}</div><div class="bar"><div style="width:${pct}%"></div></div>`;
  card.appendChild(prog);

  // Title/meta
  const h2 = document.createElement("h2");
  h2.textContent = `Step ${step.id}: ${step.title}`;
  card.appendChild(h2);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = [
    step.section ? `Section: ${step.section}` : "",
    step.phase ? `Phase: ${step.phase}` : ""
  ].filter(Boolean).join(" | ");
  if(meta.textContent) card.appendChild(meta);

  // Content
  const content = document.createElement("div");
  content.innerHTML = step.html || "";
  card.appendChild(content);

  // Accordions
  content.querySelectorAll(".accordion").forEach(acc=>{
    const head = acc.querySelector(".acc-head");
    if(!head) return;
    head.addEventListener("click", ()=>{
      const isOpen = acc.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Next/back/help
  content.querySelectorAll("[data-next]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.push(currentStepId);
      const n = Number(btn.getAttribute("data-next"));
      currentStepId = n || currentStepId;
      render();
    });
  });

  content.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      currentStepId = historyStack.pop() || Number(STEPS[0].id) || 1;
      render();
    });
  });

  content.querySelectorAll("[data-help]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      openHelp(btn.getAttribute("data-help"));
    });
  });

  app.appendChild(card);
}

// Modal wiring
function wireModal(){
  byId("helpClose").addEventListener("click", closeHelp);
  byId("helpModal").addEventListener("click", (e)=>{ if(e.target.id==="helpModal") closeHelp(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeHelp(); });
}

async function init(){
  try{
    // If your JSON shape is { steps: [...] } adjust here:
    const stepsRaw = await loadJson("./steps.json");
    STEPS = Array.isArray(stepsRaw) ? stepsRaw : (stepsRaw.steps || []);

    HELP = await loadJson("./help.json");

    wireModal();
    currentStepId = Number(STEPS[0]?.id) || 1;
    render();
  }catch(err){
    console.error(err);
    showFatal(err.message || String(err));
  }
}

init();
