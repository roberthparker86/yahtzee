class GameState {
  constructor() {
    this.players = [];
    this.playerTurn = 0;
    this.round = 1;
    this.currentPlayer = null;
  }
  
  setToDefault () {
    this.players = [];
    this.playerTurn = 0;
    this.round = 1;
    this.currentPlayer = null;
  }

  addPlayer (Scoreboard) {
    this.players.push(Scoreboard);
    if (this.round === 0 && this.players.length === 1) {
      this.currentPlayer = this.players[0];
    }
  }

  changeTurn () {
    if (this.playerTurn === 1) {
      this.round++;
      this.playerTurn = 0;
    } else {
      this.playerTurn = 1;
    }
    this.currentPlayer = this.players[this.playerTurn];
  }
}