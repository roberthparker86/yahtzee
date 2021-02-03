/*jshint esversion: 6 */

///// Dice roll functions /////

const randNum = () => Math.ceil(Math.random() * 6); // Generates random number

const diceRoll = (arr) => { // Rolls new hand of dice. Ignore dice with ".hold" class
  arr.forEach( (item) => {
    item.hasClass('hold') 
    ? (item.removeClass('hold'), 
      curRoll.push( returnVal(item.attr('class'))), 
      item.addClass('hold')) 
    : curRoll.push(randNum());
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
      .addClass(diceClass[curRoll[index -1]]);
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
    diceRoll(iconArr), // Fill curRoll array
    shuffleDiceHand(curRoll, shuffleDie), // Roll for icons 1-5
    round++,
    rollCount++)

  : (round > 0 && rollCount < 3) // Subsequent rolls
    ? (curRoll.length = 0,
      diceRoll(iconArr),
      shuffleDiceHand(curRoll, shuffleDie),
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
