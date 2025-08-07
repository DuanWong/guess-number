'use strict';

const input = document.querySelector('.input');
const output = document.querySelector('.output');
const playButton = document.querySelector('.play');
const guessTimes = document.querySelector('.guess-times');
const guessButton = document.querySelector('.guess');
const answer = document.querySelector('.answer');
const flipCard = document.querySelector('.flip-card');
const clickSound = new Audio('assets/audio/click.mp3');
const gameSound = new Audio('assets/audio/game.mp3');
const successSound = new Audio('assets/audio/success.mp3');
const failSound = new Audio('assets/audio/fail.mp3');
 
let randomNumber;
let times = 10;

function playGameSound() {
    gameSound.currentTime = 0;
    gameSound.play();
    gameSound.loop = true;
}

function stopGameSound() {
    gameSound.pause();
    gameSound.currentTime = 0;
}

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 51);
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
    stopGameSound();
}

function checkNumber(isLastGuess = false) {
    clickSound.play();
    const userGuess = parseInt(input.value.trim(), 10);

    if (!validateInput(input.value)) return; 

    times--;
    guessTimes.innerText = `Guesses Left: ${times}`;

    if (userGuess > randomNumber) {
        if (isLastGuess) {
            output.value = 'Game Over';
            failSound.play();
        } else {
            output.value = 'My number is smaller';
        }
    } else if (userGuess < randomNumber) {
        if (isLastGuess) {
            output.value = 'Game Over';
            failSound.play();
        } else {
            output.value = 'My number is bigger';
        }
    } else {
        output.value = 'Correct Guess!!!';
        successSound.play();
        answer.innerText = `${randomNumber}`;
        flipCard.style.transform = 'rotateY(180deg)';
        endGame(); 
    }
}

guessButton.addEventListener('click', function() {
    if (!input.disabled) {
        if(times > 1) {
            checkNumber(false);
            input.value = '';
            input.focus();
        } else if(times === 1) {
            checkNumber(true);
            endGame();
        }
    }
});

playButton.addEventListener('click', () => {
    clickSound.play();
    playGameSound();
    initializeGame();
    input.focus();
    playButton.innerText = 'RESTART';
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !input.disabled) {
    guessButton.click();
  }
});