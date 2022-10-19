document.addEventListener('DOMContentLoaded', () => {
  const state = new GameState();
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    messageModal = new ModalController(document.querySelector('.modal__window'), state),
    computer = new Scoreboard('computer', diceCtrl);

  playerOne.generateScoreboard();
  computer.generateScoreboard();
  state.addPlayer(playerOne);
  state.addPlayer(computer);

  // Set up Roll Button functionality
  const rollBtnSelector = document.querySelector('aside button');

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

  // Implement close modal and side effects
  messageModal.closeBtn.addEventListener('click', () => {
    messageModal.close();
    if (messageModal.getMessageEventType() === 'changeTurn') {
      state.changeTurn();
      messageModal.setMessageEventType(null);
      console.log({
        state,
        messageModal
      });
    }
  })

  playerScoreBtns.forEach(elem => {
    elem.addEventListener('click', function(){
      const clickedElemID = this.id,
        scoreCategory = playerOne.getKey(clickedElemID),
        newScoreVal = diceCtrl.getScore(scoreCategory);

      if (scoreCategory !== null) {
        playerOne.updateScore(scoreCategory, newScoreVal);
        messageModal.open('Computer turn.');
        messageModal.setMessageEventType('changeTurn');
      } else {
        messageModal.open("ERROR! It's game over man, GAME OVER!");
      }      
    });
  });
});