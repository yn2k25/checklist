let currentStep = 1;

function render(){
  const step = STEPS.find(s=>s.id===currentStep);
  const app = document.getElementById("app");
  app.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>Step ${step.id}: ${step.title}</h2>`;
  step.accordions.forEach(a=>{
    const acc = document.createElement("div");
    acc.className="accordion";
    acc.innerHTML=`<div class="accordion-header">${a.title}</div><div class="accordion-body">${(a.bullets||[]).map(b=>"<div>"+b+"</div>").join("")}</div>`;
    acc.querySelector(".accordion-header").onclick=()=>acc.classList.toggle("open");
    card.appendChild(acc);
  });
  step.buttons.forEach(b=>{
    const btn=document.createElement("button");
    btn.textContent=b.label;
    btn.className=b.style||"";
    btn.onclick=()=>{ if(b.next) {currentStep=b.next; render();} };
    card.appendChild(btn);
  });
  app.appendChild(card);
}

function openHelp(id){
  const h=HELP[id];
  document.getElementById("help-title").textContent=h.title;
  document.getElementById("help-image").src=h.image;
  document.getElementById("help-modal").classList.remove("hidden");
}
function closeHelp(){
  document.getElementById("help-modal").classList.add("hidden");
}

render();
