/*jshint esversion: 6 */
const calcScore = (id) => { 
  let currentRollScore = 0; // Score value to be returned

  // Sort array in ascending order
  currentDiceRolled.sort((a,b) => a-b);

  let tempSet = new Set(currentDiceRolled);

  //  Switch function will execute based on the Btn ID that is passed
  switch (id) {
    // 1's btn
    case "p-btn-1":
      let arrayOfOnes = currentDiceRolled.filter(num => ( num === 1 && num ));

      currentRollScore = arrayOfOnes.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores

      return currentRollScore; // Return score for current turn
      break;

    //  2's Btn
    case "p-btn-2":
      let arrayOfTwos = currentDiceRolled.filter(num => ( num === 2 && num ));

      currentRollScore = arrayOfTwos.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores

      return currentRollScore; // Return score for current turn
      break;

    //  3's Btn
    case "p-btn-3":
      let arrayOfThrees = currentDiceRolled.filter(num => ( num === 3 && num ));

      currentRollScore = arrayOfThrees.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores

      return currentRollScore; // Return score for current turn
      break;

    //  4's Btn
    case "p-btn-4":
      let arrayOfFours = currentDiceRolled.filter(num => ( num === 4 && num ));

      currentRollScore = arrayOfFours.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores

      return currentRollScore; // Return score for current turn
      break;

    //  5's Btn
    case "p-btn-5":
      let arrayOfFives = currentDiceRolled.filter(num => ( num === 5 && num ));

      currentRollScore = arrayOfFives.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores

      return currentRollScore; // Return score for current turn
      break;

    //  6's Btn
    case "p-btn-6":
      let arrayOfSixes = currentDiceRolled.filter(num => ( num === 6 && num ));

      currentRollScore = arrayOfSixes.reduce((total, currentNum) => total + currentNum);
      plyrScore.push(currentRollScore); // For adding total scores
      
      return currentRollScore; // Return score for current turn
      break;

    //  Yahtzee Btn
    case "p-btn-yahtzee":
      checkYahtzee(currentDiceRolled) === true ? currentRollScore = 50 : null;

      plyrScore.push(currentRollScore); // For adding total scores
      return currentRollScore; // Return score for current turn
      break;

    //  3 of a kind Btn
    case "p-btn-3x":
      checkThreeKind(currentDiceRolled) === true 
      ? currentRollScore = currentDiceRolled.reduce( (a,b) => a + b )
      : null;

      plyrScore.push(currentRollScore); // For adding total scores
      return currentRollScore; // Return score for current turn
      break;

      //  4 of a kind Btn
      case "p-btn-4x":
        checkFourKind(currentDiceRolled) === true
        ? currentRollScore = currentDiceRolled.reduce( (a,b) => a + b )
        : null;

        plyrScore.push(currentRollScore); // For adding total scores
        return currentRollScore; // Return score for current turn
        break;

      // Full House Btn
      case "p-btn-fh":
        checkFullHouse(currentDiceRolled) === true ? currentRollScore = 25 : null;

        plyrScore.push(currentRollScore); // For adding total scores
        return currentRollScore; // Return score for current turn
        break;

      // Small Straight Btn
      case "p-btn-ss":
        checkSmallStraight(currentDiceRolled) === true ? currentRollScore = 30 : null;

        plyrScore.push(currentRollScore); // For adding total scores
        return currentRollScore; // Return score for current turn
        break;

      // Large Straight Btn
      case "p-btn-ls":
        checkLargeStraight(currentDiceRolled) === true ? currentRollScore = 40 : null;

        plyrScore.push(currentRollScore); // For adding total scores
        return currentRollScore; // Return score for current turn
        break;

      // Any Combo Btn
      case "p-btn-any":
        currentRollScore = currentDiceRolled.reduce( (a,b) => a + b )

        plyrScore.push(currentRollScore); // For adding total scores
        return currentRollScore; // Return score for current turn
        break;

      default:
        alert("Error");
  }  
}
