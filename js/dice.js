class Dice {
  constructor() {
    this.valuesArray = [1, 1, 1, 1, 1];
    this.one = 'fa-dice-one';
    this.two = "fa-dice-two";
    this.three = "fa-dice-three";
    this.four = "fa-dice-four";
    this.five = "fa-dice-five";
    this.six = "fa-dice-six";
  }

  static getDieClassFromInt (diceObj, num) {
    let returnClass;

    switch(num) {
      case 1:
        returnClass = diceObj.one;
        break;
      case 2:
        returnClass = diceObj.two;
        break;
      case 3:
        returnClass = diceObj.three;
        break;
      case 4:
        returnClass = diceObj.four;
        break;
      case 5:
        returnClass = diceObj.five;
        break;
      default:
        returnClass = diceObj.six;
    }

    return returnClass;
  }

  static rollDie (diceObj, valueIndex) {
    const randNum = Math.ceil(Math.random() * 6),
      dieElemSelector = document.querySelectorAll('i')[valueIndex],
      newClass = Dice.getDieClassFromInt(diceObj, randNum);

    diceObj.valuesArray[valueIndex] = randNum;
    dieElemSelector.classList.replace(dieElemSelector.classList[2].toString(), newClass);
  }

  // Roll new hand
  rollHand () {
    let diceRollCounts = 0;
    const currentDiceObj = this;

    function rollAction () {
      if (diceRollCounts <= 10) {
        Dice.rollDie(currentDiceObj, 0);
        Dice.rollDie(currentDiceObj, 1);
        Dice.rollDie(currentDiceObj, 2);
        Dice.rollDie(currentDiceObj, 3);
        Dice.rollDie(currentDiceObj, 4);
        diceRollCounts++;
      } else {
        clearInterval(diceRollInterval);
      }
    }  

    const diceRollInterval = setInterval(rollAction, 100);
  }

  getScore (category) {
    console.log(category);
    return this.valuesArray.reduce((a, b) => a+b);
  } 
};