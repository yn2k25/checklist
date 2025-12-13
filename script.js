// FKR Adoption Workflow - Static GitHub Pages
let STEPS = [];
let HELP = {};

let currentStepId = 1;
const historyStack = [];

const byId = (id) => document.getElementById(id);

function escHtml(s){
  return String(s ?? "").replace(/[&<>\"']/g, (c)=>({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}

function openHelp(helpId){
  const h = HELP[helpId];
  if(!h) return;
  byId("helpTitle").textContent = h.title || "Help";
  const body = byId("helpBody");
  body.innerHTML = "";
  if(Array.isArray(h.text)){
    h.text.forEach(t=>{
      const p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });
  }
  if(Array.isArray(h.images)){
    h.images.forEach(img=>{
      const el = document.createElement("img");
      el.src = img; // images can be in root or /images; doc uses filenames, so allow direct
      // If you store images in /images, update help.json to include "images/FILE.png"
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

function wireContent(root){
  // accordions
  root.querySelectorAll(".accordion").forEach(acc=>{
    const head = acc.querySelector(".acc-head");
    if(!head) return;
    head.addEventListener("click", ()=>{
      const isOpen = acc.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // next/back/startover/help
  root.querySelectorAll("[data-next]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.push(currentStepId);
      const n = Number(btn.getAttribute("data-next"));
      currentStepId = (Number.isFinite(n) && n >= 1) ? n : 1;
      render();
    });
  });
  root.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      currentStepId = historyStack.pop() || 1;
      render();
    });
  });
  root.querySelectorAll("[data-startover]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.length = 0;
      currentStepId = 1;
      render();
    });
  });
  root.querySelectorAll("[data-help]").forEach(btn=>{
    btn.addEventListener("click", ()=>openHelp(btn.getAttribute("data-help")));
  });
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
      <select id="jumpSel" aria-label="Jump to step"></select>
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

  // Progress + phase pill
  const total = STEPS.length || 1;
  const pct = Math.round((currentStepId/total)*100);
  const prog = document.createElement("div");
  prog.className = "progress";
  prog.innerHTML = `<div class="label">Step ${currentStepId}</div><div class="bar"><div style="width:${pct}%"></div></div>`;
  card.appendChild(prog);

  if(step.phase){
    const pillrow = document.createElement("div");
    pillrow.className = "pillrow";
    pillrow.innerHTML = `<span class="pill">${escHtml(step.phase)}</span>`;
    card.appendChild(pillrow);
  }

  const h2 = document.createElement("h2");
  h2.textContent = `Step ${step.id}: ${step.title}`;
  card.appendChild(h2);

  if(step.section){
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `Section: ${step.section}`;
    card.appendChild(meta);
  }

  const content = document.createElement("div");
  content.className = "content";
  content.innerHTML = step.html || "";
  card.appendChild(content);

  wireContent(content);
  app.appendChild(card);
}

// Modal wiring
function wireModal(){
  byId("helpClose").addEventListener("click", closeHelp);
  byId("helpModal").addEventListener("click", (e)=>{ if(e.target.id==="helpModal") closeHelp(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeHelp(); });
}

async function loadData(){
  const errBox = byId("loadError");
  const showErr = (msg)=>{
    errBox.textContent = msg;
    errBox.classList.remove("hidden");
  };
  try{
    const [stepsRes, helpRes] = await Promise.all([
      fetch("steps.json", {cache:"no-store"}),
      fetch("help.json", {cache:"no-store"})
    ]);
    if(!stepsRes.ok) throw new Error("steps.json failed to load");
    if(!helpRes.ok) throw new Error("help.json failed to load");
    const stepsData = await stepsRes.json();
    const helpData = await helpRes.json();
    STEPS = Array.isArray(stepsData.steps) ? stepsData.steps : [];
    // help.json stores helps in an object keyed by id
    HELP = helpData.helps || {};
    if(!STEPS.length){
      showErr("steps.json loaded, but no steps were found.");
      return;
    }
    currentStepId = STEPS[0].id || 1;
    wireModal();
    render();
  }catch(e){
    console.error(e);
    showErr("Could not load steps.json/help.json. Make sure both files are in the repo root and GitHub Pages has deployed the latest commit.");
  }
}

loadData();
