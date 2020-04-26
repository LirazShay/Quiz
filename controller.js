$(document).ready(function () {

	var questionBank = new Array;
	var currentQuestionNumber;
	var currentAnswer;
	var numberOfQuestions;
	var gamePosition;
	var score;

	$.ajaxSetup({ cache: false });

	$.getJSON('data.json', function (data) {
		var quizitems = data.quizlist[0].quizitems;
		numberOfQuestions = quizitems.length;
		for (i = 0; i < quizitems.length; i++) {
			typeArray = [];
			typeArray[0] = quizitems[i].question;
			typeArray[1] = quizitems[i].response;
			questionBank[i] = typeArray;
		}
		gamePosition = 1;
		resetGame();
		updateQuestion();

	})//getJSON

function resetGame() {
	currentQuestionNumber = 0;
	score = 0;
	$("#gameArea").empty();
	$("#gameArea").append('<button class="levelBtn" id="level1">רמה 1</button>');
	$("#gameArea").append('<button class="levelBtn" id="level2">רמה 2</button>');
	$("#gameArea").append('<h1 class="title is-2 is-blue">חידון המשנה העולמי</h1>');
	$("#gameArea").append('<p>האם אתה יודע להשלים את החסר? הזן את התשובה ולחץ על ENTER:</p>');
	$("#gameArea").append('<p id="wordBox">Sentence 1</p>');
	$("#gameArea").append('<input type="text" id="inputBox">');
	$("#gameArea").append('<div id="feedback"></div>');
	$("#gameArea").append('<p id="message"></p>');

};//resetGame

function updateQuestion() {
	$('#wordBox').empty();
	$('#wordBox').append(questionBank[currentQuestionNumber][0]);
	$('#message').empty();
	$('#feedback').empty();
	$('#inputBox').empty();
	$('#inputBox').prop("disabled", false);
	$('#inputBox').val('');
	$('#inputBox').css("background-color", "white");
	$('#inputBox').css("color", "black");
	$('#inputBox').focus();
	currentAnswer = questionBank[currentQuestionNumber][1];
	currentQuestionNumber++;
	gamePosition = 1;
}//updateQuestion

$(document).on("keyup", function (e) {
	if (e.which == 13) { gameControl(); };
});

$(document).on("click tap", function () {
	gameControl();
});//tap

function gameControl() {
	switch (gamePosition) {
		case 1:
			checkAnswer();
			break;
		case 2:
			updateQuestion();
			break;
		case 3:
			scorePage();
			break;
		case 4:
			resetGame();
			updateQuestion();
			break;
	}//switch	
}//gamecontrol

function checkAnswer() {
	myAnswer = $('#inputBox').val();
	if (myAnswer.slice(myAnswer.length - 1, myAnswer.length) == " ") {
		myAnswer = myAnswer.slice(0, myAnswer.length - 1);
	}
	if (currentAnswer == myAnswer) {
		score++;
		$('#feedback').append('<img src="tick.png">');
		$('#inputBox').css("background-color", "green");
		$('#inputBox').css("color", "white");
	}
	else {
		$('#feedback').append('<img src="cross.png">');
		$('#inputBox').css("background-color", "red");
		$('#inputBox').css("color", "white");
		$('#inputBox').val($('#inputBox').val() + " (התשובה הנכונה: " + currentAnswer + ")");
	}
	$('#message').append('לחץ על ENTER כדי להמשיך');

	$("#inputBox").prop('disabled', true);
	$("#gameArea").focus();
	gamePosition = 2;
	if (currentQuestionNumber == numberOfQuestions) { gamePosition = 3; }
}//checkAnswer

function scorePage() {
	$("#gameArea").empty();
	$("#gameArea").append("<h1>סיימת את החידון!</h1><br><br>");
	$("#gameArea").append("ענית: " + score + ' מתוך ' + numberOfQuestions + ' תשובות נכונות' + '<br><br>');
	$("#gameArea").append("ציון סופי: " + parseInt(score / numberOfQuestions * 100) + '<br><br>');
	$('#message').append('לחץ על ENTER כדי להמשיך');
	gamePosition = 4;
}//scorePage
		 

});//doc ready