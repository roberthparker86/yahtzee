currentDiceRolled = [1, 6, 4, 3, 4];

const ScoreCalc = {
	filterNumbers: (targetNum) => {
		return currentDiceRolled.filter(num => ( num === targetNum && num ));
	},
	getScoreSum: (arr) => {
		return arr.length > 0 ?
			arr.reduce((total, currentNum) => total + currentNum):
			0;
	},

	"p-btn-1": function() {
    let filterdArray = this.filterNumbers(1);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	"p-btn-2": function() {
    let filterdArray = this.filterNumbers(2);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	"p-btn-3": function() {
    let filterdArray = this.filterNumbers(3);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	"p-btn-4": function() {
    let filterdArray = this.filterNumbers(4);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	"p-btn-5": function() {
    let filterdArray = this.filterNumbers(5);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	"p-btn-6": function() {
    let filterdArray = this.filterNumbers(6);
		return this.getScoreSum(filterdArray); // For updating number under 1 on the scoreboard
	},
	
};

console.log(ScoreCalc);
console.log(ScoreCalc['p-btn-1']());
console.log(ScoreCalc['p-btn-2']());
console.log(ScoreCalc['p-btn-3']());
console.log(ScoreCalc['p-btn-4']());
console.log(ScoreCalc['p-btn-5']());
console.log(ScoreCalc['p-btn-6']());

