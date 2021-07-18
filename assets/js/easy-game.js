// @ts-nocheck

// Hides game until game difficulty level is selected
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('board').classList.add('no-display');
    document.getElementById('score-text').classList.add('no-display');
    document.getElementById("timer").classList.add('no-display');
});

// Credit for timer: User Bakudan on Stackoverflow (https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript)
function setTimer() {
    var sec = 0;
    function pad (val) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
}

// Global variables
const easyGameGrid = document.querySelector('#board');
const resultEasyDisplay = document.querySelector('#result');
var easyCardsSelected = [];
var easyCardsSelectedId = [];
var easyCardsRight = [];

document.getElementById('easy-button').addEventListener("click", startEasyGame);

function startEasyGame() {
    displayGame();
    createEasyBoard();
};

const fruitCardsEasy = fruitCardsModerate.slice(0, 6);

function createEasyBoard() {
    fruitCardsEasy.sort(() => 0.5 - Math.random())
    easyGameGrid.style.width = '50%';
    for (let i = 0; i < fruitCardsEasy.length; i++) {
        var easyCard = document.createElement('img');
        easyCard.setAttribute('src', './assets/images/fruit-card-back.png');
        easyCard.setAttribute('data-id', i);
        easyCard.setAttribute('alt', 'Card back, select to flip over');
        easyCard.classList.add('col-6', 'col-lg-4', 'fruitCard');
        easyCard.addEventListener('click', flipEasyCard);
        easyGameGrid.appendChild(easyCard);
    }
};

function flipEasyCard() {
    var easyCardId = this.getAttribute('data-id') // getting attribute from function above
    easyCardsSelected.push(fruitCardsEasy[easyCardId].name);
    easyCardsSelectedId.push(easyCardId);
    this.setAttribute('src', fruitCardsEasy[easyCardId].img);
    this.setAttribute('alt', fruitCardsEasy[easyCardId].name);
    if (easyCardsSelected.length === 2) {
        setTimeout(checkEasyMatch, 300) // this calls function checkMatch after 500 milliseconds
    };
};

function checkEasyMatch() {
    var easyCards = document.querySelectorAll('img')
    const easyCardOneId = easyCardsSelectedId[0];
    const easyCardTwoId = easyCardsSelectedId[1];
    // Bug fix: test easyCardsSelected for true equality, not easyCardsSelectedId
    if (easyCardsSelected[0] === easyCardsSelected[1]) {
        easyCardsRight.push(easyCardsSelected);
    } else {
        // Resets card back to card back is match is not found
        easyCards[easyCardOneId].setAttribute('src', './assets/images/fruit-card-back.png');
        easyCards[easyCardTwoId].setAttribute('src', './assets/images/fruit-card-back.png');
        easyCards[easyCardOneId].setAttribute('alt', 'Card back, select to flip over');
        easyCards[easyCardTwoId].setAttribute('alt', 'Card back, select to flip over');
    }
    // Resets the array
    easyCardsSelected = [];
    easyCardsSelectedId = [];
    // Updates score
    resultEasyDisplay.textContent = easyCardsRight.length; 
    if (easyCardsRight.length === fruitCardsEasy.length/2) {
        resultEasyDisplay.textContent = 'Congrats. You found them all!'
    }
};
