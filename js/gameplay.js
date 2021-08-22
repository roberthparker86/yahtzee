/*jshint esversion: 6 */
$(function() { // .ready method shorthand

 /// Controls for the score buttons ///
	const checkHold = (elem) => $(elem).hasClass("hold");

	const checkRoundZero = () => round === 0;

	const message = (string) => { // Pops up message window with passed string
		$(".message").text(string);
		setTimeout( () => {
			$(".message").show();
		}, 20);
	};

	const setScore = (elem) => {
		// return the appropriate selector class
		const returnScoreClass = (elem) => { 
			return ($(elem).hasClass("score-btn")) ?
				".score-val" : ($(elem).hasClass("score-btn-b")) ?
					".score-val-b" : alert("returnScoreClass Error");
		};

		const scoreRow = $(elem).parents(".score-row");
		const scoreVal = scoreRow.find(returnScoreClass(elem));
		const value = scoreCalc[$(elem).attr("id")]();
		plyrScore.push(value);
		const total = plyrScore.reduce( (a,b) => a + b );

		scoreVal.text(value);
		scoreVal.addClass("hold");
		$("#total").text(total);
		$(elem).addClass("hold");
		plyrTurn++;
		setTimeout(plyrCheck, 500);
	};

	const handleScoreClick = (elem) => { // If problem display message otherwise set score on scoreboard
		checkHold(elem) ? 
			message("This category has been used. Pick another.") : checkRoundZero() ?
				message("Roll dice to begin game!") : setScore(elem);
	};

	//  Controls left column
	$(".score-btn").on("click", function() { 
		handleScoreClick(this);
	});

	// Controls right column
	$(".score-btn-b").on("click", function() { 
		handleScoreClick(this);
	});

	// Hide pop up message when screen is clicked
	$("body").on("click", function() {
		if ($(".message").is(":visible")) {
			$(".message").hide();
		}
	});
});
