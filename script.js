'use strict';

// Step 1. Set the game to init stage

// Select different elements from the webpage
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl   = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Playing or not variable
let playing = true;
let currentScore = 0;
let activePlayer = 0;
let score = [0,0];

let player0Name = prompt('Enter Player 1 Name');
let player1Name = prompt('Enter Player 2 Name');

// Initialization function
const init = function(){
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    playing = true;  
    document.getElementById('name--0').textContent = player0Name;
    document.getElementById('name--1').textContent = player1Name;

    
    
}

// Switch player function
const switchPlayer = function(){
    // Make the currentScore of active player 0.
    currentScore = 0;

    // display it
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    // remove active class from this player
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
   
     // switch Active Player
     activePlayer = activePlayer === 0 ? 1: 0;

     // Also, switch the active player visually
     document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}



init();



// Step 2. Add Event Listener to Roll dice button and create a random number every time we click it.
// We want that numvber to be added to current Score and if dice roll is 1 , then chenge player.
btnRoll.addEventListener('click',function(){
    if(playing){
    
    let score =  Math.trunc(Math.random()*6)+1;
    // console.log(score);
    
    // We want the dice image corresponding to random number displayed on screen;
    // First make the dice element visible and then change the src of image corr. to generated number.

   diceEl.classList.remove('hidden');
   diceEl.src = `dice-${score}.png`;
   
   // Add dice score to currentScore, if score is 1 then switch the current player
   if(score === 1)
   {
    // Switch player
      switchPlayer();
   }
   else
   {
    currentScore += score;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
   }
    }


});



// Step 3. Add functionality to hold button.
btnHold.addEventListener('click',function(){

    if(playing){
  // Add current score of active player to total score of that active player
  score[activePlayer]+=currentScore;

  //Change the total score element as well.
  document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

// Now, if score of player is > score needed to win, then add the winner class to that element.
  if(score[activePlayer]>=20)
     {
         // Remove active class from that player element
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
         // Add winner class to that player element
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

         //Remove dice image by adding hidden class to it
         diceEl.classList.add('hidden');

         // Make the game unplayable by disabling btnHodl and btnRoll
         playing = false;
     }
     else
     {
           // switch player
           switchPlayer();
     }

    }

     
     
});


//Step 4. Add new Game functionality to game
btnNew.addEventListener('click', function(){
    // On clicking this buton, reset the game.
    init();
    

    // Make current score and element of active player 0, make total score element 0
    // make array of total score 0
   
    // Make current score and element of active player 0
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    // Total score array is set to 0 for both players.
    score = [0,0];

    // Display player 1 as active by using active element.
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    // Remove winner class as well.
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    
    // Reset the active player to 0.
    activePlayer = 0;

});
