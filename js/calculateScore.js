/*jshint esversion: 6 */
const calcScore = (id) => {
  let currentScore = 0; // Score value to be returned

  // Sort array in ascending order
  curRoll.sort((a,b) => a-b);

  let tempSet = new Set(curRoll);

  //  Switch function will execute based on the Btn ID that is passed
  switch (id) {
    // 1's btn
    case "p-btn-1":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 1 ? currentScore += 1: null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  2's Btn
    case "p-btn-2":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 2 ? currentScore += 2: null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  3's Btn
    case "p-btn-3":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 3 ? currentScore += 3 : null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  4's Btn
    case "p-btn-4":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 4 ? currentScore += 4 : null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  5's Btn
    case "p-btn-5":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 5 ? currentScore += 5: null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  6's Btn
    case "p-btn-6":
      for (let i = 0; i < curRoll.length; i++) {
        curRoll[i] === 6 ? currentScore += 6: null;
      }

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  Yahtzee Btn
    case "p-btn-yahtzee":
      checkYahtzee(curRoll) === true ? currentScore = 50 : null;

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

    //  3 of a kind Btn
    case "p-btn-3x":
      checkThreeKind(curRoll) === true 
      ? currentScore = curRoll.reduce( (a,b) => a + b )
      : null;

      plyrScore.push(currentScore); // For adding total scores
      return currentScore; // Return score for current turn
      break;

      //  4 of a kind Btn
      case "p-btn-4x":
        checkFourKind(curRoll) === true
        ? currentScore = curRoll.reduce( (a,b) => a + b )
        : null;

        plyrScore.push(currentScore); // For adding total scores
        return currentScore; // Return score for current turn
        break;

      // Full House Btn
      case "p-btn-fh":
        checkFullHouse(curRoll) === true ? currentScore = 25 : null;

        plyrScore.push(currentScore); // For adding total scores
        return currentScore; // Return score for current turn
        break;

      // Small Straight Btn
      case "p-btn-ss":
        checkSmallStraight(curRoll) === true ? currentScore = 30 : null;

        plyrScore.push(currentScore); // For adding total scores
        return currentScore; // Return score for current turn
        break;

      // Large Straight Btn
      case "p-btn-ls":
        checkLargeStraight(curRoll) === true ? currentScore = 40 : null;

        plyrScore.push(currentScore); // For adding total scores
        return currentScore; // Return score for current turn
        break;

      // Any Combo Btn
      case "p-btn-any":
        currentScore = curRoll.reduce( (a,b) => a + b )

        plyrScore.push(currentScore); // For adding total scores
        return currentScore; // Return score for current turn
        break;

      default:
        alert("Error");
  }  
}
