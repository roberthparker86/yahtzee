/*jshint esversion: 6 */
// Dice roll functions
const randNum = () => Math.ceil(Math.random() * 6); // Generates random number

const diceRoll = (arr) => { // Rolls new hand of dice. Ignore dice with ".hold" class
  arr.forEach( (item) => {
    item.hasClass('hold') 
    ? (item.removeClass('hold'), 
      currentDiceRolled.push( diceValue[item.attr('class')]), 
      item.addClass('hold')) 
    : currentDiceRolled.push(randNum());
  });
}

const shuffleDie = (index, count, max) => { // reassigns random dice class every 50 ms for shuffle effect
  (count <= max)
  ? (icon[index]
      .removeClass()
      .addClass(diceClass[randNum()]), 
    setTimeout( () => {
      shuffleDie(index, count + 1, max)
    }, 100)) 
  : icon[index]
      .removeClass()
      .addClass(diceClass[currentDiceRolled[index -1]]);
};

const shuffleDiceHand = (arr, func) => { // Apply passed function to passed array
  arr.forEach( (die,index) => {
    !icon[index + 1].hasClass('hold')
    ? setTimeout( () => { func(index+1, 0, 10); }, 250 )
    : null;
  }) 
};

///// Roll btn functionality /////

rollBtn.on("click", () => {

  (round === 0) // First roll of game
  ? (rollBtn.text("Roll Dice"), 
    diceRoll(iconArr), // Fill currentDiceRolled array
    shuffleDiceHand(currentDiceRolled, shuffleDie), // Roll for icons 1-5
    round++,
    rollCount++)

  : (round > 0 && rollCount < 3) // Subsequent rolls
    ? (currentDiceRolled.length = 0,
      diceRoll(iconArr),
      shuffleDiceHand(currentDiceRolled, shuffleDie),
      rollCount++)

    : ($(".message").text("No more rolls!"), // No more rolls for current turn
      setTimeout( () => { 
        $(".message").show(); }, 20));
});

// Puts "hold" class on clicked icon, making  rollBtn click pass
// This is only functional once game begins
$("#icon1, #icon2, #icon3, #icon4, #icon5").click( function() {
  if (round !== 0) {
    if (rollCount > 0) {
      $(this).toggleClass("hold");
    } else {
      $(".message").text("You must roll the dice!");
      setTimeout(function(){ $(".message").show(); }, 20);
    }
  }
});

