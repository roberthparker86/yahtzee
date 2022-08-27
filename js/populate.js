document.addEventListener('DOMContentLoaded', () => {
  const playerOne = new Scoreboard('player'),
    computer = new Scoreboard('computer'),
    diceController = new Dice();

  diceController.generateDice();
  playerOne.generateScoreboard();
  computer.generateScoreboard();
});