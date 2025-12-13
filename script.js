// FKR Workflow App (loads steps.json + help.json)
let STEPS = [];
let HELP = {};
let currentStepId = 1;
const historyStack = [];

function byId(id){ return document.getElementById(id); }

async function loadData(){
  const [stepsRes, helpRes] = await Promise.all([
    fetch("./steps.json", { cache: "no-store" }),
    fetch("./help.json",  { cache: "no-store" })
  ]);

  if(!stepsRes.ok) throw new Error("Could not load steps.json");
  if(!helpRes.ok) throw new Error("Could not load help.json");

  const stepsJson = await stepsRes.json();
  // support either {steps:[...]} or [...]
  STEPS = Array.isArray(stepsJson) ? stepsJson : (stepsJson.steps || []);
  HELP = await helpRes.json();
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
      // allow either 'images/foo.png' or 'foo.png'
      el.src = img.startsWith("images/") ? img : ("images/" + img);
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

function buildAccordion(acc){
  const wrap = document.createElement("div");
  wrap.className = "accordion";

  const head = document.createElement("button");
  head.type = "button";
  head.className = "acc-head";
  head.setAttribute("aria-expanded", "false");
  head.innerHTML = `<span>${acc.title || ""}</span><span class="acc-icon">▾</span>`;

  const body = document.createElement("div");
  body.className = "acc-body";

  if(acc.html){
    const tmp = document.createElement("div");
    tmp.innerHTML = acc.html;
    body.appendChild(tmp);
  }

  if(Array.isArray(acc.bullets) && acc.bullets.length){
    const ul = document.createElement("ul");
    acc.bullets.forEach(b=>{
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  if(acc.tableHtml){
    const tw = document.createElement("div");
    tw.className = "table-wrap";
    tw.innerHTML = acc.tableHtml;
    body.appendChild(tw);
  }

  if(Array.isArray(acc.buttons) && acc.buttons.length){
    const actions = document.createElement("div");
    actions.className = "acc-actions";
    acc.buttons.forEach(b=>{
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn outline inline";
      btn.textContent = b.label || "Help";
      if(b.help){ btn.dataset.help = b.help; }
      if(b.next){ btn.dataset.next = String(b.next); }
      if(b.back){ btn.dataset.back = "1"; }
      actions.appendChild(btn);
    });
    body.appendChild(actions);
  }

  head.addEventListener("click", ()=>{
    const isOpen = wrap.classList.toggle("open");
    head.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  wrap.appendChild(head);
  wrap.appendChild(body);
  return wrap;
}

function render(){
  if(!STEPS.length){
    byId("app").innerHTML = `<div class="card"><h2 class="stepTitle">No steps found</h2><p>Please make sure <strong>steps.json</strong> is in the repo root and valid JSON.</p></div>`;
    return;
  }

  const step = STEPS.find(s=>Number(s.id)===Number(currentStepId)) || STEPS[0];
  currentStepId = Number(step.id);

  const app = byId("app");
  app.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

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

  const sel = top.querySelector("#jumpSel");
  STEPS.forEach(s=>{
    const opt = document.createElement("option");
    opt.value = String(s.id);
    opt.textContent = `Step ${s.id}: ${s.title || ""}`;
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
    currentStepId = Number(STEPS[0].id || 1);
    render();
  });

  const prog = document.createElement("div");
  prog.className = "progress";
  const total = STEPS.length || 1;
  const pct = Math.round((STEPS.findIndex(s=>Number(s.id)===currentStepId)+1)/total*100);
  prog.innerHTML = `<div class="label">Step ${currentStepId}</div><div class="bar"><div style="width:${pct}%"></div></div>`;
  card.appendChild(prog);

  const pillRow = document.createElement("div");
  pillRow.className = "pill-row";
  if(step.phase){
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.innerHTML = `<span class="dot"></span><span>${String(step.phase)}</span>`;
    pillRow.appendChild(pill);
  }
  card.appendChild(pillRow);

  const title = document.createElement("h2");
  title.className = "stepTitle";
  title.textContent = `Step ${step.id}: ${step.title || ""}`;
  card.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = step.section ? `Section: ${step.section}` : "";
  if(meta.textContent) card.appendChild(meta);

  // Content
  if(step.intro){
    const p = document.createElement("p");
    p.textContent = step.intro;
    card.appendChild(p);
  }

  // Accordions
  if(Array.isArray(step.accordions)){
    step.accordions.forEach(a=>{
      card.appendChild(buildAccordion(a));
    });
  }

  // Plain bullets (non-accordion)
  if(Array.isArray(step.bullets) && step.bullets.length){
    const ul = document.createElement("ul");
    step.bullets.forEach(b=>{
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });
    card.appendChild(ul);
  }

  // Main actions (full width)
  const actions = document.createElement("div");
  actions.className = "actions";
  (step.buttons || []).forEach(b=>{
    const btn = document.createElement("button");
    btn.type = "button";

    const style = (b.style || "outline").toLowerCase();
    const cls = ["btn", "full"];
    if(style === "primary") cls.push("primary");
    else if(style === "danger" || style === "red") cls.push("danger");
    else cls.push("outline");

    btn.className = cls.join(" ");
    btn.textContent = b.label || "Continue";

    if(b.help) btn.dataset.help = b.help;
    if(b.next) btn.dataset.next = String(b.next);
    if(b.back) btn.dataset.back = "1";

    actions.appendChild(btn);
  });
  if(actions.children.length) card.appendChild(actions);

  // Delegated wiring inside card
  card.addEventListener("click", (e)=>{
    const t = e.target;
    if(!(t instanceof HTMLElement)) return;

    const btn = t.closest("button");
    if(!btn) return;

    const helpId = btn.getAttribute("data-help");
    if(helpId){ openHelp(helpId); return; }

    if(btn.hasAttribute("data-back")){
      currentStepId = historyStack.pop() || Number(STEPS[0].id || 1);
      render();
      return;
    }

    const next = btn.getAttribute("data-next");
    if(next){
      historyStack.push(currentStepId);
      currentStepId = Number(next);
      render();
      return;
    }
  });

  app.appendChild(card);
}

// Modal wiring
function wireModal(){
  byId("helpClose").addEventListener("click", closeHelp);
  byId("helpModal").addEventListener("click", (e)=>{ if(e.target && e.target.id === "helpModal") closeHelp(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeHelp(); });
}

(async function init(){
  try{
    wireModal();
    await loadData();
    currentStepId = Number((STEPS[0] && STEPS[0].id) ? STEPS[0].id : 1);
    render();
  }catch(err){
    const app = byId("app");
    app.innerHTML = `<div class="card"><h2 class="stepTitle">Could not load data</h2><p>${String(err.message || err)}</p><p>Make sure <strong>index.html, script.js, styles.css, steps.json, help.json</strong> are in the repo root and that GitHub Pages is set to deploy from that branch + root.</p></div>`;
    console.error(err);
  }
})();
