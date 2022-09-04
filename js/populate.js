document.addEventListener('DOMContentLoaded', () => {
  const diceCtrl = new Dice();
  const playerOne = new Scoreboard('player', diceCtrl),
    computer = new Scoreboard('computer', diceCtrl);

  playerOne.generateScoreboard();
  computer.generateScoreboard();

  const rollBtnSelector = document.querySelector('aside button');
  rollBtnSelector.addEventListener('click', () => diceCtrl.rollHand());

  diceCtrl.getScore();
});