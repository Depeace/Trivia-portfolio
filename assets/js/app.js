
$(document).ready(function () {
var options = [
	{
		question: "who won the UEFA Champions League 2019?", 
		choice: ["Ajax", "Tottenham", "Barcelona", "Liverpool"],
		answer: 3,
		photo: "./assets/images/champs.jpg"
	 },
	 {
	 	question: "Which teams are on NBA finals 2019?", 
		choice: ["GSW-Toronto", "GSW-Cavs", "Celtics-GSW", "Bucks-GSW"],
		answer: 0,
		photo: "./assets/images/finalist.jpg"
	 }, 
	 {
	 	question: "Who are the champions of NBA 1999/2000?", 
		choice: ["Heat", "Indiana Pacers", "LA Lakers", "Rockets" ],
		answer: 2,
		photo: "./assets/images/LA-Lakers.jpg"
	}, 
	{
		question: "Who is hosting the FIFA World-Cup 2022?", 
		choice: ["America", "Canada", "Spain", "Qatar" ],
		answer: 3,
		photo: "./assets/images/hosting.jpg"
	}, 
	{
		question: "Which country won the FIFA World-Cup 2018?", 
		choice: ["Brazil", "France", "Croatia", "Spain" ],
		answer: 1,
		photo: "./assets/images/FIFA2018.jpg"
	}, 
	{
		question: "How many teams will be selected in FIFA World-Cup 2026?", 
		choice: ["32", "38", "42", "48" ],
		answer: 3,
		photo: "./assets/images/fifa2026.jpg"
	}, 
	{
		question: "How much amount do each team gets in UEFA Champions League?", 
		choice: ["#15 million", "#20 million", "#18 million", "#22 million" ],
		answer: 0,
		photo: "assets/images/teams.jpg"
	}, 
	{
		question: "How many times did Ronaldo win Ballon d'Or award?", 
		choice: ["3", "4", "5", "6" ],
		answer: 2,
		photo: "./assets/images/ronaldo.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<h2>Correct!</h2>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h2>Game Over!  Here's how you did: </h2>");
		$("#answerblock").append("<h3> Correct: " + correctCount + "</h3>" );
		$("#answerblock").append("<h3> Incorrect: " + wrongCount + "</h3>" );
		$("#answerblock").append("<h3> Unanswered: " + unanswerCount + "</h3>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
