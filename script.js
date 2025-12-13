/* FKR Adoption Workflow - static app (GitHub Pages) */
(async function () {
  const $ = (sel) => document.querySelector(sel);

  const els = {
    jump: $("#jumpSelect"),
    btnStartOver: $("#btnStartOver"),
    stepSmallLabel: $("#stepSmallLabel"),
    pillText: $("#pillText"),
    stepTitle: $("#stepTitle"),
    stepMeta: $("#stepMeta"),
    stepLead: $("#stepLead"),
    accordions: $("#accordions"),
    stepButtons: $("#stepButtons"),
    progressFill: $("#progressFill"),
    modalOverlay: $("#modalOverlay"),
    modalTitle: $("#modalTitle"),
    modalBody: $("#modalBody"),
    modalClose: $("#modalClose"),
  };

  function escapeHtml(str){
    return (str ?? "").toString()
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function openModal(title, html){
    els.modalTitle.textContent = title || "Help";
    els.modalBody.innerHTML = html || "";
    els.modalOverlay.classList.add("show");
    els.modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(){
    els.modalOverlay.classList.remove("show");
    els.modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    els.modalBody.innerHTML = "";
  }

  els.modalOverlay.addEventListener("click", (e) => {
    if (e.target === els.modalOverlay) closeModal();
  });
  els.modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.modalOverlay.classList.contains("show")) closeModal();
  });

  // Load data.json
  let data;
  try{
    const res = await fetch("./data.json", { cache: "no-store" });
    data = await res.json();
  }catch(err){
    openModal("Error", "<p>Could not load data.json. Make sure it exists at the repo root.</p>");
    console.error(err);
    return;
  }

  const steps = (data.steps || []).slice().sort((a,b) => (a.displayOrder ?? a.number) - (b.displayOrder ?? b.number));
  const helpMap = new Map((data.helps || []).map(h => [h.id, h]));
  const stepByNumber = new Map(steps.map(s => [s.number, s]));
  const total = steps.length;

  // Build jump list
  els.jump.innerHTML = "";
  for (const s of steps){
    const opt = document.createElement("option");
    opt.value = String(s.number);
    opt.textContent = `${s.number}. ${s.title}`;
    els.jump.appendChild(opt);
  }

  let currentStepNumber = steps[0]?.number || 1;

  function renderHelp(helpId){
    const h = helpMap.get(helpId);
    if (!h){
      openModal("Help", `<p>Help block not found: <b>${escapeHtml(helpId)}</b></p>`);
      return;
    }
    let out = "";
    if (h.images && h.images.length){
      for (const img of h.images){
        const safe = escapeHtml(img);
        out += `<img src="images/${safe}" alt="${escapeHtml(h.title || "Help image")}" onerror="this.style.display='none'">`;
        out += `<div class="caption">${safe}</div>`;
      }
    }
    if (h.text && h.text.length){
      // render as paragraphs + bullets if they look like bullet lines
      const bulletLike = h.text.every(t => /^[-•\u2022o]\s+/.test(t) || /^\d+\.\s+/.test(t));
      if (bulletLike){
        out += "<ul>" + h.text.map(t => `<li>${escapeHtml(t.replace(/^[-•\u2022o]\s+/,"").replace(/^\d+\.\s+/,""))}</li>`).join("") + "</ul>";
      } else {
        out += h.text.map(t => `<p>${escapeHtml(t)}</p>`).join("");
      }
    }
    openModal(h.title || "Help", out || "<p>No help content.</p>");
  }

  function makeButton(btn, inAccordion=false){
    const b = document.createElement("button");
    b.type = "button";
    const style = (btn.style || "outline").toLowerCase();
    b.className = "btn " + (style === "primary" ? "primary" : style === "danger" ? "danger" : "outline");
    if (inAccordion) b.classList.add("in-accordion");
    b.textContent = btn.label || "Continue";

    b.addEventListener("click", () => {
      if (btn.action === "startover"){
        goToStep(steps[0]?.number || 1, true);
        return;
      }
      if (btn.back){
        historyBack();
        return;
      }
      if (btn.help){
        renderHelp(btn.help);
        return;
      }
      if (btn.next){
        goToStep(btn.next);
        return;
      }
    });
    return b;
  }

  const navStack = [];
  function goToStep(stepNum, reset=false){
    const s = stepByNumber.get(stepNum);
    if (!s) return;
    if (reset){
      navStack.length = 0;
    } else if (currentStepNumber !== stepNum){
      navStack.push(currentStepNumber);
    }
    currentStepNumber = stepNum;
    render();
  }
  function historyBack(){
    const prev = navStack.pop();
    if (prev) {
      currentStepNumber = prev;
      render();
    }
  }

  function render(){
    const s = stepByNumber.get(currentStepNumber);
    if (!s) return;

    els.jump.value = String(s.number);

    const idx = steps.findIndex(x => x.number === s.number);
    const pct = total ? Math.round(((idx+1) / total) * 100) : 0;
    els.progressFill.style.width = pct + "%";
    els.stepSmallLabel.textContent = "Step " + s.number;

    els.pillText.textContent = (s.phase || "").toUpperCase() || (s.section || "");
    els.stepTitle.textContent = `Step ${s.number}: ${s.title}`;

    els.stepMeta.textContent = s.section ? `Section: ${s.section}` : "";

    // lead paragraphs
    const lead = [];
    for (const line of (s.lead || [])){
      lead.push(`<p>${escapeHtml(line)}</p>`);
    }
    if (s.bodyHtmlParts && s.bodyHtmlParts.length){
      lead.push(s.bodyHtmlParts.join(""));
    }
    els.stepLead.innerHTML = lead.join("");

    // accordions
    els.accordions.innerHTML = "";
    for (const acc of (s.accordions || [])){
      const details = document.createElement("details");
      details.className = "acc";
      const summary = document.createElement("summary");
      summary.innerHTML = `<span>${escapeHtml(acc.title || "Details")}</span><span class="chev" aria-hidden="true"></span>`;
      details.appendChild(summary);

      const content = document.createElement("div");
      content.className = "acc-content";

      // items
      const hasList = (acc.items || []).some(i => i.type === "li");
      if (hasList){
        const ul = document.createElement("ul");
        for (const it of (acc.items || [])){
          if (it.type === "li"){
            const li = document.createElement("li");
            li.textContent = it.text || "";
            ul.appendChild(li);
          } else if (it.type === "p"){
            const p = document.createElement("p");
            p.textContent = it.text || "";
            ul.appendChild(document.createElement("li")).appendChild(p);
          } else if (it.type === "check"){
            const wrap = document.createElement("div");
            wrap.className = "checkline";
            const cb = document.createElement("div");
            cb.className = "checkbox" + (it.checked ? " checked" : "");
            const t = document.createElement("div");
            t.textContent = it.text || "";
            wrap.appendChild(cb); wrap.appendChild(t);
            content.appendChild(wrap);
          } else if (it.type === "html"){
            const div = document.createElement("div");
            div.innerHTML = it.html || "";
            content.appendChild(div);
          }
        }
        content.appendChild(ul);
      } else {
        for (const it of (acc.items || [])){
          if (it.type === "p"){
            const p = document.createElement("p");
            p.textContent = it.text || "";
            content.appendChild(p);
          } else if (it.type === "check"){
            const wrap = document.createElement("div");
            wrap.className = "checkline";
            const cb = document.createElement("div");
            cb.className = "checkbox" + (it.checked ? " checked" : "");
            const t = document.createElement("div");
            t.textContent = it.text || "";
            wrap.appendChild(cb); wrap.appendChild(t);
            content.appendChild(wrap);
          } else if (it.type === "html"){
            const div = document.createElement("div");
            div.innerHTML = it.html || "";
            content.appendChild(div);
          } else if (it.type === "li"){
            // fallback
            const p = document.createElement("p");
            p.textContent = it.text || "";
            content.appendChild(p);
          }
        }
      }

      // accordion buttons (NOT full width)
      if (acc.buttons && acc.buttons.length){
        const bar = document.createElement("div");
        bar.className = "inline-buttons";
        for (const btn of acc.buttons){
          bar.appendChild(makeButton(btn, true));
        }
        content.appendChild(bar);
      }

      details.appendChild(content);
      els.accordions.appendChild(details);
    }

    // step buttons (full width)
    els.stepButtons.innerHTML = "";
    for (const btn of (s.buttons || [])){
      els.stepButtons.appendChild(makeButton(btn, false));
    }

    // If no buttons at all (end state), show Start over
    if (!(s.buttons || []).length){
      els.stepButtons.appendChild(makeButton({label:"Start over", style:"outline", action:"startover"}, false));
    }
  }

  // events
  els.jump.addEventListener("change", () => {
    const n = parseInt(els.jump.value, 10);
    if (!Number.isFinite(n)) return;
    goToStep(n);
  });
  els.btnStartOver.addEventListener("click", () => goToStep(steps[0]?.number || 1, true));

  // initial
  goToStep(currentStepNumber, true);
})();
