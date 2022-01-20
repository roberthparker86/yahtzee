/*jshint esversion: 6 */
const scoreCalc = {
  filterNumbers: (targetNum) => { 
    return currentDiceRolled.filter(num => ( num === targetNum && num ));
  },

  getScoreSum: (arr) => {
    return arr.length > 0 ?
      arr.reduce((total, currentNum) => total + currentNum):
      0;
  },

  sortAndSet: (arr) => {
    // sort from low to high number
    let sorted = arr.map(x => x);
    sorted.sort();

    // create a set to return
    tempSet = new Set(sorted);
    let sortedSet = [];
    for (let item of tempSet) sortedSet.push(item);

    return sortedSet;
  },

  countNumberInArray: (arr, targetIndex) => {
    let firstNumberCountArray = arr.filter((num, index, arr) => {
      return num === arr[targetIndex];
    });
    
    return firstNumberCountArray.length;
  },

  /// VALIDATION CHECKS FOR VARIOUS SCORE CATEGORIES ///
  checkYahtzee: function(arr) {
    let arrayToCheck = this.sortAndSet(arr);
    return arrayToCheck.length === 1;
  },

  checkThreeKind: function(arr) {
    let setArray = sortAndSet(arr);
    return setArray.length < 4 ?
      countNumberInArray(arr, 0) >= 3 ? 
        true : 
        countNumberInArray(arr, 1) >= 3 ? 
          true : 
            countNumberInArray(arr, 2) >= 3 ? 
              true : false 
      : false;
  },

  checkFourKind: function(arr) {
    return this.countNumberInArray(arr, 0) > 3 ? 
      true :
      countNumberInArray(arr, 0) === 1 && countNumberInArray(arr, 1) > 3;
  },

  checkFullHouse: function(arr) {
    let setArray = this.sortAndSet(arr);  
    return setArray.length === 2 ?
      countNumberInArray(arr, 0) === 3 || countNumberInArray(arr, 0) === 2 :
      false;
  },

  checkSmallStraight: function(arr) {
    let arrayToCheck = this.sortAndSet(arr);
    let count = 0;
    arrayToCheck.forEach((num, index, arr2) => {
      return count < 3 ? 
        (index < arr2.length - 1) ?
          (num + 1 === arr2[index + 1]) ?
            count++ : count = 0	:
          null :
        null;
    });
    return count >= 3;
  },

  checkLargeStraight: function(arr) {
    let arrayToCheck = this.sortAndSet(arr);
    let count = 0;
    arrayToCheck.forEach((num, index, arr2) => {
      return (index < arr2.length - 1)
          && (num + 1 === arr2[index + 1]) && count++;
    });
    return count >= 4;
  },

  /// SCORE FOR 1 - 6 ///
  "p-btn-1": function() {
      let filterdArray = this.filterNumbers(1);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  "p-btn-2": function() {
    let filterdArray = this.filterNumbers(2);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  "p-btn-3": function() {
      let filterdArray = this.filterNumbers(3);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  "p-btn-4": function() {
    let filterdArray = this.filterNumbers(4);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  "p-btn-5": function() {
    let filterdArray = this.filterNumbers(5);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  "p-btn-6": function() {
    let filterdArray = this.filterNumbers(6);
    return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
  },

  /// SCORE FOR OTHER SLOTS ///
  "p-btn-yahtzee": function() {
    return this.checkYahtzee(currentDiceRolled) ? 50 : 0;
  },

  "p-btn-3x": function() {
    return this.checkThreeKind(currentDiceRolled) ? 
      ( currentDiceRolled.reduce((a,b) => a + b) ) : 0;
  },

  "p-btn-4x": function() {
    return this.checkFourKind(currentDiceRolled) ? 
      ( currentDiceRolled.reduce((a,b) => a + b) ) : 0;
  },

  "p-btn-fh": function() {
    return this.checkFullHouse(currentDiceRolled) ? 25 : 0;
  },

  "p-btn-ss": function() {
    return this.checkSmallStraight(currentDiceRolled) ? 30 : 0;
  },

  "p-btn-ls": function() {
    return this.checkLargeStraight(currentDiceRolled) ? 40 : 0;
  },

  "p-btn-any": function() {
    return currentDiceRolled.reduce( (a,b) => a + b );
  },
  
};
