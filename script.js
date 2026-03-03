let totalPlayers = 0;
let currentPlayer = 1;
let scores = [];

function startGame(num) {
    totalPlayers = num;
    currentPlayer = 1;
    scores = [];
    updateHeader();
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    document.getElementById('btn-soles').classList.toggle('hidden', num !== 1);
}

function updateHeader() {
    document.getElementById('display-players').innerText = `RECUENTO: JUGADOR ${currentPlayer} DE ${totalPlayers}`;
    const btn = document.querySelector("button[onclick='calculateScore()']");
    btn.innerText = currentPlayer < totalPlayers ? `GUARDAR JUGADOR ${currentPlayer} ➔` : "VER RANKING FINAL 🏆";
}

function calculateScore() {
    // 1. PAISAJES
    const trees = (Number(document.getElementById('trees1').value)||0)*1 + 
                  (Number(document.getElementById('trees2').value)||0)*3 + 
                  (Number(document.getElementById('trees3').value)||0)*7;
    const mnt = (Number(document.getElementById('mnt2').value)||0)*3 + (Number(document.getElementById('mnt3').value)||0)*7;
    const fld = (Number(document.getElementById('fields').value)||0)*5;
    const bld = (Number(document.getElementById('buildings').value)||0)*5;

    // 2. AGUA
    const val = Number(document.getElementById('water-val').value)||0;
    const water = document.getElementById('water-mode').value === 'A' 
        ? (val <= 2 ? 0 : val === 3 ? 5 : val === 4 ? 8 : val === 5 ? 11 : val === 6 ? 15 : 15 + ((val-6)*4)) 
        : val * 5;

    // 3. FAUNA (9 cartas)
    let fauna = 0;
    document.querySelectorAll('.animal-input').forEach(i => fauna += Number(i.value)||0);

    // 4. ESPÍRITUS
    let spirit = 0;
    if(document.getElementById('spirit-check').checked) spirit = Number(document.getElementById('spirit-pts').value)||0;

    const total = trees + mnt + fld + bld + water + fauna + spirit;
    scores.push({ player: currentPlayer, points: total });

    if (currentPlayer < totalPlayers) {
        currentPlayer++;
        resetInputs();
        updateHeader();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showRanking();
    }
}

function showRanking() {
    scores.sort((a, b) => b.points - a.points);
    let html = `<h3 class="text-amber-400 font-black text-2xl mb-4 italic uppercase tracking-tighter">Ranking Final</h3>`;
    scores.forEach((s, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '👤';
        html += `<div class="flex justify-between items-center bg-slate-800 p-4 rounded-2xl mb-2 border border-slate-700 shadow-lg">
                    <span class="text-white font-bold text-sm">${medal} JUGADOR ${s.player}</span>
                    <span class="text-amber-400 font-black text-2xl">${s.points} <small class="text-[10px]">PTS</small></span>
                 </div>`;
    });
    html += `<p class="text-[10px] text-slate-500 mt-4 italic">En empate, gana quien puso más cubos de animal.</p>`;
    html += `<button onclick="resetGame()" class="w-full mt-6 bg-red-500/20 text-red-400 font-bold py-3 rounded-xl border border-red-500/50 uppercase text-xs">Nueva Partida</button>`;
    
    const res = document.getElementById('result');
    res.innerHTML = html;
    res.classList.remove('hidden');
    res.scrollIntoView({ behavior: 'smooth' });
}

function resetInputs() {
    document.querySelectorAll('input[type="number"]').forEach(i => i.value = "");
    document.getElementById('spirit-check').checked = false;
}

function resetGame() {
    resetInputs();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}

function toggleSolesTable() { document.getElementById('soles-modal').classList.toggle('hidden'); }

window.onload = () => {
    const container = document.getElementById('fauna-container');
    for (let i = 1; i <= 9; i++) {
        const card = document.createElement('div');
        card.className = "card-fauna bg-white rounded-2xl p-2 text-center shadow-sm";
        card.innerHTML = `<img src="assets/FAUNA${i}.png" alt="F${i}" class="w-full aspect-square mb-2 rounded-xl object-cover border border-amber-100">
                          <input type="number" placeholder="Pts" class="animal-input w-full p-1 text-center text-sm font-black border-none bg-amber-50 rounded-lg outline-none">`;
        container.appendChild(card);
    }
};