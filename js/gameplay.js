/*jshint esversion: 6 */
$(function() { // .ready method shorthand

 /////Ctrls for the score buttons /////

  $(".score-btn").on("click", function() { //  Ctrls the left column
    if ($(this).hasClass("hold" ) == true) {
      $(".message").text("This category has been used. Pick another.");
      setTimeout(function(){ $(".message").show(); }, 20);
    } else if (round == 0) {
      $(".message").text("Roll dice to begin game!");
      setTimeout(function(){ $(".message").show(); }, 20);
    } else {
      let scoreRow = $(this).parents(".score-row"),
          scoreVal = scoreRow.find(".score-val"),
          value = calcScore($(this).attr("id")),
          total = plyrScore.reduce(function(a,b){ return a + b;});
      scoreVal.text(value);
      scoreVal.addClass("hold");
      $("#total").text(total);
      $(this).addClass("hold");
      plyrTurn++;
      setTimeout(plyrCheck, 500);
    }
  });

  $(".score-btn-b").on("click", function() { // Ctrls right column
    if ($(this).hasClass("hold") == true) {
      $(".message").text("This category has been used. Pick another.");
      setTimeout(function(){ $(".message").show(); }, 20);
    } else if (round == 0) {
      $(".message").text("Roll dice to begin game!");
      setTimeout(function(){ $(".message").show(); }, 20);
    } else {
      let scoreRow = $(this).parents(".score-row"),
          scoreVal = scoreRow.find(".score-val-b"),
          value = calcScore($(this).attr("id")),
          total = plyrScore.reduce(function(a,b){ return a + b;});
      scoreVal.text(value);
      scoreVal.addClass("hold");
      $("#total").text(total);
      $(this).addClass("hold");
      plyrTurn++;
      setTimeout(plyrCheck, 500);
    }
  });

  $("body").on("click", function() {
    if ($(".message").is(":visible")) {
      $(".message").hide();
    }
  });
});
