// FKR Workflow App (loads steps.json + help.json from repo root)
let STEPS = [];
let HELP = {};

let currentStepId = 1;
const historyStack = [];

function byId(id){ return document.getElementById(id); }

function setFatal(msg){
  byId("fatalMsg").textContent = msg;
  byId("fatal").classList.remove("hidden");
}

function openHelp(helpId){
  const h = HELP[helpId];
  if(!h) return;
  byId("helpTitle").textContent = h.title || "";
  const body = byId("helpBody");
  body.innerHTML = "";
  if(Array.isArray(h.text) && h.text.length){
    h.text.forEach(t=>{
      const p = document.createElement("p");
      p.textContent = t;
      body.appendChild(p);
    });
  }
  if(Array.isArray(h.images)){
    h.images.forEach(img=>{
      const el = document.createElement("img");
      el.src = img; // images are stored at repo root (same folder as index.html)
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
  const app = byId("app");
  app.innerHTML = "";

  if(!Array.isArray(STEPS) || !STEPS.length){
    setFatal("steps.json loaded but contains no steps.");
    return;
  }

  const step = STEPS.find(s=>s.id===currentStepId) || STEPS[0];
  currentStepId = step.id;

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
    <button class="btn outline" type="button" id="startOverBtn">Start over</button>
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
    currentStepId = STEPS[0].id;
    // reset any visual checkboxes
    document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb=>cb.checked=false);
    render();
  });

  // Progress
  const prog = document.createElement("div");
  prog.className = "progress";
  const total = STEPS.length || 1;
  const idx = STEPS.findIndex(s=>s.id===currentStepId);
  const pct = Math.round(((idx+1)/total)*100);
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

  // Wire next/back/help
  content.querySelectorAll("[data-next]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      historyStack.push(currentStepId);
      const n = Number(btn.getAttribute("data-next"));
      currentStepId = n;
      render();
      window.scrollTo({top: 0, behavior: "smooth"});
    });
  });
  content.querySelectorAll("[data-back]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      currentStepId = historyStack.pop() || STEPS[0].id;
      render();
      window.scrollTo({top: 0, behavior: "smooth"});
    });
  });
  content.querySelectorAll("[data-help]").forEach(btn=>{
    btn.addEventListener("click", ()=>openHelp(btn.getAttribute("data-help")));
  });

  // Fallback: treat plain "Back" outline buttons as back (in case data-back is missing)
  content.querySelectorAll('button.btn.outline:not([data-next]):not([data-help]):not([data-back])').forEach(btn=>{
    if((btn.textContent || '').trim().toLowerCase() === 'back'){
      btn.setAttribute('data-back','1');
      btn.addEventListener('click', ()=>{
        currentStepId = historyStack.pop() || 1;
        render();
      });
    }
  });

  app.appendChild(card);
}

// Modal wiring
byId("helpClose").addEventListener("click", closeHelp);
byId("helpModal").addEventListener("click", (e)=>{ if(e.target.id==="helpModal") closeHelp(); });
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeHelp(); });

async function loadJson(url){
  const res = await fetch(url, {cache: "no-store"});
  if(!res.ok) throw new Error(`${url} returned ${res.status}`);
  return await res.json();
}

(async function boot(){
  try{
    STEPS = await loadJson("steps.json");
    HELP  = await loadJson("help.json");
    render();
  }catch(e){
    console.error(e);
    setFatal(String(e && e.message ? e.message : e));
  }
})();
