/*jshint esversion: 6 */
// +++ Global values +++
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

let round = 0,
    currentDiceRolled = [],
    rollCount = 0,// Amount of dice rolls in current turn
    plyrTurn = 0,
    plyrScore = [0], // Array for holding player score to sum up every round
    compScoreArr = [],
    playerTotal = 0; // Total score updated every turn for end of game compare

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

function returnVal(string) { // Take CSS class and return integer
  switch (string) {
    case diceClass[1]:
      return 1;
      break;

    case diceClass[2]:
      return 2;
      break;

    case diceClass[3]:
      return 3;
      break;

    case diceClass[4]:
      return 4;
      break;

    case diceClass[5]:
      return 5;
      break;

    case diceClass[6]:
      return 6;
      break;

    default:
      alert("Error");
  }
}

///// Specific score checks /////
function checkYahtzee(array) {
  let arrayToCheck = sortAndSet(array);
  return arrayToCheck.length === 1;
}

function checkSmallStraight(array) {
  let arrayToCheck = sortAndSet(array);
  let count = 0;
  arrayToCheck.forEach((num, index, arr) => {
    return (index < arr.length - 1)
        && (num + 1 === arr[index + 1]) && count++;
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
  // Takes currentDiceRolled - return boolean for full house
  let tempSet = new Set(array),
      count = 0;
  for (let i = 1; i < array.length - 2; i++) {
    if (array[0] == array[i]) {
      count++;
    }
  }
  if (tempSet.size == 2 && count == 1 || tempSet.size == 2 && count == 2) {
    return true;
  }
  return false;
}

function checkFourKind(array) {  
  return countNumberInArray(array, 0) > 3
  	? true
    : countNumberInArray(array, 0) === 1 && countNumberInArray(array, 1) > 3;
};

function checkThreeKind(array) {
  // Takes currentDiceRolled - return boolean for 3 of a kind
  for (let i = 0; i < array.length; i++) {
    let count = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        count++;
      }
    }
    if (count >= 3) {
      return true;
    }
  }
  return false;
}

// +++ Check Player's Turn +++
function plyrCheck() {
  if (plyrTurn == 1) {
    $(".message").text("Computer Turn!");
    setTimeout(function(){ $(".message").show(); }, 20);
    rollCount = 0;
    currentDiceRolled.length = 0;
    $("div i").removeClass("hold");
    compRollDice();
  } else if (plyrTurn > 1) {
    round++;
    if (round == 14) {
      gameReset();
    } else {
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
  if (rollCount < 3 && checkDice() == "other") {
    diceRoll(iconArr);
    rollCount++; // Add roll for this turn
    currentDiceRolled.length = 0;
    compRollDice(); // Maximum roll not reached. Call function again
  } else {
    calcCompScore(checkDice());
    setTimeout(function(){
      currentDiceRolled.length = 0; // Reset Value and Dice arrays for next turn
      plyrTurn++; // Increase Player Turn value to trigger change next round
      plyrCheck();
    }, 250);
  }
}

function checkDice() {
  // Check current line-up of dice to calculate highest possible score
  if (checkYahtzee(currentDiceRolled) == true && $("#c-yahtzee").hasClass("hold") == false ) {
    return "c-yahtzee";
  } else if (checkLargeStraight(currentDiceRolled) == true && $("#c-ls").hasClass("hold") == false ) {
    return "c-ls";
  } else if (checkSmallStraight(currentDiceRolled) == true && $("#c-ss").hasClass("hold") == false ) {
    return "c-ss";
  } else if (checkFullHouse(currentDiceRolled) == true && $("#c-fh").hasClass("hold") == false ) {
    return "c-fh";
  } else if (checkFourKind(currentDiceRolled) == true && $("#c-fourx").hasClass("hold") == false ) {
    return "c-fourx";
  } else if (checkThreeKind(currentDiceRolled) == true && $("#c-threex").hasClass("hold") == false) {
    return "c-threex";
  }  else if ($("#c-any").hasClass("hold") == false) {
      return "c-any";
  } else {
    return "other";
  }
}

function scoreZero(array) {
  // Allows computer to choose a "throwaway" score if no good options available
  // use currentDiceRolled
  let tempSum = 0;
  if ($("#c-one").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 1) {
        tempSum += 1;
      }
    }
    $("#c-one").text(tempSum);
    $("#c-one").addClass("hold");
  } else if ($("#c-two").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 2) {
        tempSum += 2;
      }
    }
    $("#c-two").text(tempSum);
    $("#c-two").addClass("hold");
  } else if ($("#c-three").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 3) {
        tempSum += 3;
      }
    }
    $("#c-three").text(tempSum);
    $("#c-three").addClass("hold");
  } else if ($("#c-four").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 4) {
        tempSum += 4;
      }
    }
    $("#c-four").text(tempSum);
    $("#c-four").addClass("hold");
  } else if ($("#c-five").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 5) {
        tempSum += 5;
      }
    }
    $("#c-five").text(tempSum);
    $("#c-five").addClass("hold");
  } else if ($("#c-six").hasClass("hold") === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 6) {
        tempSum += 6;
      }
    }
    $("#c-six").text(tempSum);
    $("#c-six").addClass("hold");
  } else if ($("#c-threex").hasClass("hold") === false) {
    $("#c-threex").text(0);
    $("#c-threex").addClass("hold");
  } else if ($("#c-fourx").hasClass("hold") === false) {
    $("#c-fourx").text(0);
    $("#c-fourx").addClass("hold");
  } else if ($("#c-fh").hasClass("hold") === false) {
    $("#c-fh").text(0);
    $("#c-fh").addClass("hold");
  } else if ($("#c-ss").hasClass("hold") === false) {
    $("#c-ss").text(0);
    $("#c-ss").addClass("hold");
  } else if ($("#c-lg").hasClass("hold") === false) {
    $("#c-lg").text(0);
    $("#c-lg").addClass("hold");
  } else if ($("#c-yahtzee").hasClass("hold") === false) {
    $("#c-yahtzee").text(0);
    $("#c-yahtzee").addClass("hold");
  } else {
    console.log("ERROR");
  }
}

