let randomNum = parseInt(Math.random() * 100 + 1);
const userInput = document.getElementById('guessField');
const submit = document.getElementById('subt');
const guessSlot = document.querySelector('.guesses');
const guess_rem = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuesses = [];
let rem = 10;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number greater than or equal to 1');
  } else if (guess > 100) {
    alert('Please enter a number less than or equal to 100');
  } else {
    prevGuesses.push(guess);
    if (rem === 1) {
      displayGuess(guess);
      displayMessage(`Game is Over. Random number was ${randomNum}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    displayMessage('Your guess is right');
    endGame();
  } else if (guess > randomNum) {
    displayMessage('Your guess is High');
  } else {
    displayMessage('Your guess is low');
  }
}
function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess} `;
  rem--;
  guess_rem.innerHTML = `${rem}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<p>${message}</p>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<button id='newGame'>Start new Game</button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNum = parseInt(Math.random() * 100 + 1);
    prevGuesses = [];
    guessSlot.innerHTML = '';
    rem = 10;
    guess_rem.innerHTML = `${rem}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
