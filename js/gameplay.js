document.addEventListener('DOMContentLoaded', () => {
  const state = new GameState();
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    messageModal = new ModalController(document.querySelector('.modal__window'), state),
    computer = new Scoreboard('computer', diceCtrl);

  function computerTurn() {
    function tryToScoreMajorHand () {      
      if (diceCtrl.checkYahtzee() && !computer.checkIsBtnDisabled('yahtzee')) {
        computer.updateScore('yahtzee');
      } else if (diceCtrl.checkLargeStraight() && !computer.checkIsBtnDisabled('largeStraight')) {
        computer.updateScore('largeStraight');
      } else if (diceCtrl.checkSmallStraight() && !computer.checkIsBtnDisabled('smallStraight')) {
        computer.updateScore('smallStraight');
      } else if (diceCtrl.checkFullHouse() && !computer.checkIsBtnDisabled('fullHouse')) {
        computer.updateScore('fullHouse');
      } else if (diceCtrl.checkFourKind() && !computer.checkIsBtnDisabled('fourOfKind')) {
        computer.updateScore('fourOfKind');
      } else if (diceCtrl.checkThreeKind() && !computer.checkIsBtnDisabled('threeOfKind')) {
        computer.updateScore('threeOfKind');
      } else if (!computer.checkIsBtnDisabled('any')) {
        computer.updateScore('any');
      } else {
        return false;
      }
      return true;
    }
    
    diceCtrl.rollHand();
  }

  playerOne.generateScoreboard();
  computer.generateScoreboard();
  state.addPlayer(playerOne);
  state.addPlayer(computer);

  // Set up Roll Button functionality
  const rollBtnSelector = document.querySelector('aside button');

  rollBtnSelector.addEventListener('click', () => {
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

      diceSelector.forEach(die => {
        if (die.classList.contains('hold')) {
          die.classList.remove('hold');
        }
      });

      Scoreboard.switchScoreboards(playerOne, computer);
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