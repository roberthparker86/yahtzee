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
    this.smallStraight = {
      id: `${name}-btn-sm-straight`,
      btnText: 'Small Straight',
      value: 0
    };
    this.largeStraight = {
      id: `${name}-btn-lg-straight`,
      btnText: 'Large Straight',
      value: 0
    };
    this.fullHouse = {
      id: `${name}-btn-full-house`,
      btnText: 'Full House',
      value: 0
    };
    this.any = { id: `${name}-btn-any`, btnText: 'Any Category', value: 0 };
    this.yahtzee = { id: `${name}-btn-yahtzee`, btnText: 'Yahtzee', value: 0 };
    this.total = { id: `${name}-total`, btnText: 'Total', value: 0 };
  }

  updateScore(category) {
    console.log(this[category]);
  }

  generateScoreboardHeader() {
    const imgSrceFile = this.name === 'player' ? 'icon_Player-white' : 'icon_Computer-white';
    const newDiv = document.createElement('div');
    newDiv.classList.add('scoreboard__header');

    const innerHTML = `<img src="img/${imgSrceFile}.svg" alt="Player icon" class="icons">
      <h2 class="text-red">${this.name}</h2>`;

    newDiv.innerHTML = innerHTML;
    return newDiv;
  }

  generateBtn(category) {
    const newBtnElem = document.createElement('div');
    newBtnElem.classList.add('scoreboard__btn-container');
    const btnTemplate = `<button id="${this[category].id}" class="score-btn">${this[category].btnText}</button>
      <h3 id="${this[category].id}-value">${this[category].value}</h3>`;

    newBtnElem.innerHTML = btnTemplate;
    return newBtnElem;
  }

  generateScoreboard() {
    const boardContainerSelector = document.querySelector(`#${this.name}`);

    boardContainerSelector.append(this.generateScoreboardHeader());

    let boardBtnsContainerElem = document.createElement('div');
    boardBtnsContainerElem.classList.add('scoreboard__board');
    boardContainerSelector.append(boardBtnsContainerElem);

    for (const key in this) {
      if (key.toString() !== 'name' && key.toString() !== 'total') {
        boardBtnsContainerElem.append(this.generateBtn(key.toString()));
        const newElementSelector = document.querySelector(`#${this[key].id}`);

        newElementSelector.addEventListener('click', function () {
          console.log(this);
        });
      }
    }

    let totalSection = document.createElement('div');
    totalSection.classList.add('scoreboard__total');
    totalSection.setAttribute('id', this.total.id);
    totalSection.innerHTML = `<h2>Total</h2><h2>${this.total.value}</h2>`;
    boardContainerSelector.append(totalSection);
  }
}
