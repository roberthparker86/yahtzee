class Scoreboard {
  constructor(name) {
    this.name = name;
    this.one = { id: `${name}-btn-1`, btnText: '1s', value: 0 };
    this.two = { id: `${name}-btn-2`, btnText: '2s', value: 0 };
    this.three = { id: `${name}-btn-3`, btnText: '3s', value: 0 };
    this.four = { id: `${name}-btn-4`, btnText: '4s', value: 0 };
    this.five = { id: `${name}-btn-5`, btnText: '5s', value: 0 };
    this.six = { id: `${name}-btn-6`, btnText: '6s', value: 0 };
    this.twoPair = { id: `${name}-btn-2-pair`, btnText: '2 Pair', value: 0 };
    this.threeOfKind = { id: `${name}-btn-3x`, btnText: '3x', value: 0 };
    this.fourOfKind = { id: `${name}-btn-4x`, btnText: '4x', value: 0 };
    this.smallStraight = { id: `${name}-btn-sm-straight`, btnText: 'Small Straight', value: 0 };
    this.largeStraight = { id: `${name}-btn-lg-straight`, btnText: 'Large Straight', value: 0 };
    this.fullHouse = { id: `${name}-btn-full-house`, btnText: 'Full House', value: 0 };
    this.any = { id: `${name}-btn-any`, btnText: 'Any Category', value: 0 };
    this.yahtzee = { id: `${name}-btn-yahtzee`, btnText: 'Yahtzee', value: 0 };
    this.total = { id: `${name}-total`, btnText: 'Total', value: 0 };
  }

  generateBtn(category) {
    const newBtnElem = document.createElement('div');
    newBtnElem.classList.add('scoreboard__btn-container'); 
    const btnTemplate = 
      `<button id="${this[category].id}}" class="score-btn">${this[category].btnText}</button>
      <h3 id="${this[category].id}-value">${this[category].value}</h3>`;

    newBtnElem.innerHTML = btnTemplate;
    return newBtnElem;
  };

  generateScoreboard() {
    const boardContainerSelector = document.querySelector(`#${this.name}`);

    let boardBtnsContainerElem = document.createElement('div');    
    boardBtnsContainerElem.classList.add('scoreboard__board');
    boardContainerSelector.append(boardBtnsContainerElem);
    

    for (const key in this) {
      if (key.toString() !== 'name' && key.toString() !== 'total') {
        boardBtnsContainerElem.append(this.generateBtn(key.toString()));
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const playerOne = new Scoreboard('player');

  playerOne.generateScoreboard();
});