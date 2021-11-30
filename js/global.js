/*jshint esversion: 6 */

//TODO: BUG: Able to click score buttons before rolling at beginning of turn

//TODO: Convert computer scoring system to a method similar to player scoring

//TODO: Test further for any bugs

//* GLOBAL VALUES

const diceClass = {
      '1': "fas fa-dice-one dice", // Classes that determine dice numbers
      '2': "fas fa-dice-two dice",
      '3': "fas fa-dice-three dice",
      '4': "fas fa-dice-four dice",
      '5': "fas fa-dice-five dice",
      '6': "fas fa-dice-six dice"
      },
      icon = { // Target the various dice icons
        '1': $("#icon1"),
        '2': $("#icon2"),
        '3': $("#icon3"),
        '4': $("#icon4"),
        '5': $("#icon5")
      },
      iconArr = [icon[1], icon[2], icon[3], icon[4], icon[5]], // Holds icons for iterating
      rollBtn = $("#roll"),
      roundNum = $(".round-num");

/**
 * * CONTROLS FOR PLAYER SCORBOARD
 */

// Player Score Values Object
const playerScoreValues = {
	'p-btn-1-value': 0,
	'p-btn-2-value': 0,
	'p-btn-3-value': 0,
	'p-btn-4-value': 0,
	'p-btn-5-value': 0,
	'p-btn-6-value': 0,
	'p-btn-3x-value': 0,
	'p-btn-4x-value': 0,
	'p-btn-fh-value': 0,
	'p-btn-ss-value': 0,
	'p-btn-ls-value': 0,
	'p-btn-any-value': 0,
	'p-btn-yahtzee-value': 0,
	'total': 0
}

const populatePlayerScores = () => {
	for (const prop in playerScoreValues) {
		const valueElementToChange = $(`#${prop}`);
		valueElementToChange.text(playerScoreValues[prop]);
	};
};

/**
 ** END CONTROLS FOR PLAYER SCOREBOARD
 */


let round = 0;
let currentDiceRolled = [];

// Amount of dice rolls in current turn
let rollCount = 0;
let plyrTurn = 0;
let computerScoreArray = [];

function btnFlash(count, max) { // Roll button flashes at start of turn
  rollBtn.toggleClass("lite");
  (count <= max) && setTimeout(() => { btnFlash(count +1, max) }, 100);
}

function sortAndSet (arr) { 
	let sorted = arr.map(x => x);
  sorted.sort();
  tempSet = new Set(sorted);
  let sortedSet = [];
  for (let item of tempSet) sortedSet.push(item);
  return sortedSet;
};

const countNumberInArray = (array, specificIndex) => { // Count number in passed array at specificIndex  
	let firstNumberCountArray = array.filter((num, index, array) => {
  	return num === array[specificIndex];
  });
  
  return firstNumberCountArray.length;
};

const diceValue = {
	"fas fa-dice-one dice": 1,
  "fas fa-dice-two dice": 2,
  "fas fa-dice-three dice": 3,
  "fas fa-dice-four dice": 4,
  "fas fa-dice-five dice": 5,
  "fas fa-dice-six dice": 6
};

/// Specific score checks ///
function checkYahtzee(array) {
  let arrayToCheck = sortAndSet(array);
  return arrayToCheck.length === 1;
}

function checkSmallStraight(array) {
  let arrayToCheck = sortAndSet(array);
  let count = 0;
  arrayToCheck.forEach((num, index, arr) => {
    return count < 3
    	? (index < arr.length - 1)
        ? (num + 1 === arr[index + 1])
        	? count++
          : count = 0
        : null 
       : null;
  });
  return count >= 3;
}

function checkLargeStraight(array) {
  let arrayToCheck = sortAndSet(array);
  let count = 0;
  arrayToCheck.forEach((num, index, arr) => {
    return (index < arr.length - 1)
        && (num + 1 === arr[index + 1]) && count++;
  });
  return count >= 4;
}

function checkFullHouse(array) {
  let setArray = sortAndSet(array);
  
  return setArray.length === 2
  	? countNumberInArray(array, 0) === 3 || countNumberInArray(array, 0) === 2
    : false;
}

function checkFourKind(array) {  
  return countNumberInArray(array, 0) > 3
  	? true
    : countNumberInArray(array, 0) === 1 && countNumberInArray(array, 1) > 3;
};

