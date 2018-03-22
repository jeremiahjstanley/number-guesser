var min = 1;
var max = 100;
var score = 0;
var turn = 0;
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
addPlayer.addEventListener('click', twoPlayer);

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
  turnCounter();
  updateGuessCount()
  }
};

function enableReset() {
  resetButton.disabled = false;
};

function updateGuessCount() {
  numberOfGuesses.innerText = turn;
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
    turn = 0 - 1
    increaseRange();
    confetti();
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

function turnCounter() {
  turn = turn + 1;
if (addPlayer.innerText === 'Play Single Player') {
   alternateTurn(turn);
 }
};

function twoPlayer (){
  event.preventDefault(); 
  if (addPlayer.innerText === 'Add Player?') {
    playersTurn.innerText = 'It is Player One\'s turn';
    addPlayer.innerText = 'Play Single Player'; 
  } else {
    playersTurn.innerText = '';
    addPlayer.innerText = 'Add Player?'; 
  }
};

function alternateTurn(turn) {
  if (1 !== isOdd(turn)) {
    playersTurn.innerText = 'It is Player One\'s turn';
  } else if (1 === isOdd(turn)) {
    playersTurn.innerText = 'It is Player Two\'s turn' ;
  } 
}; 

function isOdd(num) {
  return  num % 2;
};

function confetti() {
  class Progress {
  constructor(param = {}) {
    this.timestamp        = null;
    this.duration         = param.duration || Progress.CONST.DURATION;
    this.progress         = 0;
    this.delta            = 0;
    this.progress         = 0;
    this.isLoop           = !!param.isLoop;

    this.reset();
  }

  static get CONST() {
    return {
      DURATION : 1000
    };
  }

  reset() {
    this.timestamp = null;
  }

  start(now) {
    this.timestamp = now;
  }

  tick(now) {
    if (this.timestamp) {
      this.delta    = now - this.timestamp;
      this.progress = Math.min(this.delta / this.duration, 1);

      if (this.progress >= 1 && this.isLoop) {
        this.start(now);
      }

      return this.progress;
    } else {
      return 0;
    }
  }
}

class Confetti {
  constructor(param) {
    this.parent         = param.elm || document.body;
    this.canvas         = document.createElement("canvas");
    this.ctx            = this.canvas.getContext("2d");
    this.width          = param.width  || this.parent.offsetWidth;
    this.height         = param.height || this.parent.offsetHeight;
    this.length         = param.length || Confetti.CONST.PAPER_LENGTH;
    this.yRange         = param.yRange || this.height * 2;
    this.progress       = new Progress({
      duration : param.duration,
      isLoop   : true
    });
    this.rotationRange  = typeof param.rotationLength === "number" ? param.rotationRange
                                                                   : 10;
    this.speedRange     = typeof param.speedRange     === "number" ? param.speedRange
                                                                   : 10;
    this.sprites        = [];

    this.canvas.style.cssText = [
      "display: block",
      "position: absolute",
      "top: 0",
      "left: 0",
      "pointer-events: none"
    ].join(";");

    this.render = this.render.bind(this);

    this.build();

    this.parent.appendChild(this.canvas);
    this.progress.start(performance.now());

    requestAnimationFrame(this.render);
  }

  static get CONST() {
    return {
        SPRITE_WIDTH  : 9,
        SPRITE_HEIGHT : 16,
        PAPER_LENGTH  : 100,
        DURATION      : 8000,
        ROTATION_RATE : 50,
        COLORS        : [
          "#EF5350",
          "#EC407A",
          "#AB47BC",
          "#7E57C2",
          "#5C6BC0",
          "#42A5F5",
          "#29B6F6",
          "#26C6DA",
          "#26A69A",
          "#66BB6A",
          "#9CCC65",
          "#D4E157",
          "#FFEE58",
          "#FFCA28",
          "#FFA726",
          "#FF7043",
          "#8D6E63",
          "#BDBDBD",
          "#78909C"
        ]
    };
  }

  build() {
    for (let i = 0; i < this.length; ++i) {
      let canvas = document.createElement("canvas"),
          ctx    = canvas.getContext("2d");

      canvas.width  = Confetti.CONST.SPRITE_WIDTH;
      canvas.height = Confetti.CONST.SPRITE_HEIGHT;

      canvas.position = {
        initX : Math.random() * this.width,
        initY : -canvas.height - Math.random() * this.yRange
      };

      canvas.rotation = (this.rotationRange / 2) - Math.random() * this.rotationRange;
      canvas.speed    = (this.speedRange / 2) + Math.random() * (this.speedRange / 2);

      ctx.save();
        ctx.fillStyle = Confetti.CONST.COLORS[(Math.random() * Confetti.CONST.COLORS.length) | 0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      this.sprites.push(canvas);
    }
  }

  render(now) {
    let progress = this.progress.tick(now);

    this.canvas.width  = this.width;
    this.canvas.height = this.height;

    for (let i = 0; i < this.length; ++i) {
      this.ctx.save();
        this.ctx.translate(
          this.sprites[i].position.initX + this.sprites[i].rotation * Confetti.CONST.ROTATION_RATE * progress,
          this.sprites[i].position.initY + progress * (this.height + this.yRange)
        );
        this.ctx.rotate(this.sprites[i].rotation);
        this.ctx.drawImage(
          this.sprites[i],
          -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)) / 2,
          -Confetti.CONST.SPRITE_HEIGHT / 2,
          Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)),
          Confetti.CONST.SPRITE_HEIGHT
        );
      this.ctx.restore();
    }

    requestAnimationFrame(this.render);
  }
}

(() => {
  const DURATION = 8000,
        LENGTH   = 120;

  new Confetti({
    width    : window.innerWidth,
    height   : window.innerHeight,
    length   : LENGTH,
    duration : DURATION
  });

  setTimeout(() => {
    new Confetti({
      width    : window.innerWidth,
      height   : window.innerHeight,
      length   : LENGTH,
      duration : DURATION
    });
  }, DURATION / 2);
})();
}

