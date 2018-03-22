var min = 1;
var max = 100;
var score = 0;
var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
var numberOfGuesses = document.querySelector('.number-of-guesses')
var userInput = document.querySelector('#user-input');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var userInstruction = document.querySelector('#user-instruction');
var lastUserGuess = document.querySelector('#last-user-guess');
var userFeedback = document.querySelector('#user-feedback');
var userScore = document.querySelector('#user-score')
var statedMin = document.querySelector('#stated-min');
var statedMax = document.querySelector('#stated-max');
var addPlayer = document.querySelector('#add-player');
var playersTurn = document.querySelector('#players-turn')
var userMin = document.querySelector('#user-minimum');
var userMax = document.querySelector('#user-maximum');
var userDefinedRange = document.querySelector('#new-range-button');

console.log(randomNumber)

guessButton.addEventListener('click', replacePlaceholder);
userInput.addEventListener('keyup', enableButtons);
clearButton.addEventListener('click', clearInput);
userDefinedRange.addEventListener('click', userRange);

function enableButtons() {
  if (userInput.value.length === 0) {
    guessButton.disabled = true;
    clearButton.disabled = true;
  } else {
    guessButton.disabled = false;
    clearButton.disabled = false;
  }
};

function clearInput(){
  userInput.value = '';
  event.preventDefault();   
};

function replacePlaceholder() {
  var convertedGuess = parseInt(userInput.value);
  event.preventDefault(); 
  enableReset();
  checkGuess(convertedGuess);
if (convertedGuess >= min && convertedGuess <= max) {
  lastUserGuess.innerText = convertedGuess;
  clearInput();
  enableButtons();
  }
};

function enableReset() {
  resetButton.disabled = false;
};


function checkGuess(convertedGuess) {  
  if (convertedGuess < min || convertedGuess > max) {
    alert('Hey! Please enter a number from ' + min + ' - ' + max); 
  } else if (isNaN(convertedGuess)) {
    lastUserGuess.innerText = 'Dude!';
    userInstruction.innerText = 'Come on,';
    userFeedback.innerText = 'What part of number did you misunderstand?'; 
  } else if (convertedGuess > randomNumber) {
    userInstruction.innerText = 'Well...';
    userFeedback.innerText = 'That is too high!';
  } else if (convertedGuess < randomNumber) {
    userInstruction.innerText = 'Well...';
    userFeedback.innerText = 'That is too low!';
  } else if (convertedGuess === randomNumber) {
    userInstruction.innerText = 'Hell, yeah!';
    userFeedback.innerText = 'Boom!';
    score = score+=1;
    increaseRange();
    userScore.innerText = 'Score: ' + score;
  } 
 };

function increaseRange() {
  if (score === 1) {
    min = min - 11;
  } else {
    min = min - 10;
  } max = max + 10;
    randomNumber = generateInteger(min, max);
    console.log(randomNumber);
    clearInput();
}

function userRange() {
  min = parseInt(userMin.value);
  max = parseInt(userMax.value);
  randomNumber = generateInteger(min, max);
  console.log(randomNumber);
  clearInput();
}

function generateInteger(newMin, newMax) {
  var newRangeInstructions = document.querySelector('#new-range-instructions');
  statedMax.innerText = newMax;
  statedMin.innerText = newMin;
  newRangeInstructions.innerText = 'Your range is now ' + newMin + ' - ' + newMax;
  alert('Your New Range is ' + newMin + ' - ' + newMax);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
};

