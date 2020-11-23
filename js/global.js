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
    curRoll = [], // Array to hold generated num from diceRoll()
    shuffleCount = 0, // Allow counting to set limit for shuffle()
    rollCount = 0,// Amount of dice rolls in current turn
    plyrTurn = 0,
    plyrScore = [0], // Array for holding player score to sum up every round
    compScoreArr = [],
    playerTotal = 0; // Total score updated every turn for end of game compare

// +++ Dice roll functions +++
function randNum() {
  // Generates random number
	let number = Math.ceil(Math.random() * 6);
  return number;
}

function diceRoll() {
  // Uses randNum() to fill curRoll with 5 integers 1-6
	for (let i = 1; i < 6; i++) {
    if ( icon[i].hasClass("hold") ) {
    	icon[i].removeClass("hold");
      curRoll.push(returnVal(icon[i].attr("class")));
      icon[i].addClass("hold");
    } else {
      curRoll.push(randNum());
    }
  }
}

function shuffle(num) {
  // Adds roll animation to dice. Takes 250 ms to execute
  if (shuffleCount < 5) {
  	setTimeout(function(){
    	icon[num].removeClass().addClass(diceClass[randNum()]);
    	shuffleCount++;
    	shuffle(num);
    }, 50);
  } else {
  	icon[num].removeClass().addClass(diceClass[curRoll[num - 1]]);
    shuffleCount = 0;
  }
}

function btnFlash() {
  rollBtn.toggleClass("lite");
  setTimeout(function(){ rollBtn.toggleClass("lite"); }, 100);
  setTimeout(function(){ rollBtn.toggleClass("lite"); }, 200);
  setTimeout(function(){ rollBtn.toggleClass("lite"); }, 300);
  setTimeout(function(){ rollBtn.toggleClass("lite"); }, 400);
  setTimeout(function(){ rollBtn.toggleClass("lite"); }, 500);
}

function returnVal(string) {
  // Takes class as string and returns corresponding integer
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

// +++ Specific score checks +++
function checkYahtzee(array) {
  // Takes curRoll - returns boolean if yahtzee or not
  let tempSet = new Set(curRoll);
  if (tempSet.size == 1) {
    return true;
  }
  return false;
}

function checkSmallStraight(array) {
  // Takes array and returns true if straight. Assumes array has been sorted.
  let count = 0,
  		tempSet = new Set(array);
  if (tempSet.size === 4) {
  	for (let i = 0; i < array.length - 1; i++) {
    	if (array[i] + 1 === array[i + 1]) {
      	count++;
      }
    }
    if (count === 3) {
    	return true;
    }
  }
  if (tempSet.size === 5) {
  	if (array[0] + 2 === array[1] || array[3] + 2 === array[4]) {
    	return true;
    }
  }
  return false;
}

function checkLargeStraight(array) {
  let count = 0,
      tempSet = new Set(array);
  if (curRoll.reduce(function(a,b){ return a + b;}) == 20 && tempSet.size == 5 || curRoll.reduce(function(a,b){ return a + b;}) == 15 && tempSet.size == 5) {
    return true;
  }
  return false;
}

function checkFullHouse(array) {
  // Takes curRoll - return boolean for full house
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
  // Takes curRoll- return boolean for 4 of a kind
  for (let i = 0; i < array.length; i++) {
    let count = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        count++;
      }
    }
    if (count >= 4) {
      return true;
    }
  }
  return false;
}

function checkThreeKind(array) {
  // Takes curRoll - return boolean for 3 of a kind
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
    curRoll.length = 0;
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
      setTimeout(btnFlash, 50);

    }
  }
}

// +++ Computer's Turn +++
function compRollDice() {
  diceRoll(); // Populate curRoll for comp turn
  for (let i = 1; i < 6; i++) { // Shuffle
      setTimeout(shuffle(i), ((i-1) * 250) );
  }
  rollCount++;
  curRoll.sort((a,b) => a-b); // Sort array in ascending order
  setTimeout(checkToRoll, 1500);
}

function checkToRoll(){
  // Checks if roll needs to be made, if not calls function to calculate score
  // and update the computer scoreboard.
  if (rollCount < 3 && checkDice() == "other") {
    diceRoll();
    rollCount++; // Add roll for this turn
    curRoll.length = 0;
    compRollDice(); // Maximum roll not reached. Call function again
  } else {
    calcCompScore(checkDice());
    setTimeout(function(){
      curRoll.length = 0; // Reset Value and Dice arrays for next turn
      plyrTurn++; // Increase Player Turn value to trigger change next round
      plyrCheck();
    }, 250);
  }
}

function checkDice() {
  // Check current line-up of dice to calculate highest possible score
  if (checkYahtzee(curRoll) == true && $("#c-yahtzee").hasClass("hold") == false ) {
    return "c-yahtzee";
  } else if (checkLargeStraight(curRoll) == true && $("#c-ls").hasClass("hold") == false ) {
    return "c-ls";
  } else if (checkSmallStraight(curRoll) == true && $("#c-ss").hasClass("hold") == false ) {
    return "c-ss";
  } else if (checkFullHouse(curRoll) == true && $("#c-fh").hasClass("hold") == false ) {
    return "c-fh";
  } else if (checkFourKind(curRoll) == true && $("#c-fourx").hasClass("hold") == false ) {
    return "c-fourx";
  } else if (checkThreeKind(curRoll) == true && $("#c-threex").hasClass("hold") == false) {
    return "c-threex";
  }  else if ($("#c-any").hasClass("hold") == false) {
      return "c-any";
  } else {
    return "other";
  }
}

function scoreZero(array) {
  // Allows computer to choose a "throwaway" score if no good options available
  // use curRoll
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
  let compScore = curRoll.reduce(function(a,b){ return a + b;} ),
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
      if (mode(curRoll) === 6 && $("#c-six").hasClass("hold") == false) {
        $("#c-six").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-six").addClass("hold");
      } else if (mode(curRoll) === 5 && $("#c-five").hasClass("hold") == false) {
        $("#c-five").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-five").addClass("hold");
      } else if (mode(curRoll) === 4 && $("#c-four").hasClass("hold") == false) {
        $("#c-four").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-four").addClass("hold");
      } else if (mode(curRoll) === 3 && $("#c-three").hasClass("hold") == false) {
        $("#c-three").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-three").addClass("hold");
      } else if (mode(curRoll) === 2 && $("#c-two").hasClass("hold") == false) {
        $("#c-two").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-two").addClass("hold");
      } else if (mode(curRoll) === 1 && $("#c-one").hasClass("hold") == false) {
        $("#c-one").text(otherScore(curRoll));
        compScoreArr.push(otherScore(curRoll));
        $("#c-one").addClass("hold");
      } else {
        scoreZero(curRoll);
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
  curRoll.length = 0;
  rollCount = 0;
  shuffleCount = 0;
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
