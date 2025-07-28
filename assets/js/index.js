'use strict';

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const playButton = document.querySelector('.play');
const guessTimes = document.querySelector('.guess-times');
const guessButton = document.querySelector('.guess');
const answer = document.querySelector('.answer');
const flipCard = document.querySelector('.flip-card');
let randomNumber;
let times = 10;

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 50);
}

function validateInput(value) {
    const inputNumber = Number(value); 
    if (isNaN(inputNumber) || value.trim() === '' || inputNumber < 0 
    || !Number.isInteger(inputNumber)) {
        output.value = 'Please enter a valid number';
        return false;
    }
    return true;
}

function initializeGame() {
    times = 10;
    generateRandomNumber();
    guessTimes.innerText = 'Guesses Left: 10';

    input.value = '';
    input.disabled = false;
    input.style.cursor = 'pointer';
    output.value = '';
    guessButton.style.cursor = 'pointer';
    flipCard.style.transform = 'rotateY(0deg)';
    output.value = 'Enter a number in the circle';
}

function endGame() {
    input.value = '';
    input.disabled = true;
    input.style.cursor = 'not-allowed';
    guessButton.style.cursor = 'not-allowed';
    playButton.style.cursor = 'pointer';
}

function checkNumber() {
    const userGuess = parseInt(input.value.trim(), 10);

    if (!validateInput(input.value)) return; 

    if (userGuess > randomNumber) {
        output.value = 'My number is smaller';
    } else if (userGuess < randomNumber) {
        output.value = 'My number is bigger';
    } else {
        output.value = 'Correct Guess!!!';
        answer.innerText = `${randomNumber}`;
        flipCard.style.transform = 'rotateY(180deg)';
        endGame(); 
    }
}

guessButton.addEventListener('click', function() {
    if (!input.disabled) {
        if(times > 0) {
            checkNumber(input.value);
            times--;
            guessTimes.innerText = `Guesses Left: ${times}`;
            input.value = '';
            input.focus();
        } else if(times === 0) {
            guessTimes.innerText = `Guesses Left: ${times}`;
            output.value = 'Game Over!';
            endGame();
        }
    }
});

playButton.addEventListener('click', () => {
    initializeGame();
    input.focus();
    playButton.innerText = 'RESTART';
});