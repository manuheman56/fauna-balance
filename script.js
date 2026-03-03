let playerCount = 0;

function startGame(num) {
    playerCount = num;
    document.getElementById('display-players').innerText = `Partida de ${num} ${num === 1 ? 'Especie Solitaria' : 'Especies'}`;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');

    if (num === 1) {
        document.getElementById('btn-soles').classList.remove('hidden');
    } else {
        document.getElementById('btn-soles').classList.add('hidden');
    }
}

function toggleSolesTable() {
    document.getElementById('soles-modal').classList.toggle('hidden');
}

// Función para reiniciar todos los campos y volver al inicio
function resetGame() {
    // 1. Limpiar todos los inputs numéricos
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => input.value = "");

    // 2. Desmarcar el checkbox de espíritus
    document.getElementById('spirit-check').checked = false;

    // 3. Ocultar resultados y app principal, volver a portada
    document.getElementById('result').classList.add('hidden');
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    
    // 4. Resetear variables
    playerCount = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generar las 9 cartas de fauna al cargar
window.onload = () => {
    const container = document.getElementById('fauna-container');
    for (let i = 1; i <= 9; i++) {
        const card = document.createElement('div');
        card.className = "card-fauna bg-white rounded-2xl p-2 text-center shadow-sm";
        card.innerHTML = `
            <img src="assets/FAUNA${i}.png" alt="FAUNA ${i}" class="w-full aspect-square mb-2 rounded-xl object-cover">
            <input type="number" placeholder="Pts" class="animal-input w-full p-1 text-center text-sm font-bold border-none bg-amber-50 rounded-lg outline-none focus:ring-2 focus:ring-amber-400">
        `;
        container.appendChild(card);
    }
};

function calculateScore() {
    // Paisajes Naturales (Lógica según fuentes [3-8, 10])
    const trees = (Number(document.getElementById('trees1').value)||0)*1 + 
                  (Number(document.getElementById('trees2').value)||0)*3 + 
                  (Number(document.getElementById('trees3').value)||0)*7;
    const mnt = (Number(document.getElementById('mnt2').value)||0)*3 + (Number(document.getElementById('mnt3').value)||0)*7;
    const fld = (Number(document.getElementById('fields').value)||0)*5;
    const bld = (Number(document.getElementById('buildings').value)||0)*5;

    const val = Number(document.getElementById('water-val').value)||0;
    const riverTable = [17-21]; // Tabla oficial [5, 8]
    const water = document.getElementById('water-mode').value === 'A' 
        ? (val <= 6 ? riverTable[val] : 15 + ((val-6)*4)) 
        : val * 5;

    // Recuento Fauna (9 cartas) [9, 10]
    let fauna = 0;
    document.querySelectorAll('.animal-input').forEach(i => fauna += Number(i.value)||0);

    // Espíritus (Condicional) [11-13]
    let spirit = 0;
    if(document.getElementById('spirit-check').checked) {
        spirit = Number(document.getElementById('spirit-pts').value)||0;
    }

    const total = trees + mnt + fld + bld + water + fauna + spirit;
    document.getElementById('total-pts').innerText = total;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}