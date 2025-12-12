/* global FKR_DATA */
(function(){
  const data = window.FKR_DATA;
  if(!data || !data.steps) {
    console.error("FKR_DATA missing");
    return;
  }

  const order = data.order;
  const steps = data.steps;

  let currentId = order[0];
  const history = [];

  const elJump = document.getElementById("step-jump");
  const elLabel = document.getElementById("progress-label");
  const elBar = document.getElementById("progress-bar");
  const elPill = document.getElementById("pill-text");
  const elTitle = document.getElementById("step-title");
  const elBody = document.getElementById("step-body");
  const elButtons = document.getElementById("btn-row");

  // modal
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtns = document.querySelectorAll("[data-modal-close]");

  modalCloseBtns.forEach(btn => btn.addEventListener("click", closeModal));
  modalOverlay.addEventListener("click", (e)=>{ if(e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  function normalizeKey(s){
    return (s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  }

  function setJumpOptions(){
    elJump.innerHTML = "";
    order.forEach((id) => {
      const st = steps[id];
      if(!st) return;
      const opt = document.createElement("option");
      const num = st.num;
      const numLabel = (id === "stop_staff" || id === "wrap_no_adopt") ? `${num}.` : `${num}.`;
      opt.value = id;
      opt.textContent = `${numLabel} ${st.title}`;
      elJump.appendChild(opt);
    });
  }

  function computeProgress(id){
    const idx = order.indexOf(id);
    const pct = idx >= 0 ? (idx / Math.max(1, order.length-1)) * 100 : 0;
    elBar.style.width = `${pct}%`;
    const st = steps[id];
    elLabel.textContent = `Step ${st.num}`;
  }

  function renderTableWrap(){
    // wrap any tables in a scroll container
    const tables = elBody.querySelectorAll("table");
    tables.forEach((t)=>{
      if(t.parentElement && t.parentElement.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }

  function renderStep(id, pushHistory=true){
    const st = steps[id];
    if(!st) return;

    if(pushHistory && currentId !== id){
      history.push(currentId);
    }
    currentId = id;

    elJump.value = id;
    computeProgress(id);

    elPill.textContent = (st.section || "").toUpperCase();
    elTitle.textContent = `Step ${st.num}: ${st.title}`;

    elBody.innerHTML = st.content_html || "";
    renderTableWrap();

    // buttons
    elButtons.innerHTML = "";
    const btns = st.buttons || [];

    btns.forEach((b)=>{
      const btn = document.createElement("button");
      btn.className = b.style || "outline";
      btn.textContent = b.label;

      const label = (b.label || "").trim();

      // actions
      if(label.toLowerCase().startsWith("back")){
        btn.addEventListener("click", goBack);
      } else if(label.toLowerCase().startsWith("start over")){
        btn.addEventListener("click", startOver);
      } else if((b.style === "outline" || b.style === "neutral") && /how|where|show|what if/i.test(label)){
        btn.addEventListener("click", ()=>openHelpForLabel(st, label));
      } else {
        btn.addEventListener("click", ()=>advanceByLabel(st, label));
      }

      elButtons.appendChild(btn);
    });

    // Always include Back if missing (except first step)
    if(currentId !== order[0] && !btns.some(b => (b.label||"").toLowerCase().startsWith("back"))){
      const back = document.createElement("button");
      back.className = "outline";
      back.textContent = "Back";
      back.addEventListener("click", goBack);
      elButtons.appendChild(back);
    }
  }

  function advanceByLabel(st, label){
    // Branch logic based on current step + label
    const id = st.id;

    // Step 1 branch
    if(id === "step1"){
      if(/scheduled/i.test(label)) return renderStep("step2");
      if(/walk/i.test(label)) return renderStep("step3");
    }

    // Step 2 + 3 go to 4 on Yes
    if(id === "step2" || id === "step3"){
      if(/^yes/i.test(label)) return renderStep("step4");
    }

    // Step 4 branches
    if(id === "step4"){
      if(/^no/i.test(label)) return renderStep("step5");
      if(/^yes/i.test(label)) return renderStep("stop_staff");
    }

    // Step 5 branches
    if(id === "step5"){
      if(/^yes/i.test(label)) return renderStep("step6");
      if(/^no/i.test(label)) return renderStep("wrap_no_adopt");
    }

    // Default: go to next in order
    const idx = order.indexOf(id);
    if(idx >= 0 && idx < order.length-1){
      return renderStep(order[idx+1]);
    }
  }

  function openHelpForLabel(step, label){
    const helps = step.helps || [];
    if(!helps.length){
      openModal("Help", "<div class='help-text'>No help is configured for this step yet.</div>");
      return;
    }
    const key = normalizeKey(label);
    // try exact match in parentheses titles
    let h = helps.find(x => normalizeKey(x.title) === key);
    if(!h){
      // try contains
      h = helps.find(x => normalizeKey(x.title).includes(key) || key.includes(normalizeKey(x.title)));
    }
    if(!h){
      // if only one help, use it
      if(helps.length === 1) h = helps[0];
    }
    if(!h){
      const list = helps.map(x => `<li>${escapeHtml(x.title)}</li>`).join("");
      openModal("Help", `<div class='help-text'><p>Select one of these help topics:</p><ul>${list}</ul></div>`);
      return;
    }

    if(h.file){
      const fname = h.file;
      const desc = h.description ? `<div class='help-text' style='margin:0 0 10px'>${escapeHtml(h.description)}</div>` : "";
      openModal(h.title, `${desc}${renderZoomImage(fname)}`);
    } else {
      const text = (h.raw || []).map(t => `<p>${escapeHtml(t)}</p>`).join("");
      openModal(h.title, `<div class='help-text'>${text}</div>`);
    }
  }

  function renderZoomImage(src){
    const safeSrc = encodeURI(src);
    return `
      <div class="zoom-wrap">
        <div class="zoom-controls">
          <button type="button" data-zoom="-">-</button>
          <button type="button" data-zoom="reset">Reset</button>
          <button type="button" data-zoom="+">+</button>
          <button type="button" data-zoom="open">Open</button>
        </div>
        <img class="zoom-img" data-zoom-img src="${safeSrc}" alt="">
      </div>
    `;
  }

  function wireZoomControls(){
    const img = modalBody.querySelector("[data-zoom-img]");
    if(!img) return;

    let scale = 1;

    function apply(){
      img.style.transform = `scale(${scale})`;
    }

    modalBody.querySelectorAll("[data-zoom]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const action = btn.getAttribute("data-zoom");
        if(action === "+"){ scale = Math.min(3, scale + 0.2); apply(); }
        else if(action === "-"){ scale = Math.max(1, scale - 0.2); apply(); }
        else if(action === "reset"){ scale = 1; apply(); }
        else if(action === "open"){ window.open(img.src, "_blank"); }
      });
    });

    apply();
  }

  function openModal(title, html){
    modalTitle.textContent = title || "Help";
    modalBody.innerHTML = html || "";
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    // zoom controls
    wireZoomControls();
  }

  function closeModal(){
    modalOverlay.classList.remove("open");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  }

  function goBack(){
    const prev = history.pop();
    if(prev) renderStep(prev, false);
  }

  window.startOver = function(){
    history.length = 0;
    renderStep(order[0], false);
  };

  window.jumpToStep = function(id){
    if(!steps[id]) return;
    history.length = 0;
    renderStep(id, false);
  };

  function escapeHtml(str){
    return (str||"")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // init
  setJumpOptions();
  renderStep(order[0], false);

})();
