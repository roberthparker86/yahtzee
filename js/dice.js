/*jshint esversion: 6 */

///// Declarations /////

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
    }, 50)) 
  : icon[index]
      .removeClass()
      .addClass(diceClass[curRoll[index -1]]);
};

// Roll btn functionality
rollBtn.on("click", () => {
  // For first roll of the game
  if (round === 0) {
    // Changes btn label "Click to start" to "Roll Dice"
    rollBtn.text("Roll Dice");
    diceRoll(iconArr); // Fill curRoll array

    shuffleDie(1,0,5); // Roll animation for icons 1-5
    setTimeout( () => shuffleDie(2,0,5), 250);
    setTimeout( () => shuffleDie(3,0,5), 500);
    setTimeout( () => shuffleDie(4,0,5), 750);
    setTimeout( () => shuffleDie(5,0,5), 1000);

    round++;
    rollCount++;
  } else if (round > 0 && rollCount < 3) {
    //  For subsequent rolls. If .hold class not present, removes current class
    // and assigns new classes randomly
    curRoll.length = 0;
    diceRoll(iconArr); // Fill curRoll array
    for (let i = 1; i < 6; i++) {
      if (icon[i].hasClass("hold") === false) {
        setTimeout(shuffleDie(i,0,5), ((i-1) * 250) );
      }
    }
    rollCount++;
  } else {
    $(".message").text("No more rolls!");
    setTimeout(function(){ $(".message").show(); }, 20);
  }
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
