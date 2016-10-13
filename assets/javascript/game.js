var words = ["mask", "ghost", "witch", "pumpkin", "broom", "bat", "candy"];
var computerGuess = (words[Math.floor(Math.random()*words.length)]);
var chances = 6;
var flagGuess;
var chancesIndex = 0;

var player = {
		wins: 0,
		losses: 0,

displayStats: function() {
		console.log("Wins: " + this.wins + " " + "Losses: " + this.losses);
		document.getElementById("stats").innerHTML = ("Games won: " + this.wins + " " + "Games lost: " + this.losses);
	}
}

// Store letters guessed right to display
var storeRight = [];

// Initialize array
for(var r = 0; r < computerGuess.length; r++) {
	storeRight[r] = "_";
}

// Store letters guessed wrong to display
var storeWrong = [];

// Initialize array
for(var w = 0; w < chances; w++) {
	storeWrong[w] = "_";
}

function startGame() {

	console.log("Pick a letter!");
	document.getElementById("press").innerHTML = "Pick a letter!";

	document.onkeyup = function(event) {

		// Determines which exact key was selected. Make it lowercase
		var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	
		// Checks to see if each letter for the whole word is a match or not
		flagGuess = false;

		for (var i = 0; i < computerGuess.length; i++) {
			if (userGuess === computerGuess.charAt(i)) {
				console.log("Right! You guessed " + computerGuess.charAt(i));
				storeRight[i] = computerGuess.charAt(i);
				flagGuess = true;
			}

			else if((i == (computerGuess.length - 1)) && (flagGuess == false)) {
				console.log("Wrong! You guessed " + userGuess); 
				storeWrong[chancesIndex] = userGuess;
				chancesIndex++;
				chances--;
			}
		}	

		console.log(storeRight.join(" "));
		document.getElementById("right").innerHTML = ("Word to guess: " + storeRight.join(" "));
		console.log(storeWrong.join(" "));
		document.getElementById("wrong").innerHTML = ("Letters already guessed: " + storeWrong.join(" "));
		console.log("Number of chances left: " + chances);
		document.getElementById("remaining").innerHTML = ("Number of guesses left: " + chances);

		//first condition for ending the game
		if(chances == 0) {
			player.losses++;
			player.displayStats();
			 console.log(computerGuess + " Press any key to continue!");
			 document.getElementById("press").innerHTML = ("It was " + computerGuess + "." + " Press any key to continue!");
				document.onkeyup = function(event) {
		 	resetValues();
		 	startGame();
			}
		}

		//second condition for ending the game
		else if(storeRight.join("") == computerGuess) {
			player.wins++;
			player.displayStats();
			console.log("Great job! You win! Press any key to continue!");
			document.getElementById("press").innerHTML = ("You win! Press any key to continue!");
				document.onkeyup = function(event) {
		 	 resetValues();
		 	 startGame();
			}
		}
	}
}

function resetValues() {
	computerGuess = (words[Math.floor(Math.random()*words.length)]);
	chances = 6;
	chancesIndex = 0;

	storeRight = [];

	for(var x = 0; x < computerGuess.length; x++) {
		storeRight[x] = "_";
	}

	document.getElementById("right").innerHTML = ("Word to guess: " + storeRight.join(" "));

	storeLeft = [];

	for(var y = 0; y < chances; y++) {
		storeWrong[y] = "_";
	}

	document.getElementById("wrong").innerHTML = ("Letters already guessed: " + storeWrong.join(" "));

	document.getElementById("remaining").innerHTML = ("Number of guesses left: " + chances);

	console.log("New word: " + computerGuess);
}