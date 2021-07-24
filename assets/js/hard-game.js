// Global variables
const hardGameGrid = document.querySelector('#board');
const resultHardDisplay = document.querySelector('#result');
var hardCardsSelected = []
var hardCardsSelectedId = []
var hardCardsRight = []

document.getElementById('hard-button').addEventListener("click", startHardGame);

function startHardGame() {
    displayGame();
    createHardBoard();
    document.getElementById('reset').addEventListener("click", resetHardGame);
    counter.innerHTML = `0`;
};

const fruitCardsHard = [
    { name: "banana", img: "./assets/images/fruit-one-banana.png", },
    { name: "banana", img: "./assets/images/fruit-one-banana.png", },
    { name: "orange", img: "./assets/images/fruit-two-orange.png", },
    { name: "orange", img: "./assets/images/fruit-two-orange.png", },
    { name: "watermelon", img: "./assets/images/fruit-three-watermelon.png", },
    { name: "watermelon", img: "./assets/images/fruit-three-watermelon.png", },
    { name: "avocado", img: "./assets/images/fruit-four-avocado.png", },
    { name: "avocado", img: "./assets/images/fruit-four-avocado.png", },
    { name: "bluberry", img: "./assets/images/fruit-five-blueberry.png", },
    { name: "bluberry", img: "./assets/images/fruit-five-blueberry.png", },
    { name: "lime", img: "./assets/images/fruit-six-lime.png", },
    { name: "lime", img: "./assets/images/fruit-six-lime.png", },
    { name: "pineapple", img: "./assets/images/fruit-seven-pineapple.png", },
    { name: "pineapple", img: "./assets/images/fruit-seven-pineapple.png", },
    { name: "fig", img: "./assets/images/fruit-eight-fig.png", },
    { name: "fig", img: "./assets/images/fruit-eight-fig.png", },
    { name: "apple", img: "./assets/images/fruit-nine-apple.png", },
    { name: "apple", img: "./assets/images/fruit-nine-apple.png", },
];

function createHardBoard() {
    fruitCardsHard.sort(() => 0.5 - Math.random())
    hardGameGrid.style.width = '70%';
    for (let i = 0; i < fruitCardsHard.length; i++) {
        var hardCard = document.createElement('img')
        hardCard.setAttribute('src', './assets/images/fruit-card-back.png')
        hardCard.setAttribute('data-id', i)
        hardCard.setAttribute('alt', 'Card back, select to flip over')
        hardCard.classList.add('col-4', 'col-lg-2', 'fruitHardCard')
        hardCard.addEventListener('click', flipHardCard)
        hardGameGrid.appendChild(hardCard)
    }
}

function flipHardCard() {
    var hardCardId = this.getAttribute('data-id')
    hardCardsSelected.push(fruitCardsHard[hardCardId].name)
    hardCardsSelectedId.push(hardCardId)
    this.setAttribute('alt', fruitCardsHard[hardCardId].name)
    this.setAttribute('src', fruitCardsHard[hardCardId].img)
    if (hardCardsSelected.length === 2) {
        setTimeout(checkHardMatch, 300)
    }
}

function checkHardMatch() {
    var hardCards = document.querySelectorAll('img')
    const hardCardOneId = hardCardsSelectedId[0]
    const hardCardTwoId = hardCardsSelectedId[1]
    if (hardCardsSelected[0] === hardCardsSelected[1]) {
        hardCardsRight.push(hardCardsSelected);
        moveCounter();
    } else {
        hardCards[hardCardOneId].setAttribute('src', './assets/images/fruit-card-back.png')
        hardCards[hardCardTwoId].setAttribute('src', './assets/images/fruit-card-back.png')
        hardCards[hardCardOneId].setAttribute('alt', 'Card back, select to flip over')
        hardCards[hardCardTwoId].setAttribute('alt', 'Card back, select to flip over')
        moveCounter();
    }
    hardCardsSelected = []
    hardCardsSelectedId =[]
    resultHardDisplay.textContent = hardCardsRight.length
    if (hardCardsRight.length === fruitCardsHard.length/2) {
        resultHardDisplay.textContent = 'Congrats. You found them all!'
    }
}
function resetHardGame() {
    hardCardsSelected = [];
    hardCardsSelectedId = [];
    hardCardsRight = [];
    hardCards = document.querySelectorAll('img')
    fruitCardsHard.sort(() => 0.5 - Math.random())
    hardCards.forEach((c) => {
        c.setAttribute('src', './assets/images/fruit-card-back.png');
    });
    resultHardDisplay.textContent = `0`;
    counter.innerHTML = `0`;
    resetTimer();
};

function resetTimer() {
    document.getElementById("seconds").innerHTML = `00`
    document.getElementById("minutes").innerHTML = `00`
    totalSeconds = `0`;
}
