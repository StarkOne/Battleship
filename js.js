var view = {
	displayMessage: function(mag) {
		var messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = mag;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');

	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	}
}
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{locations: ["06", "16", "26"], hits: ["","",""]},
					{locations: ["24", "34", "44"], hits: ["","",""]},
					{locations: ["10", "11", "13"], hits: ["","",""]}],
	fire: function(guess){
		for (var i = 0; i < this.length; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if(index >= 0){
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!!");
				if(this.isSunk(ship)){
					view.displayMessage("You sank my Battleship");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed");
		return false;
	},
	isSunk: function(ship){
		for (var i = 0; i < this.shipLength; i++) {
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	}
}
var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fire(location);
			if(hit && model.shipsSunk === model.numShips){
				view.displayMessage("You sank all my battleships, in" + this.guesses + "guesses");
			}
		}
	}
};
function parseGuess(guess) {
	var alphabet = ["A", 'B', "C", "D", "E", "F", "G"];
	if (guess === null || guess.length !== 2){
		alert("Не выполняется");
	}else{
		firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)){
			alert("oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
			alert("oops, that off the board.");
		} else{
			return row + column;
		}
	}
	return null;
}
controller.processGuess("A0");
controller.processGuess("A6");
controller.processGuess("C6");
controller.processGuess("B6");
controller.processGuess("C4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");