function checkThreeKind(array) {
  let setArray = sortAndSet(array);
  return setArray.length < 4
  	? countNumberInArray(array, 0) >= 3 
      ? true : countNumberInArray(array, 1) >= 3
      ? true : countNumberInArray(array, 2) >= 3
      ? true : false 
    : false;
}

// +++ Check Player's Turn +++
function plyrCheck() {

  if (plyrTurn == 1) {
    
    $('.scoreboard').toggleClass('active-turn');
    $(".message").text("Computer Turn!");
    setTimeout(() => { $(".message").show(); }, 20);
    rollCount = 0;
    currentDiceRolled.length = 0;
    $("div i").removeClass("hold");
    compRollDice();

  } else if (plyrTurn > 1) {
    round++;

    if (round == 14) {
      gameReset();
    } else {

      $('.scoreboard').toggleClass('active-turn');
      roundNum.text(round);
      plyrTurn = 0;
      rollCount = 0;
      $(".message").text("Computer turn finished!");
      setTimeout(function(){ $(".message").show(); }, 20);
      setTimeout( () => {
        btnFlash(0,6);
      }, 50);

    }

  }
}

// +++ Computer's Turn +++
function compRollDice() {
  diceRoll(iconArr); // Populate currentDiceRolled for comp turn
  for (let i = 1; i < 6; i++) { // Shuffle
      setTimeout(shuffleDie(i,0,5), ((i-1) * 250) );
  }
  rollCount++;
  currentDiceRolled.sort((a,b) => a-b); // Sort array in ascending order
  setTimeout(checkToRoll, 1500);
}

function checkToRoll(){
  // Checks if roll needs to be made, if not calls function to calculate score
  // and update the computer scoreboard.
  if (rollCount < 3 && checkComputerDiceHand(currentDiceRolled) == "other") {
    diceRoll(iconArr);
    rollCount++; // Add roll for this turn
    currentDiceRolled.length = 0;
    compRollDice(); // Maximum roll not reached. Call function again
  } else {
    calcCompScore(checkComputerDiceHand(currentDiceRolled));
    setTimeout(function(){
      currentDiceRolled.length = 0; // Reset Value and Dice arrays for next turn
      plyrTurn++; // Increase Player Turn value to trigger change next round
      plyrCheck();
    }, 250);
  }
}

function checkComputerDiceHand(arr) {
  // Check current line-up of dice to calculate highest possible score
  return (
  	checkYahtzee(arr) && !$("#c-yahtzee").hasClass("hold")
  	?	"c-yahtzee"
    : checkLargeStraight(arr) && !$("#c-ls").hasClass("hold")
    ? "c-ls"
    : checkSmallStraight(arr) && !$("#c-ss").hasClass("hold")
    ? "c-ss"
    : checkFullHouse(arr) && !$("#c-fh").hasClass("hold")
    ? "c-fh"
    : checkFourKind(arr) && !$("#c-fourx").hasClass("hold")
    ? "c-fourx"
    : checkThreeKind(arr) && !$("#c-threex").hasClass("hold")
    ? "c-threex"
    : !$("#c-any").hasClass("hold")
    ?	"c-any"
    : "other"
    );
}

const throwAwayScore = (array) => {
  // Allows computer to choose a 'throwaway' score if no good options available
  const getArraySum = (array, num) => {
    let temporarySum = 0;
    array.forEach((item) => {
      item === num ? temporarySum += num : null;
    });

    return temporarySum;
  };

  !$('#c-one').hasClass('hold')
    ? ($("#c-one").text(getArraySum(array, 1)), $("#c-one").addClass("hold"))
    : !$('#c-two').hasClass('hold')
    ? ($("#c-two").text(getArraySum(array, 2)), $("#c-two").addClass("hold"))
    : !$('#c-three').hasClass('hold')
    ? ($("#c-three").text(getArraySum(array, 3)), $("#c-three").addClass("hold"))
    : !$('#c-four').hasClass('hold')
    ? ($("#c-four").text(getArraySum(array, 4)), $("#c-four").addClass("hold"))
    : !$('#c-five').hasClass('hold')
    ? ($("#c-five").text(getArraySum(array, 5)), $("#c-five").addClass("hold"))
    : !$('#c-six').hasClass('hold')
    ? ($("#c-six").text(getArraySum(array, 6)), $("#c-six").addClass("hold"))
    : !$('#c-threex').hasClass('hold')
    ? ($("#c-threex").text(0), $("#c-threex").addClass("hold"))
    : !$('#c-fourx').hasClass('hold')
    ? ($("#c-fourx").text(0), $("#c-fourx").addClass("hold"))
    : !$('#c-fh').hasClass('hold')
    ? ($("#c-fh").text(0), $("#c-fh").addClass("hold"))
    : !$('#c-ss').hasClass('hold')
    ? ($("#c-ss").text(0), $("#c-ss").addClass("hold"))
    : !$('#c-lg').hasClass('hold')
    ? ($("#c-lg").text(0), $("#c-lg").addClass("hold"))
    : !$('#c-yahtzee').hasClass('hold')
    ? ($("#c-yahtzee").text(0), $("#c-yahtzee").addClass("hold"))
    : null;
};

