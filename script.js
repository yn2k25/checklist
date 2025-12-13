// script.js
(function(){
  const steps = (window.FKR_STEPS || []).slice();
  const helpMap = window.FKR_HELP || {};

  const els = {
    stepJump: document.getElementById("step-jump"),
    progressLabel: document.getElementById("progress-label"),
    progressBar: document.getElementById("progress-bar"),
    container: document.getElementById("step-container"),
    startOverTop: document.getElementById("start-over-top"),
    helpOverlay: document.getElementById("help-overlay"),
    helpClose: document.getElementById("help-close"),
    helpBody: document.getElementById("help-body"),
    helpTitle: document.getElementById("help-title"),
  };

  function assertEl(el, name){
    if(!el) throw new Error("Missing required element: " + name);
  }
  Object.entries(els).forEach(([k,v])=>assertEl(v,k));

  // ---- Modal helpers (robust) ----
  function closeHelp(){
    els.helpOverlay.classList.remove("open");
    els.helpOverlay.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }
  function openHelp(title, html){
    els.helpTitle.textContent = title || "Help";
    els.helpBody.innerHTML = html || "<p>No help content for this item yet.</p>";
    els.helpOverlay.classList.add("open");
    els.helpOverlay.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }

  // Make close always work:
  els.helpClose.addEventListener("click", (e)=>{ e.preventDefault(); closeHelp(); });
  els.helpOverlay.addEventListener("click", (e)=>{
    // click outside dialog closes
    if(e.target === els.helpOverlay) closeHelp();
  });
  window.addEventListener("keydown", (e)=>{
    if(e.key === "Escape") closeHelp();
  });
  // Expose for debugging:
  window.FKR_closeHelp = closeHelp;
  window.FKR_openHelp = openHelp;

  // ---- Navigation/state ----
  let currentId = steps[0]?.id || null;

  function findStep(id){ return steps.find(s=>s.id===id); }

  function renderJump(){
    els.stepJump.innerHTML = "";
    steps.forEach((s)=>{
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = `${s.number}. ${s.title}`;
      els.stepJump.appendChild(opt);
    });
    if(currentId) els.stepJump.value = currentId;
  }

  function renderProgress(step){
    const total = steps.length || 1;
    els.progressLabel.textContent = `Step ${step?.number ?? ""}`.trim();
    const pct = step && step.number ? Math.min(100, Math.max(0, (step.number-1)/(total-1||1)*100)) : 0;
    els.progressBar.style.width = pct + "%";
  }

  function actionButton(action){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn " + (action.style === "primary" ? "primary" : action.style === "danger" ? "danger" : "outline");
    btn.textContent = action.label || "Continue";

    btn.addEventListener("click", ()=>{
      if(action.type === "goto"){
        goTo(action.target);
      } else if(action.type === "help"){
        // Help can be inline HTML or image filename.
        const topic = action.topic || action.label || "Help";
        const item = helpMap[topic] || action.help || null;

        if(item && item.type === "image"){
          const img = `<figure style="margin:0">
            <img src="${item.src}" alt="${topic}" style="width:100%;height:auto;border-radius:14px;border:1px solid #e5e7eb">
            ${item.caption ? `<figcaption style="margin-top:10px;color:#374151">${item.caption}</figcaption>` : ""}
          </figure>`;
          openHelp(topic, img);
        } else if(item && item.type === "html"){
          openHelp(topic, item.html);
        } else if(typeof item === "string"){
          openHelp(topic, `<p>${item}</p>`);
        } else {
          openHelp(topic, "<p>No help content for this item yet.</p>");
        }
      } else if(action.type === "back"){
        // naive back: go to previous step number if exists
        const cur = findStep(currentId);
        const prev = cur ? steps.find(s=>s.number === cur.number-1) : null;
        if(prev) goTo(prev.id);
      }
    });

    return btn;
  }

  function renderStep(step){
    els.container.innerHTML = "";
    if(!step){
      els.container.innerHTML = "<p>Unable to load step data.</p>";
      return;
    }

    const pill = document.createElement("div");
    pill.className = "step-pill";
    pill.innerHTML = `<span class="dot"></span><span>${(step.pill || step.phase || "").toUpperCase()}</span>`;

    const title = document.createElement("div");
    title.className = "step-title";
    title.textContent = `Step ${step.number}: ${step.title}`;

    const subtitle = document.createElement("div");
    subtitle.className = "step-subtitle";
    subtitle.textContent = step.section ? `Section: ${step.section}` : "";

    const body = document.createElement("div");
    body.className = "step-body";
    body.innerHTML = step.bodyHtml || "";

    const actions = document.createElement("div");
    actions.className = "step-actions";
    (step.actions || []).forEach(a => actions.appendChild(actionButton(a)));

    els.container.appendChild(pill);
    els.container.appendChild(title);
    if(subtitle.textContent) els.container.appendChild(subtitle);
    els.container.appendChild(body);
    els.container.appendChild(actions);
  }

  function goTo(id){
    const step = findStep(id);
    if(!step) return;
    currentId = id;
    renderProgress(step);
    renderStep(step);
    if(els.stepJump.value !== id) els.stepJump.value = id;
    // scroll to top of card
    document.getElementById("app").scrollIntoView({behavior:"smooth", block:"start"});
  }

  // Bind controls
  els.stepJump.addEventListener("change", ()=> goTo(els.stepJump.value));
  els.startOverTop.addEventListener("click", ()=> goTo(steps[0]?.id));

  // Boot
  renderJump();
  goTo(currentId);

})();
