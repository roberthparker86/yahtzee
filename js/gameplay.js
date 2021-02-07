/*jshint esversion: 6 */
$(function() { // .ready method shorthand

 /////Ctrls for the score buttons /////
  const checkHold = (elem) => $(elem).hasClass("hold");

  const checkRoundZero = () => round === 0;

  const message = (string) => { // Pops up message window with passed string
    $(".message").text(string);
    setTimeout( () => {
      $(".message").show();
    }, 20);
  };

  const setScore = (elem) => {
    const returnScoreClass = (elem) => { // return the appropriate selector class
      return ($(elem).hasClass("score-btn"))
        ? ".score-val"
        : ($(elem).hasClass("score-btn-b"))
          ? ".score-val-b"
          : alert("returnScoreClass Error");
    };

    const scoreRow = $(elem).parents(".score-row"),
      scoreVal = scoreRow.find(returnScoreClass(elem)),
      value = calcScore($(elem).attr("id")),
      total = plyrScore.reduce( (a,b) => a + b );

    scoreVal.text(value);
    scoreVal.addClass("hold");
    $("#total").text(total);
    $(elem).addClass("hold");
    plyrTurn++;
    setTimeout(plyrCheck, 500);
  };

  const handleScoreClick = (elem) => { // If problem display message otherwise set score on scoreboard
    checkHold(elem) 
    ? message("This category has been used. Pick another.")
    : checkRoundZero()
      ? message("Roll dice to begin game!")
      : setScore(elem);
  };

  $(".score-btn").on("click", function() { //  Ctrls the left column
    handleScoreClick(this);
  });

  $(".score-btn-b").on("click", function() { // Ctrls right column
    handleScoreClick(this);
  });

  $("body").on("click", function() { // Hide pop up message when screen is clicked
    if ($(".message").is(":visible")) {
      $(".message").hide();
    }
  });
});
