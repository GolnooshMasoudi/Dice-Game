'use strict';

//Selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//we can define the bunch of variables by using commas .
//the variable that we defined inside of the init function are scoped to this init function,because this is where I declared them.The soloution is to declare these variables outside of the function but without any value.then we can reassign them inside of the fuction.
let scores, currentScore, activePlayer, playing;

const init = function () {
  //we will store the score of both players in an array.These scores are actually the final scores.Remember that the array is zero-based. So the score of player0 will be here at position zero and the score of player1 will be at position one.That's why it would be handy to have activePlayer variable here, also set to 0 and 1.
  scores = [0, 0];

  //We start "currentScore" at zero and we use "let" because we will keep updating it
  //we shouldn't create it inside of the function. if we do, each time that we clicked the button it would set to zero! we do not want that!!!
  currentScore = 0;
  //we should know who is "active player" to be able to display the current score in "if" down there.
  activePlayer = 0;

  //we need to have a state variable to define are we still playing or not.We need to define as soon as the game is finished the game is no longer playing and we can no longer click on the buttons.
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//In order to DRY (Don't Repeat Yourself) we can  create a function for when we need to swtich the players.But we do not need any argument or parameter. because the code is exactly the same in both situations.
//**attention: usually when we are refactoring sth like herethen there is many times like a small thing that changes in the code, then it's very useful to have a parameter so that we can call the function and specify what changes. But here nothing changes.All we want to do is simply repeat the code.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //We're reassigning active player here and use the turnery operator.
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //How toggle works? if it has the class it will remove it and if id doesn't have the class, it will add it
  //**attention: do not make a mistake like I did. when you're using "toggle" you shouldn't use . or # before writing the classname
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1- Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2-Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3-Check for rolled
    if (dice !== 1) {
      //3-1 if false, add dice to the current score
      currentScore += dice;
      //**attention: we could write it in another way and get the same result : currentScore = currentScore + dice ;
      // current0El.textContent = currentScore;
      //But it's better to select the element dynamically:
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //3-2 if true, switch to next player
    //In this step we realize that we need to track which player is an active player. Then we can plan how should we manage when dice is equal to 1.
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1- Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2- Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Finish the game
    else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//we need to remove the winner class and also set all scores of all the players back to zero.
//**we can just pass the value and do not call the function
btnNew.addEventListener('click', init);
