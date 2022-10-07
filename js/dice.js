class Dice {
  constructor() {
    this.valuesArray = [1, 1, 1, 1, 1];
    this.rollCount = 0;
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

    if (!dieElemSelector.classList.contains('hold')) {
      diceObj.valuesArray[valueIndex] = randNum;
      dieElemSelector.classList.replace(dieElemSelector.classList[2].toString(), newClass);
    }
      
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

  filterNumbers (targetNum) { 
    return this.valuesArray.filter(num => (num === targetNum && num));
  }

  getSortedSetArray (arr) {
    let tempSet = new Set(arr.sort());
    let sortedSet = [];
    for (let item of tempSet) sortedSet.push(item);
    return sortedSet;
  }

  /**
   * @param {Array} arr = array to count in
   * @param {Number} target = number to count 
   * @returns {Number} = number of times number appears
   */
  getTargetCount (arr, target) {
    let counter = 0;
    arr.forEach(num => num === target && counter++);
    return counter;
  }
  
  // Checks methods
  checkYahtzee (arr) {
    return this.getSortedSetArray(arr).length === 1;
  }

  checkThreeKind(arr) {
    const setArray = this.getSortedSetArray(arr);
    
    if (setArray.length < 4) {
      for (let i=0; i < setArray.length; i++) {
        return this.getTargetCount(arr, setArray[i]) >= 3 && true;
      }
    }  
    return false;
  }

  checkFourKind (arr) {
    return this.getTargetCount(arr, arr[0]) > 3 || this.getTargetCount(arr, arr[1]) > 3;
  }

  checkFullHouse (arr) {
    let setArray = this.getSortedSetArray(arr); 
    
    if (setArray.length == 2) {
      return this.getTargetCount(arr, arr[0]) === 3 || this.getTargetCount(arr, arr[0]) === 2;
    }
    return false;
  }

  // Not working?
  checkSmallStraight (arr) {
    let arrayToCheck = this.getSortedSetArray(arr);
    
    if (arrayToCheck.length >= 4) {
      let count = 0;
      for (let i=0; i < arrayToCheck.length-1; i++) {
        if (count === 3) break;
        count = (arrayToCheck[i] + 1 === arrayToCheck[i+1]) ? count+1 : count-1;
      }
      return count >= 3;
    }
    return false;
  }

  checkLargeStraight (arr) {
    let arrayToCheck = this.getSortedSetArray(arr);
    if (arrayToCheck.length === arr.length) {
      let count = 0;
      for (let i=0; i < arrayToCheck.length - 1; i++) {
        count = (arrayToCheck[i] + 1 === arrayToCheck[i+1]) ? count+1 : count-1;
      }
      return count >= 4;
    }
    return false;
  }

  getScore (category) {
    console.log({ valuesArray: this.valuesArray, sorted: this.getSortedSetArray(this.valuesArray)});

    switch (category) {
      case 'one':
        return this.filterNumbers(1).reduce((total, nextNum) => total + nextNum, 0);
      case 'two':
        return this.filterNumbers(2).reduce((total, nextNum) => total + nextNum, 0);
      case 'three':
        return this.filterNumbers(3).reduce((total, nextNum) => total + nextNum, 0);
      case 'four':
        return this.filterNumbers(4).reduce((total, nextNum) => total + nextNum, 0);
      case 'five':
        return this.filterNumbers(5).reduce((total, nextNum) => total + nextNum, 0);
      case 'six':
        return this.filterNumbers(6).reduce((total, nextNum) => total + nextNum, 0);
      case 'threeOfKind':
        return this.checkThreeKind(this.valuesArray) 
          ? this.valuesArray.reduce((total, nextNum) => total+nextNum, 0) 
          : 0;
      case 'fourOfKind':
        return this.checkFourKind(this.valuesArray)
          ? this.valuesArray.reduce((total, nextNum) => total+nextNum, 0) 
          : 0;
      case 'fullHouse':
        return this.checkFullHouse(this.valuesArray) ? 25 : 0;
      case 'smallStraight':
        return this.checkSmallStraight(this.valuesArray) ? 30 : 0;
      case 'largeStraight':
        return this.checkLargeStraight(this.valuesArray) ? 40 : 0;
      case 'yahtzee':
        return this.checkYahtzee(this.valuesArray) ? 50 : 0;
      default:
        return this.valuesArray.reduce((total, nextNum) => total+nextNum, 0);
    }
  }

  checkCanRoll() {
    return this.rollCount <= 3;
  }
};