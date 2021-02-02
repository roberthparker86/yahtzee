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

function shuffle(num) { // Adds roll animation to a die.
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

// Roll btn functionality
rollBtn.on("click", () => {
  // For first roll of the game
  if (round === 0) {
    // Changes btn label "Click to start" to "Roll Dice"
    rollBtn.text("Roll Dice");
    diceRoll(iconArr); // Fill curRoll array

    shuffle(1); // Roll animation for icons 1-5
    setTimeout( () => shuffle(2), 250);
    setTimeout( () => shuffle(3), 500);
    setTimeout( () => shuffle(4), 750);
    setTimeout( () => shuffle(5), 1000);

    round++;
    rollCount++;
  } else if (round > 0 && rollCount < 3) {
    //  For subsequent rolls. If .hold class not present, removes current class
    // and assigns new classes randomly
    curRoll.length = 0;
    diceRoll(iconArr); // Fill curRoll array
    for (let i = 1; i < 6; i++) {
      if (icon[i].hasClass("hold") === false) {
        setTimeout(shuffle(i), ((i-1) * 250) );
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
