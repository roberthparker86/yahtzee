class Scoreboard {
  /**
   * @param {String} name = id name for determining player/computer object 
   * @param {Object} diceCtrl = Dice control object to gain access to its methods
   */
  constructor(name, diceCtrl = null) {
    this.name = name;
    this.diceCtrl = diceCtrl !== null ? diceCtrl : null;
    this.one = { id: `${name}-btn-1`, btnText: '1s', value: 0 };
    this.two = { id: `${name}-btn-2`, btnText: '2s', value: 0 };
    this.three = { id: `${name}-btn-3`, btnText: '3s', value: 0 };
    this.four = { id: `${name}-btn-4`, btnText: '4s', value: 0 };
    this.five = { id: `${name}-btn-5`, btnText: '5s', value: 0 };
    this.six = { id: `${name}-btn-6`, btnText: '6s', value: 0 };
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
    this.parentContainer = document.getElementById(this.name);
  }

  /** 
   * @param {Class} hide instance of Scoreboard class
   * @param {Class} reveal instance of Scoreboard class
   * @returns {void}
   */
  static switchScoreboards (hide, reveal) {
    hide.setHidden(true);
    setTimeout(() => reveal.setHidden(false), 400);
  }

  setToDefault () {
    for (const key in this) {
      switch (key) {
        case 'name':
          break;
        case 'parentContainer':
          break;
        case 'diceCtrl':
          break;
        default:
          const btn = document.getElementById(this[key].id),
            btnValue = document.getElementById(`${this[key].id}-value`);

          btn.setAttribute('disabled', true);
          this[key].value = 0;
          btnValue.innerHTML = this[key].value;                   
      }
    }
  }

  checkIsBtnDisabled (btnCat) {
    const btnSelector = document.getElementById(this[btnCat].id);
    return btnSelector.disabled;
  }

  /** 
   * @param {String} id - id of score button clicked
   * @returns {String} - key for accessing relevant Scoreboard property
   */
  getKey(id) {
    for (const key in this) {
      if (this[key].id === id) {
        return key;
      }
    }
    return null;
  }

  /**
   * @param {String} category = selector for score category property
   * @param {Number} score = Value to upate specified category to in the DOM 
   */
  updateScore(category, score) {
    this[category].value = score;
    const updateElem = document.querySelector(`#${this[category].id}-value`),
      clickedBtn = document.querySelector(`#${this[category].id}`);
    updateElem.innerHTML = score;
    clickedBtn.setAttribute('disabled', true);
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

  /**
   * @param {String} category = Selector for category property 
   * @returns {HTMLElement} = adds element to DOM and returns the selector variable
   */
  generateBtn(category) {
    const newBtnElem = document.createElement('div');
    newBtnElem.classList.add('scoreboard__btn-container');

    const btnTemplate = `<button id="${this[category].id}" data-score-key="${category}" data-player="${this.name}" class="score-btn">${this[category].btnText}</button>
      <h3 id="${this[category].id}-value">${this[category].value}</h3>`;

    newBtnElem.innerHTML = btnTemplate;
    return newBtnElem;
  }

  // Initialize Scoreboard. Generate and append HTML
  generateScoreboard() {
    this.parentContainer.append(this.generateScoreboardHeader());

    let boardBtnsContainerElem = document.createElement('div');
    boardBtnsContainerElem.classList.add('scoreboard__board');
    this.parentContainer.append(boardBtnsContainerElem);

    for (const key in this) {
      if (
        key.toString() !== 'name' && key.toString() !== 'total' &&
        key.toString() !== 'parentContainer' && key.toString() !== 'diceCtrl'
      ) {
        boardBtnsContainerElem.append(this.generateBtn(key.toString()));
      }
    }

    let totalSection = document.createElement('div');
    totalSection.classList.add('scoreboard__total');
    totalSection.setAttribute('id', this.total.id);
    totalSection.innerHTML = `<h2>Total</h2><h2>${this.total.value}</h2>`;
    this.parentContainer.append(totalSection);
    if (this.name === 'computer') {
      this.parentContainer.classList.add('hidden', 'd-none');
    };
  }

  /**
   * @param {Boolean} bool = used to determine whether hiding or revealing scoreboard
   * @return {void}
   */
  setHidden(bool) {
    if (bool) {
      const classes = this.parentContainer.classList;
      classes.add('hidden');
      setTimeout(() => classes.add('d-none'), 350);
    } else {
      const classes = this.parentContainer.classList;
      classes.remove('d-none');
      setTimeout(() => classes.remove('hidden'), 50);
    }
  }
}
