(function(){
  'use strict';
  const $ = (id)=>document.getElementById(id);
  const esc = (s)=>String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');

  async function loadSteps(){
    const r = await fetch('steps.json?_=' + Date.now(), {cache:'no-store'});
    if(!r.ok) throw new Error('steps.json ' + r.status);
    const j = await r.json();
    if(!Array.isArray(j) || !j.length) throw new Error('steps.json empty');
    return j;
  }

  function cleanBodyHtml(html){
    return (html||'')
      .replace(/<p[^>]*>\s*<i>\s*Section:\s*[^<]+<\/i>\s*<\/p>/gi,'')
      .replace(/class="Mso[^"]*"/g,'')
      .replace(/class=Mso[^\s>]+/g,'');
  }

  function init(steps){
    const els = {
      jump:$('jumpSelect'), startOver:$('btn-startover'),
      progressLabel:$('progressLabel'), progressFill:$('progressFill'),
      sectionName:$('sectionName'), stepTitle:$('stepTitle'),
      stepBody:$('stepBody'), buttonsRow:$('buttonsRow'),
      helpOverlay:$('helpOverlay'), helpClose:$('helpClose'),
      helpTitle:$('helpTitle'), helpContent:$('helpContent')
    };

    let currentId = steps[0].id;
    let interaction = null; // 'appointment'|'walkin'

    const idxById = (id)=> steps.findIndex(s=>s.id===id);

    function closeHelp(){
      els.helpOverlay.classList.remove('active');
      els.helpOverlay.setAttribute('aria-hidden','true');
    }
    function openHelp(h){
      els.helpTitle.textContent = h.title || 'Help';
      let html='';
      if(h.img) html += `<img src="${h.img}" alt="${esc(h.title||'Help')}">`;
      if(h.desc) html += `<div class="desc">${esc(h.desc)}</div>`;
      if(h.bullets && h.bullets.length){
        html += '<ul>' + h.bullets.map(b=>`<li>${esc(b)}</li>`).join('') + '</ul>';
      }
      els.helpContent.innerHTML = html || '<p>No help content.</p>';
      els.helpOverlay.classList.add('active');
      els.helpOverlay.setAttribute('aria-hidden','false');
    }

    function setProgress(){
      const i = idxById(currentId);
      const n = steps.length;
      els.progressLabel.textContent = 'Step ' + (i>=0 ? (i+1) : 1);
      els.progressFill.style.width = ((Math.max(i,0)+1)/n*100) + '%';
    }

    function renderJump(){
      els.jump.innerHTML='';
      steps.forEach((s,i)=>{
        const opt=document.createElement('option');
        opt.value=s.id;
        const nice=(s.title||'').replace(/^Step\s+\d+\s*:\s*/i,'') || s.id;
        opt.textContent=(i+1)+'. '+nice;
        els.jump.appendChild(opt);
      });
    }

    function goto(id){
      const step = steps.find(s=>s.id===id);
      if(!step) return;
      currentId=id;
      els.jump.value=id;
      els.sectionName.textContent=(step.section||'Workflow').toUpperCase();
      els.stepTitle.textContent=step.title||'';
      els.stepBody.innerHTML=cleanBodyHtml(step.bodyHtml||'');
      buildButtons(step);
      setProgress();
      window.scrollTo({top:0,behavior:'auto'});
    }

    function nextLinear(){
      const i=idxById(currentId);
      if(i>=0 && i<steps.length-1) goto(steps[i+1].id);
    }
    function prevLinear(){
      const i=idxById(currentId);
      if(i>0) goto(steps[i-1].id);
    }

    function actionForButton(step,b){
      const label=(b.label||'').toLowerCase();

      if(step.id==='step1'){
        if(label.includes('scheduled')) return ()=>{interaction='appointment'; goto('step2');};
        if(label.includes('walk')) return ()=>{interaction='walkin'; goto('step3');};
      }
      if((step.id==='step2'||step.id==='step3') && b.kind==='next') return ()=>goto('step4');

      if(step.id==='step4'){
        if(label.startsWith('no')) return ()=>goto('step5');
        if(label.startsWith('yes')) return ()=>goto('step26_stop');
        if(b.kind==='back') return ()=>{
          if(interaction==='appointment') return goto('step2');
          if(interaction==='walkin') return goto('step3');
          return prevLinear();
        };
      }

      if(step.id==='step5'){
        if(label.startsWith('yes')) return ()=>goto('step6');
        if(label.startsWith('no')) return ()=>goto('step26_wrap');
      }

      if(b.kind==='back') return ()=>prevLinear();
      if(b.kind==='restart') return ()=>{interaction=null; goto('step1');};
      if(b.kind==='next') return ()=>nextLinear();
      if(b.kind==='no') return ()=>nextLinear();
      if(b.kind==='util'){
        const match=(step.helps||[]).find(h=> (h.title||'').toLowerCase()===(b.label||'').toLowerCase());
        if(match) return ()=>openHelp(match);
        return ()=>{};
      }
      return ()=>{};
    }

    function buildButtons(step){
      els.buttonsRow.innerHTML='';
      const nodes=[];

      (step.buttons||[]).forEach(b=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.textContent=b.label||'';
        if(b.kind==='next') btn.className='btn primary';
        else if(b.kind==='no') btn.className='btn danger';
        else btn.className='btn outline';
        btn.addEventListener('click', actionForButton(step,b));
        nodes.push({kind:b.kind,node:btn,label:(b.label||'')});
      });

      const utilTitles=new Set(nodes.filter(x=>x.kind==='util').map(x=>x.label.trim().toLowerCase()));
      (step.helps||[]).forEach(h=>{
        const t=(h.title||'Help').trim();
        if(!t) return;
        if(utilTitles.has(t.toLowerCase())) return;
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='btn outline';
        btn.textContent=t;
        btn.addEventListener('click', ()=>openHelp(h));
        nodes.push({kind:'util',node:btn,label:t});
      });

      const prim=nodes.filter(x=>x.kind==='next').map(x=>x.node);
      const no=nodes.filter(x=>x.kind==='no').map(x=>x.node);
      const util=nodes.filter(x=>x.kind==='util').map(x=>x.node);
      const back=nodes.filter(x=>x.kind==='back').map(x=>x.node);
      const restart=nodes.filter(x=>x.kind==='restart').map(x=>x.node);

      [...prim,...no,...util,...back].forEach(n=>els.buttonsRow.appendChild(n));

      if(step.id==='step26_wrap'||step.id==='step26_stop'||step.id==='step27'){
        restart.forEach(n=>els.buttonsRow.appendChild(n));
      }
    }

    els.helpClose.addEventListener('click', closeHelp);
    els.helpOverlay.addEventListener('click', (e)=>{ if(e.target===els.helpOverlay) closeHelp(); });
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeHelp(); });

    els.startOver.addEventListener('click', ()=>{interaction=null; goto('step1');});
    els.jump.addEventListener('change', (e)=>goto(e.target.value));

    renderJump();
    goto('step1');
  }

  (async()=>{
    try{ init(await loadSteps()); }
    catch(e){ alert('FKR app failed: ' + (e && (e.message||e.stack) ? (e.message||e.stack) : String(e))); }
  })();
})();