/**
 * @file index.js is the root file for this quiz app
 * @author John Story
 */

$(document).ready(function() {


	/**
	 * @const questionsArr
	 * @type {Array<object>}
	 */
	const questionsArr = [

		// question 1; index[0]
		{
			question: "What SQL keyword retrieves rows from one or more tables?",
			possibleAnswers: ["DISTINCT", "JOIN", "SELECT", "INSERT"],
			correctAnswer: "SELECT",
			correctLink: "https://www.postgresql.org/docs/9.5/sql-select.html",
		},

		// question 2; index[1]
		{
			question: "What does the statement `SELECT REPLACE('ABCD', 'D', '1');` produce?",
			possibleAnswers: ["ABCD", "1111", "NULL", "ABC1"],
			correctAnswer: "ABC1",
			correctLink: "https://www.postgresqltutorial.com/postgresql-replace/",
		},

		// question 3; index[2]
		{
			question: "How would you retrieve all unique values from the 'NAME' column in the table `quiz_users`?",
			possibleAnswers: ["SELECT * FROM quiz_users;","SELECT DISTINCT NAME FROM quiz_users;",
                "SELECT UNIQUE NAMES FROM quiz_users;","SELECT NAME FROM quiz_users;"],
			correctAnswer: "SELECT DISTINCT NAME FROM quiz_users;",
			correctLink: "https://www.postgresqltutorial.com/postgresql-select-distinct/",
		},

		{
			question: "What is the correct command to create a table?",
			possibleAnswers: ["MAKE TABLE;", "CREATE TABLE", "OPEN TABLE", "SPAWN TABLE"],
			correctAnswer: "CREATE TABLE",
			correctLink: "https://www.postgresql.org/docs/9.1/sql-createtable.html",
		},

		{
			question: "What keyword adds the datasets of multible queries?",
			possibleAnswers: ["UNION", "JOIN", "APPEND", "NEW"],
			correctAnswer: "UNION",
			correctLink: "https://www.postgresqltutorial.com/postgresql-union/",
		}

	];//closing out questionsArr

	/**
	 * @var count
	 * @type {number}
	 */
	let count = 0;

	/**
	 *  @var questionInt
	 *  @description questionInt will hold the setInterval when we start the quiz
	 */
	let questionInt;

	/**
	 * @var number
	 * @description setting question start equal to 10 (seconds)
	 * @type {number}
	 */
	let number = 10;


	/**
	 * @var correctCount
	 * Count for correct answers
	 * @type {number}
	 */
	let correctCount = 0;

	/**
	 * @var incorrectCount
	 * Count for incorrect answers
	 * @type {number}
	 */
	let incorrectCount = 0;

	/**
	 * @var unansweredCount
	 * Count for questions that were unanswered at timeout
	 * @type {number}
	 */
	let unansweredCount = 0;

	/**
	 * @var userAnswer
	 * @description variable to store user answer
	 * @type {string}
	 */
	let userAnswer = "";





//  FUNCTIONS
//  ====================

	function updateQuestionAndScore() {
  		if (count + 1 >= questionsArr.length) {
			const html = $(`<ul>
      	<li id="js-answered">Question: ${questionsArr.length} / ${questionsArr.length}</li>
      	<li id="js-score">Score: ${correctCount} / ${questionsArr.length} </li>
    	</ul>`);
			$(".question-and-score").html(html);
		} else {
  			const html = $(`<ul>
      	<li id="js-answered">Questions Number: ${count + 1} / ${questionsArr.length}</li>
      	<li id="js-score">Score: ${correctCount} / ${questionsArr.length} </li>
    	</ul>`);
			$(".question-and-score").html(html);
		}
}

	/**
	 * @function correctResponse
	 * @description Displays "Correct!", surfaces reference link, increments correctCount & count
	 */
	function correctResponse() {
		$("#answers").empty();
		$("#question").html("<h2>Correct!</h2>");
		$("#question").append("<a href='"+ questionsArr[count].correctLink +"' + target='_blank'>see reference</a></<br>");

		correctCount++;
		count++;
		clearInterval(questionInt);
		if(count === questionsArr.length) {
			showGameOver();
		};
		if (count < questionsArr.length) {
		$("#question").append("<br><button class='next-button'><strong>Next</strong></button>")
		$(".next-button").on("click", function(){
			showQuestion();
		});
		};
	}

	function incorrectResponse() {
		$("#answers").empty();
		$("#question").html("<h2>Incorrect</h2>");
		$("#question").append("<div> The correct answer was: " + questionsArr[count].correctAnswer + "</div </<br>");
		$("#question").append("<a href='"+ questionsArr[count].correctLink +"' + target='_blank'>see reference</a></<br>");
		incorrectCount++;
		count++;
		clearInterval(questionInt);
		if(count === questionsArr.length) {
			showGameOver();
		};
		if(count < questionsArr.length) {
		$("#question").append("<button class='next-button'><strong>Next</strong></button>")
		$(".next-button").on("click", function(){
			showQuestion();
		});
		};
	}

	function restartGame() {
		correctCount = 0;
		incorrectCount = 0;
		unansweredCount = 0;
		number = 10;
		count = 0;
		userAnswer = "";
		showQuestion();

	}

	function showGameOver () {
		updateQuestionAndScore();
		$("#answers").empty();
		$("#response").empty();
		$("#question").html("<h2>All done, here's how you did:</div>")
		$("#question").append("<div> Correct Answers: " + correctCount + "</div><div>Incorrect Answers: " + incorrectCount + "</div><div>Unanswered: " + unansweredCount + "</div>")
		$("#question").append("<button class='restart-button'><strong>Start Over?</strong></button>")
		$(".restart-button").on("click", function(){
			restartGame();
		});
	}



	// populates fields with the first question


	function showQuestion() {
		updateQuestionAndScore();
		$("#answers").empty();
		$("#response").empty();
		$("#question").html(questionsArr[count].question)
                 
		$("#answers").append(`<form class="answerOptions">
        <fieldset>
          <label class="answerOptionRadio">${questionsArr[count].possibleAnswers[0]}
            <input type="radio"  class='option-button' name="answerOption" value="${questionsArr[count].possibleAnswers[0]}" required>
          </label>
          <label class="answerOptionRadio">${questionsArr[count].possibleAnswers[1]}
            <input type="radio"   class='option-button' name="answerOption" value="${questionsArr[count].possibleAnswers[1]}" required>
          </label>
          <label class="answerOptionRadio">${questionsArr[count].possibleAnswers[2]}
            <input type="radio"   class='option-button' name="answerOption" value="${questionsArr[count].possibleAnswers[2]}" required>
          </label>
          <label class="answerOptionRadio">${questionsArr[count].possibleAnswers[3]}
            <input type="radio"   class='option-button' name="answerOption" value="${questionsArr[count].possibleAnswers[3]}" required>
          </label>
            <button class="answerSubmitButton" type="submit">Check it</button>
          </fieldset>
          </form>`);
                
		$("form").on("submit",function(e){
            e.preventDefault();
			let userAnswer = $('input[name="answerOption"]:checked').val();
            if (userAnswer === questionsArr[count].correctAnswer) {
					correctResponse()
				}
				else  {
					incorrectResponse();
				}
		});
	};




		$("#startButton").on("click",function() {
			$(this).hide();
			showQuestion();

		});







}); // end document ready
