document.addEventListener('DOMContentLoaded', () => {
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    computer = new Scoreboard('computer', diceCtrl);

  const messageModal = new ModalController(document.querySelector('.modal__window'));

  setTimeout(() => messageModal.open('WOOTSAUCE!'), 2000);

  playerOne.generateScoreboard();
  computer.generateScoreboard();

  const rollBtnSelector = document.querySelector('aside button');
  rollBtnSelector.addEventListener('click', () => diceCtrl.rollHand());

  const diceSelector = document.querySelectorAll('i.dice');
  diceSelector.forEach(die => {
    die.addEventListener('click', function() {
      this.classList.contains('hold')
        ? this.classList.remove('hold')
        : this.classList.add('hold');
    });
  });
});