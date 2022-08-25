document.addEventListener('DOMContentLoaded', () => {
  const playerOne = new Scoreboard('player'),
    diceController = new Dice();

  diceController.generateDice();
  playerOne.generateScoreboard();
});