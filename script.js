window.onload = () => {
    const container = document.getElementById('fauna-container');
    for (let i = 1; i <= 9; i++) {
        const card = document.createElement('div');
        card.className = "card-fauna bg-white rounded-2xl p-2 text-center shadow-sm";
        card.innerHTML = `
            <img src="assets/FAUNA${i}.png" alt="Especie ${i}" class="w-full aspect-square mb-2 rounded-xl object-cover">
            <input type="number" placeholder="Pts" class="animal-input w-full p-1 text-center text-sm font-bold border-none bg-amber-50 rounded-lg outline-none focus:ring-1 focus:ring-amber-500">
        `;
        container.appendChild(card);
    }
};

function calculateScore() {
    // A. Paisajes Naturales (Reglamento Oficial) [11-15]
    const trees = (Number(document.getElementById('trees1').value)||0)*1 + 
                  (Number(document.getElementById('trees2').value)||0)*3 + 
                  (Number(document.getElementById('trees3').value)||0)*7;
    
    const mnt = (Number(document.getElementById('mnt2').value)||0)*3 + 
                (Number(document.getElementById('mnt3').value)||0)*7; // Solo si son adyacentes
    
    const fieldPts = (Number(document.getElementById('fields').value)||0)*5; // Cada grupo 2+ = 5pts
    const buildPts = (Number(document.getElementById('buildings').value)||0)*5; // 3+ colores vecinos

    // B. Agua (Lado A Progresión / Lado B Islas) [14, 16]
    let waterPts = 0;
    const waterVal = Number(document.getElementById('water-val').value)||0;
    if(document.getElementById('water-mode').value === 'A') {
        const riverTable =;
        waterPts = waterVal <= 6 ? riverTable[waterVal] : 15 + ((waterVal-6)*4);
    } else {
        waterPts = waterVal * 5; // 5 pts por isla
    }

    // C. Recuento de Fauna (9 cartas) [15, 17]
    let faunaTotal = 0;
    document.querySelectorAll('.animal-input').forEach(input => {
        faunaTotal += Number(input.value) || 0; // Se anota el espacio vacío más alto
    });

    // D. Espíritus de la Naturaleza (Condicional) [6, 7]
    let spiritPts = 0;
    if (document.getElementById('spirit-check').checked) {
        spiritPts = Number(document.getElementById('spirit-pts').value) || 0;
    }

    // Suma final
    const total = trees + mnt + fieldPts + buildPts + waterPts + faunaTotal + spiritPts;
    
    // Animación y visualización de resultados
    document.getElementById('total-pts').innerText = total;
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}