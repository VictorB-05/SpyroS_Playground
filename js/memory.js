const cartas = ['fa-dog', 'fa-dog', 'fa-cat', 'fa-cat', 'fa-car', 'fa-car', 'fa-bicycle', 'fa-bicycle', 'fa-tree', 'fa-tree', 'fa-umbrella', 'fa-umbrella', 'fa-coffee', 'fa-coffee', 'fa-leaf', 'fa-leaf'];
let cartaVolteada = null;
let puedeVoltear = false;

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function crearTablero() {
    const tablero = document.getElementById('memory-game');
    tablero.innerHTML = ''; // Limpiar el tablero antes de crear nuevas cartas
    mezclar(cartas);

    cartas.forEach((carta, index) => {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('memory-card');

        const caraFrontal = document.createElement('div');
        caraFrontal.classList.add('card-face', 'front-face', 'fas', carta);

        const caraPosterior = document.createElement('div');
        caraPosterior.classList.add('card-face');

        elementoCarta.appendChild(caraFrontal);
        elementoCarta.appendChild(caraPosterior);

        elementoCarta.addEventListener('click', voltearCarta);
        tablero.appendChild(elementoCarta);
    });

    puedeVoltear = true;
}

function voltearCarta() {
    if (!puedeVoltear || this === cartaVolteada || this.classList.contains('flip')) return;

    this.classList.add('flip');

    if (!cartaVolteada) {
        cartaVolteada = this;
    } else {
        if (cartaVolteada.querySelector('.front-face').classList.value !== this.querySelector('.front-face').classList.value) {
            puedeVoltear = false;
            setTimeout(() => {
                cartaVolteada.classList.remove('flip');
                this.classList.remove('flip');
                cartaVolteada = null;
                puedeVoltear = true;
            }, 1000);
        } else {
            cartaVolteada = null;
        }
    }
}

function reiniciarJuego() {
    const tablero = document.getElementById('memory-game');
    tablero.innerHTML = ''; // Limpiar el tablero
    crearTablero(); // Volver a crear el tablero
}

document.getElementById('start-game').addEventListener('click', crearTablero);
document.getElementById('restart-game').addEventListener('click', reiniciarJuego);
