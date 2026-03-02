const SECTIONS = [
  { name:"Árboles", values:[0,1,3,7] },
  { name:"Montañas", values:[0,3,7] },
  { name:"Ríos", values:[0,2,5,8,11,15] },
  { name:"Prados", values:[0,5] },
  { name:"Ciudades", values:[0,5] },
  { name:"Espíritus", values:[0,3,6,9,12] },
  { name:"Fauna", values:[0,2,5,8,11,15], count:9 }
];

const game = document.getElementById("game");
const playerInputs = document.querySelectorAll(".player-inputs input");

let players = [];

function createPlayer(index) {
  const p = {
    name: playerInputs[index].value || `Jugador ${index+1}`,
    scores: {}
  };

  const div = document.createElement("div");
  div.className = "player";
  div.innerHTML = `<h3>${p.name}</h3>`;

  SECTIONS.forEach(section => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "section";
    sectionDiv.innerHTML = `<strong>${section.name}</strong>`;

    const count = section.count || 1;
    p.scores[section.name] = Array(count).fill(0);

    for(let i=0;i<count;i++){
      const card = document.createElement("div");
      card.className = "card";

      const buttons = document.createElement("div");
      buttons.className = "buttons";

      section.values.forEach(v=>{
        const b = document.createElement("button");
        b.textContent = v;
        b.onclick=()=>{
          p.scores[section.name][i]=v;
          [...buttons.children].forEach(x=>x.classList.remove("active"));
          b.classList.add("active");
          updateWinner();
        };
        buttons.appendChild(b);
      });

      card.appendChild(buttons);
      sectionDiv.appendChild(card);
    }

    div.appendChild(sectionDiv);
  });

  const total = document.createElement("div");
  total.className = "total";
  total.textContent = "Total: 0";
  p.totalEl = total;
  div.appendChild(total);

  game.appendChild(div);
  players.push(p);
}

function updateWinner(){
  let best = null;
  players.forEach(p=>{
    const total = Object.values(p.scores).flat().reduce((a,b)=>a+b,0);
    p.totalEl.textContent = `Total: ${total}`;
    if(!best || total>best.total) best={name:p.name,total};
  });
  document.getElementById("winner").textContent =
    best ? `Ganador: ${best.name} (${best.total} pts)` : "";
}

playerInputs.forEach((_,i)=>createPlayer(i));