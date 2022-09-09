document.addEventListener('DOMContentLoaded', () => {
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    computer = new Scoreboard('computer', diceCtrl);

  const openModal = (content) => {
    const modalBackdrop = document.querySelector('.modal__backdrop'),
      modalWindow = document.querySelector('.modal__window'),
      modalMessage = document.querySelector('.modal__message');

    modalBackdrop.classList.remove('d-none');
    modalWindow.classList.remove('d-none');
    modalMessage.innerHTML = content;

    setTimeout(() => {
      modalBackdrop.classList.add('open');
      modalWindow.classList.add('open');
    }, 20);
  }

  setTimeout(() => openModal('WOOTSAUCE!'), 2000);

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