function calcCompScore(string) {
  let compScore = currentDiceRolled.reduce(function(a,b){ return a + b;} ),
      compTotal = 0;
  switch (string) {
    case "c-yahtzee":
      $("#" + string).text(50);
      compScoreArr.push(50);
      $("#" + string).addClass("hold");
      break;

    case "c-ls":
      $("#" + string).text(40);
      compScoreArr.push(40);
      $("#" + string).addClass("hold");
      break;

    case "c-ss":
      $("#" + string).text(30);
      compScoreArr.push(30);
      $("#" + string).addClass("hold");
      break;

    case "c-fh":
      $("#" + string).text(25);
      compScoreArr.push(25);
      $("#" + string).addClass("hold");
      break;

    case "c-fourx":
      $("#" + string).text(compScore);
      compScoreArr.push(compScore);
      $("#" + string).addClass("hold");
      break;

    case "c-threex":
      $("#" + string).text(compScore);
      compScoreArr.push(compScore);
      $("#" + string).addClass("hold");
      break;

    case "c-any":
      $("#" + string).text(compScore);
      compScoreArr.push(compScore);
      $("#" + string).addClass("hold");
      break;

    case "other":
      if (mode(currentDiceRolled) === 6 && $("#c-six").hasClass("hold") == false) {
        $("#c-six").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-six").addClass("hold");
      } else if (mode(currentDiceRolled) === 5 && $("#c-five").hasClass("hold") == false) {
        $("#c-five").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-five").addClass("hold");
      } else if (mode(currentDiceRolled) === 4 && $("#c-four").hasClass("hold") == false) {
        $("#c-four").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-four").addClass("hold");
      } else if (mode(currentDiceRolled) === 3 && $("#c-three").hasClass("hold") == false) {
        $("#c-three").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-three").addClass("hold");
      } else if (mode(currentDiceRolled) === 2 && $("#c-two").hasClass("hold") == false) {
        $("#c-two").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-two").addClass("hold");
      } else if (mode(currentDiceRolled) === 1 && $("#c-one").hasClass("hold") == false) {
        $("#c-one").text(otherScore(currentDiceRolled));
        compScoreArr.push(otherScore(currentDiceRolled));
        $("#c-one").addClass("hold");
      } else {
        scoreZero(currentDiceRolled);
      }
      break;

    default:
      console.log("DEFAULT ERROR");
  }
  compTotal = compScoreArr.reduce(function(a,b) { return a + b; });
  $("#comp-total").text(compTotal);
  $("#icon1, #icon2, #icon3, #icon4, #icon5").removeClass("hold");
}

function mode(array) {
  // finds the mode of array and returns integer. If all occurences equal,
  // returns the lowest value, assuming array is sorted in ascending order
  let modeMap = {},
      curMode = array[0],
      maxCount = 1;

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
  let arrMode = mode(array),
      sum = 0;
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
  if (parseInt($("#total").text(), 10) > parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Player 1 Wins!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
  if (parseInt($("#total").text(), 10) < parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Computer Wins!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
  if (parseInt($("#total").text(), 10) == parseInt($("#comp-total").text(), 10)) {
    $(".message").html("<h3>GAME OVER!</h3> <p>Tie!<br> Click to restart.</p>");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
  round = 0; // Reset values
  currentDiceRolled.length = 0;
  rollCount = 0;
  plyrTurn = 0;
  plyrScore.length = 0;
  plyrScore.push(0);
  compScoreArr.length = 0;
  playerTotal = 0;
  $("table button").removeClass("hold"); // Remove .hold classes on buttons
  $(".hold").removeClass("hold"); // Remove all other .hold classes
  $(".score-val, .score-val-b").text("0"); // Reset Player scoreboard
  $(".comp-score-val").text("0");// Write reset comp scoreboard here
}
