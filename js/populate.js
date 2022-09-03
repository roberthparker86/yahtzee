document.addEventListener('DOMContentLoaded', () => {
  const playerOne = new Scoreboard('player'),
    computer = new Scoreboard('computer'),
    diceCtrl = new Dice();

  playerOne.generateScoreboard();
  computer.generateScoreboard();

  const allScoreBtnsSelector = document.querySelectorAll('button.score-btn');
  allScoreBtnsSelector.forEach(elem => {
    elem.addEventListener('click', function(){
      const player = this.getAttribute('data-player');

      player.toString() === 'player'
        ? Scoreboard.switchScoreboards(playerOne, computer)
        : Scoreboard.switchScoreboards(computer, playerOne);
    });
  });

  diceCtrl.rollHand();
  diceCtrl.getScore();
});