function calcCompScore(string) {
  let compScore = currentDiceRolled.reduce(function(a,b){ return a + b;} );
  let compTotal = 0;

  const updateSelectScore = (num, string) => {
    $(`#${string}`).text(num);
    computerScoreArray.push(num);
    $(`#${string}`).addClass("hold");
  };

  const handleOther = () => {
    mode(currentDiceRolled) === 6 && !$("#c-six").hasClass("hold") 
      ? updateSelectScore(otherScore(currentDiceRolled), "c-six")
      : mode(currentDiceRolled) === 5 && !$("#c-five").hasClass("hold")
      ? updateSelectScore(otherScore(currentDiceRolled), "c-five")
      : mode(currentDiceRolled) === 4 && !$("#c-four").hasClass("hold")
      ? updateSelectScore(otherScore(currentDiceRolled), "c-four")
      : mode(currentDiceRolled) === 3 && !$("#c-three").hasClass("hold")
      ? updateSelectScore(otherScore(currentDiceRolled), "c-three")
      : mode(currentDiceRolled) === 2 && !$("#c-two").hasClass("hold")
      ? updateSelectScore(otherScore(currentDiceRolled), "c-two")
      : mode(currentDiceRolled) === 1 && !$("#c-one").hasClass("hold")
      ? updateSelectScore(otherScore(currentDiceRolled), "c-one")
      : throwAwayScore(currentDiceRolled);
  };

  const computerScoreController = {
    "c-yahtzee": () => { updateSelectScore(50, string) },
    "c-ls": () => { updateSelectScore(40, string) },
    "c-ss": () => { updateSelectScore(30, string) },
    "c-fh": () => { updateSelectScore(25, string) },
    "c-fourx": () => { updateSelectScore(compScore, string) },
    "c-threex": () => { updateSelectScore(compScore, string) },
    "c-any": () => { updateSelectScore(compScore, string) },
    "other": () => { handleOther() }
  };

  computerScoreController[string](string);
  compTotal = computerScoreArray.reduce(function(a,b) { return a + b; });
  $("#comp-total").text(compTotal);
  $("#icon1, #icon2, #icon3, #icon4, #icon5").removeClass("hold");
}

function mode(array) {
  // finds the mode of array and returns integer. If all occurences equal,
  // returns the lowest value, assuming array is sorted in ascending order
  let modeMap = {};
  let curMode = array[0];
  let maxCount = 1;

  if (array.length === 0) {
  	return null;
  }
  for (let i = 0; i < array.length; i++) {
  	let elmnt = array[i];
    if (modeMap[elmnt] == null) {
    	modeMap[elmnt] = 1;
    } else {
    	modeMap[elmnt]++;
    }
    if (modeMap[elmnt] > maxCount) {
    	curMode = elmnt;
      maxCount = modeMap[elmnt];
    }
  }
  return curMode;
}

function otherScore(array) {
  let arrMode = mode(array);
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === arrMode) {
      sum += arrMode;
    }
  }
  return sum;
}

// +++ Check if Game Over +++
function gameReset() {
  // Display GAME OVER message
  if ( playerScoreValues['total'] > parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Player 1 Wins!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
  if ( playerScoreValues['total'] < parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Computer Wins!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
  if ( playerScoreValues['total'] === parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Tie!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }

	// Reset values for scorekeeping and round count
  round = 0; 
  currentDiceRolled.length = 0;
  rollCount = 0;
  plyrTurn = 0;
  computerScoreArray.length = 0;
	
	for (const prop in playerScoreValues) {
		playerScoreValues[prop] = 0;
	};

	// Reset the HTML elements to 0
  $("table button").removeClass("hold"); // Remove .hold classes on buttons
  $(".hold").removeClass("hold"); // Remove all other .hold classes

  // Reset Player scoreboard
	populatePlayerScores();
  $(".comp-score-val").text("0");// Write reset comp scoreboard here

	
}
