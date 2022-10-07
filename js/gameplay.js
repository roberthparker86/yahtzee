document.addEventListener('DOMContentLoaded', () => {
  const state = new GameState();
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    messageModal = new ModalController(document.querySelector('.modal__window'), state),
    computer = new Scoreboard('computer', diceCtrl);

  playerOne.generateScoreboard(messageModal);
  computer.generateScoreboard(messageModal);

  const rollBtnSelector = document.querySelector('aside button');
  rollBtnSelector.addEventListener('click', () => {
    if (diceCtrl.checkCanRoll()) {
      diceCtrl.rollHand();
    } else {
      messageModal.open('No more rolls!');
    }    
  });

  const diceSelector = document.querySelectorAll('i.dice');
  diceSelector.forEach(die => {
    die.addEventListener('click', function() {
      this.classList.contains('hold')
        ? this.classList.remove('hold')
        : this.classList.add('hold');
    });
  });
});