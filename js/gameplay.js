document.addEventListener('DOMContentLoaded', () => {
  const state = new GameState();
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    messageModal = new ModalController(document.querySelector('.modal__window'), state),
    computer = new Scoreboard('computer', diceCtrl);

  function computerTurn() {
    function checkScoreMajorHand () {      
      if (diceCtrl.checkYahtzee(diceCtrl.valuesArray) && !computer.checkIsBtnDisabled('yahtzee')) {
        return 'yahtzee';
      } else if (diceCtrl.checkLargeStraight(diceCtrl.valuesArray) && !computer.checkIsBtnDisabled('largeStraight')) {
        return 'largeStraight';
      } else if (diceCtrl.checkSmallStraight(diceCtrl.valuesArray) && !computer.checkIsBtnDisabled('smallStraight')) {
        return 'smallStraight';
      } else if (diceCtrl.checkFullHouse(diceCtrl.valuesArray) && !computer.checkIsBtnDisabled('fullHouse')) {
        return 'fullHouse';
      } else if (diceCtrl.checkFourKind(diceCtrl.valuesArray) && !computer.checkIsBtnDisabled('fourOfKind')) {
        return 'fourOfKind';
      } else if (diceCtrl.checkThreeKind(diceCtrl.valuesArray ) && !computer.checkIsBtnDisabled('threeOfKind')) {
        return 'threeOfKind';
      } else if (!computer.checkIsBtnDisabled('any')) {
        return 'any';
      }
      return null;
    }

    diceCtrl.rollHand();
    
    while (checkScoreMajorHand() === null && checkCanRoll()) {
      setTimeout(() => diceCtrl.rollHand(), 1000);
    };

    if (checkScoreMajorHand() !== null) {
      setTimeout(() => {
        const btnToClickID = computer[checkScoreMajorHand()].id,
        btnToClickSelector = document.getElementById(btnToClickID);

        btnToClickSelector.click();

        console.log('%cGame state: ', 'color: orange', state);
      }, 1000); 

    } else {
      setTimeout(() => {
        const lowerScoreMap = {
          '1': 'one',
          '2': 'two',
          '3': 'three',
          '4': 'four',
          '5': 'five',
          '6': 'six'
        };
  
        let highestCount = 0,
          highestScoreCat;
  
        for (let i = 1, end = 7; i < end; i++ ) {
          if (!computer.checkIsBtnDisabled(lowerScoreMap(i.toString()))) {
            let count = diceCtrl.valuesArray.filter(value => value === i).length;
            console.log('%cCount', 'color: cyan', count);
  
            if (count > highestCount) {
              highestCount = count;
              highestScoreCat = i.toString();
            }
          } 
        }
  
        const btnToClickID = computer[lowerScoreMap[highestScoreCat]].id,
          btnToClickSelector = document.getElementById(btnToClickID);
  
        btnToClickSelector.click();
        console.log('%cGame state: ', 'color: orange', state);
      }, 1000);      
    }
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
  const playerScoreBtns = document.querySelectorAll('#player .score-btn'),
    computerScoreBtns = document.querySelectorAll('#computer .score-btn');

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

      if (state.currentPlayer.name === 'player') {
        Scoreboard.switchScoreboards(computer, playerOne);
      } else {
        Scoreboard.switchScoreboards(playerOne, computer);
      }      

      console.log('%cCurrent Player', 'color: pink', state.currentPlayer);

      if (state.currentPlayer.name === 'computer') {
        setTimeout(() => computerTurn(), 1000);
      }
    }

    if (messageModal.getMessageEventType() === 'gameOver') {
      messageModal.displayPlayAgainBtn();
      const winner = playerOne.total.value > computer.total.value
        ? playerOne
        : computer;
      messageModal.open(`<span style='text-transform: capitalize'>${winner.name}</span> is the winner with a score of ${winner.total.value}!`);
    }
  });

  // On play again reset for new game.
  messageModal.playAgainBtn.addEventListener('click', () => {
    messageModal.hidePlayAgainBtn();
    messageModal.close();
    playerOne.setToDefault();
    computer.setToDefault();
    diceCtrl.setToDefault();
    state.setToDefault();
    Scoreboard.switchScoreboards(computer, playerOne);
  });

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

  computerScoreBtns.forEach(elem => {
    elem.addEventListener('click', function(){
      const clickedElemID = this.id,
        scoreCategory = computer.getKey(clickedElemID),
        newScoreVal = diceCtrl.getScore(scoreCategory);

      if (scoreCategory !== null) {
        computer.updateScore(scoreCategory, newScoreVal);
        messageModal.open('Player 1 turn.');
        messageModal.setMessageEventType('changeTurn');
        setTimeout(() => messageModal.closeBtn.click(), 3000);
      } else {
        messageModal.open("ERROR! It's game over man, GAME OVER!");
      }      
    });
  });
});