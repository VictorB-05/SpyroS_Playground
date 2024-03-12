const cartas = [
    'fa-dog', 'fa-dog',
    'fa-cat', 'fa-cat',
    'fa-car', 'fa-car',
    'fa-bicycle', 'fa-bicycle',
    'fa-tree', 'fa-tree',
    'fa-umbrella', 'fa-umbrella',
    'fa-coffee', 'fa-coffee',
    'fa-leaf', 'fa-leaf',
    'fa-camera', 'fa-camera',
    'fa-birthday-cake', 'fa-birthday-cake',
    'fa-heart', 'fa-heart',
    'fa-star', 'fa-star',
    'fa-plane', 'fa-plane',
    'fa-rocket', 'fa-rocket',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt'
];

let cartaVolteada = null;
let puedeVoltear = false;
let intentosFallidos = 0; // Variable para llevar el registro de los intentos fallidos
const maxIntentosFallidos = 8; // Número máximo de intentos fallidos permitidos
let juegoTerminado = false; // Bandera para controlar si el juego ha terminado

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
    if (!puedeVoltear || this === cartaVolteada || this.classList.contains('flip') || juegoTerminado) return;

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
                intentosFallidos++; // Aumentar el contador de intentos fallidos
                if (intentosFallidos === maxIntentosFallidos) {
                    alert('Game Over');
                    juegoTerminado = true; // Establecer la bandera de juego terminado
                }
            }, 1000);
        } else {
            cartaVolteada = null;
        }
    }
}

function reiniciarJuego() {
    const tablero = document.getElementById('memory-game');
    tablero.innerHTML = ''; // Limpiar el tablero
    intentosFallidos = 0; // Reiniciar el contador de intentos fallidos
    juegoTerminado = false; // Reiniciar la bandera de juego terminado
    crearTablero(); // Volver a crear el tablero
}

document.getElementById('start-game').addEventListener('click', crearTablero);
document.getElementById('restart-game').addEventListener('click', reiniciarJuego);
