const cards = ['fa-dog', 'fa-dog', 'fa-cat', 'fa-cat', 'fa-car', 'fa-car', 'fa-bicycle', 'fa-bicycle', 'fa-tree', 'fa-tree', 'fa-umbrella', 'fa-umbrella', 'fa-coffee', 'fa-coffee', 'fa-leaf', 'fa-leaf'];
let flippedCard = null;
let canFlip = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de crear nuevos cuadrados
    shuffle(cards);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front-face', 'fas', card);

        const backFace = document.createElement('div');
        backFace.classList.add('card-face');

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    canFlip = true;
}

function flipCard() {
    if (!canFlip || this === flippedCard || this.classList.contains('flip')) return;

    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = this;
    } else {
        if (flippedCard.querySelector('.front-face').classList.value !== this.querySelector('.front-face').classList.value) {
            canFlip = false;
            setTimeout(() => {
                flippedCard.classList.remove('flip');
                this.classList.remove('flip');
                flippedCard = null;
                canFlip = true;
            }, 1000);
        } else {
            flippedCard = null;
        }
    }
}

function restartGame() {
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = ''; // Limpiar el tablero
    createGameBoard(); // Volver a crear el tablero
}

document.getElementById('start-game').addEventListener('click', createGameBoard);
document.getElementById('restart-game').addEventListener('click', restartGame);
