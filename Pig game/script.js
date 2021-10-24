'use strict';

//Selecting elements
const score0 = document.querySelector('#score--0'); //scorul jucatorului 1
const score1 =document.getElementById('score--1'); //scorul jucatorului 2
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');

const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');

const scores =[0,0]; //scorul curent pentru ambii jucatori proneste de la 0 si se stocheaza in acest array
let currentScore = 0;
let activePlayer = 0;
let totalScore = 0;
let playing = true;

score0.textContent = 0; //0 - number dar JavaScript converteste automat in String. 
score1.textContent = 0;
diceElement.classList.add('hidden');


const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer= activePlayer === 0 ? 1:0; //dc active Player = 0 atunci activePlayer = 1 in caz contrat activePlayer = 0.
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
    diceElement.classList.remove('hidden');
    let numberDice = Math.trunc(Math.random()*6)+1;
    diceElement.src=`dice-${numberDice}.png`;
    /*VARIANTA MAI LUNGA
    if(numberDice === 1){
       dice.src = "dice-1.png";
    }else if(numberDice === 2){
        dice.src = "dice-2.png";;
    }else if(numberDice ===3){
        dice.src = "dice-3.png";
    }else if(numberDice === 4){
        dice.src = "dice-4.png";
    }else if(numberDice === 5){
        dice.src = "dice-5.png";
    }else if(numberDice ===6){
        dice.src = "dice-6.png";
}*/
    if(numberDice!==1){
        currentScore = currentScore + numberDice;
       // currentScorePlayer0.textContent = currentScore; am adaugat scorul primului jucator (0) dar noi vrem sa adaugam scorul jucatorului activ
       document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
       switchPlayer();
       
    }
}

});

btnHold.addEventListener('click', function(){
    scores[activePlayer] += currentScore;//In momentul in care este jucatorul 0 scores[0]=scores[0]+currentScore;

    //document.getElementById(`current--${activePlayer}`) -> selectam jucatorul curent
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    

    //2.Check if player's score is >=100
    if(scores[activePlayer] >=10){
       playing = false;
       diceElement.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        
    }else{
        switchPlayer();
    }
   });