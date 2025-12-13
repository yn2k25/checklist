
let step = 1;

function render(){
  const s = STEPS.find(x=>x.id===step);
  const app = document.getElementById("app");
  app.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>Step ${s.id}: ${s.title}</h2>` + s.content;
  app.appendChild(card);

  card.querySelectorAll(".accordion").forEach(acc=>{
    acc.querySelector(".acc-head").onclick=()=>acc.classList.toggle("open");
  });

  card.querySelectorAll("[data-next]").forEach(b=>{
    b.onclick=()=>{ step = Number(b.dataset.next); render(); };
  });

  card.querySelectorAll("[data-back]").forEach(b=>{
    b.onclick=()=>{ step = Math.max(1, step-1); render(); };
  });

  card.querySelectorAll("[data-help]").forEach(b=>{
    b.onclick=()=>openHelp(b.dataset.help);
  });
}

function openHelp(id){
  const h = HELP[id];
  document.getElementById("helpTitle").textContent = h.title;
  document.getElementById("helpImage").src = "images/" + h.image;
  document.getElementById("helpModal").classList.remove("hidden");
}
function closeHelp(){
  document.getElementById("helpModal").classList.add("hidden");
}

render();
