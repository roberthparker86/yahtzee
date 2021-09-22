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

	const reducePlayerScoreValues = () => {
		const scoresArray = [];

		for (const prop in playerScoreValues) {
			prop !== 'total' && scoresArray.push(playerScoreValues[prop]);
		}

		return scoresArray.reduce((a,b) => a + b);
	};

	const setScore = (elem) => {

		/** Get a "value" ID from the clicked button ID to be used for updating both
		 *  the scoreObject and relevant scoreboard value html element
		 */ 
		const scoreValueElementId = `${elem.id}-value`;

		// Set current dice score based on button clicked
		const value = scoreCalc[elem.id]();

		// Use scoreValueElementId to update proper slot on playScoreValues
		playerScoreValues[scoreValueElementId] = value;
		playerScoreValues['total'] = reducePlayerScoreValues();

		// Update the scorboard
		populatePlayerScores();

		/** Update Total HTML element with new score. Add hold class to clicked element
		 *	Change player turn over to computer
		 */
		$(elem).addClass("hold");
		plyrTurn++;
		setTimeout(plyrCheck, 500);
	};

	const handleScoreClick = (elem) => { // If problem display message otherwise set score on scoreboard
		checkHold(elem) ? 
			message("This category has been used. Pick another.") : checkRoundZero() ?
				message("Roll dice to begin game!") : setScore(elem);
	};

	//  Bind event handler to score buttons
	$(".score-btn").on("click", function() { 
		handleScoreClick(this);
	});

	// Hide pop up message when screen is clicked
	$("body").on("click", function() {
		if ($(".message").is(":visible")) {
			$(".message").hide();
		}
	});

});
