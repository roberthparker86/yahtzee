document.addEventListener('DOMContentLoaded', () => {
  const state = new GameState();
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    messageModal = new ModalController(document.querySelector('.modal__window'), state),
    computer = new Scoreboard('computer', diceCtrl);

  playerOne.generateScoreboard();
  computer.generateScoreboard();

  // Set up Roll Button functionality
  const rollBtnSelector = document.querySelector('aside button');

  // START BACK HERE. ABLE TO ROLL MORE THAN THREE TIMES.
  rollBtnSelector.addEventListener('click', () => {
    console.log(diceCtrl.checkCanRoll(), diceCtrl.rollCount);
    if (diceCtrl.checkCanRoll()) {
      diceCtrl.rollHand();
    } else {
      messageModal.open('No more rolls!');
    }    
  });

  // Set Hold functionality for dice
  const diceSelector = document.querySelectorAll('i.dice');

  diceSelector.forEach(die => {
    die.addEventListener('click', function() {
      this.classList.contains('hold')
        ? this.classList.remove('hold')
        : this.classList.add('hold');
    });
  });

  // Set event listeners for player score buttons
  const playerScoreBtns = document.querySelectorAll('#player .score-btn');

  playerScoreBtns.forEach(elem => {
    elem.addEventListener('click', function(){
      const clickedElemID = this.id,
        scoreCategory = playerOne.getKey(clickedElemID),
        newScoreVal = diceCtrl.getScore(scoreCategory);

      if (scoreCategory !== null) {
        playerOne.updateScore(scoreCategory, newScoreVal);
        messageModal.open('Computer turn.');
      } else {
        messageModal.open("ERROR! It's game over man, GAME OVER!");
      }      
    });
  });
});