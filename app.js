/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that,
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

  if(isGamePlaying)
  {
  var dice=Math.floor(Math.random()*6 )+1;
  var diceDOM=document.querySelector('.dice');
  var newdice=0;

  diceDOM.style.display='block'; //display the dixe image
  diceDOM.src='dice-'+dice+'.png'; // select image to querySelecto


  if(dice !== 1){
    roundScore +=dice; //add up the scores
    document.getElementById('current-'+activePlayer).textContent=roundScore; // update the current element on UI
    /*if(dice === 6){
      newdice += dice;
    }

    if(newdice === 12){
      scores[activePlayer] =0;
      document.getElementById('score-'+activePlayer).textContent= 0;
      nextPlayer();
    } */
  }


  else{ // if 1 is rolled, change the player panel.

    nextPlayer();
  }
}

});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(isGamePlaying){
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent= scores[activePlayer];

    var inputNum = document.querySelector(".final-score").value;
    var winningScore;
    if(inputNum){
      winningScore=inputNum;
    }
    else{
      winningScore=35;
    }
    if(scores[activePlayer] >= winningScore){
      document.getElementById('name-'+activePlayer).textContent='Winner!!';
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.dice').style.display='none';
      isGamePlaying=false;
    }
    else{
      nextPlayer();
    }





  }
  });


function nextPlayer(){

  if(activePlayer === 0 ? activePlayer =1: activePlayer=0);
  roundScore=0;     // set the round score to 0
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


  document.querySelector('.dice').style.display='none';

}

function init(){
  scores=[0,0];
  roundScore=0;
  activePlayer=0;
  isGamePlaying=true;
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';
  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';

  //hide the dice before
  document.querySelector('.dice').style.display='none';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';
}

document.querySelector('.btn-new').addEventListener('click', init);
