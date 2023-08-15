$(document).ready(function () {
  var initialPage = $("#initial-page");
  var questionPage = $("#questions-page");
  var startBtn = $("#button-start");
  var startPage = $("#start-page");
  var choices = $("#choices");
  var timerID = $("#time");
  var feedbackElement = $("#feedback");
  var scoreElement = $("#final-score");

  initialPage.show();
  questionPage.hide();

  // load questions from file
  var currentQuestionIndex = 0;
  var time = 60;

  function startTimer() {
    var timerInterval = setInterval(function () {
      time -= 1;
      timerID.text(time);
      if (time <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  // start quiz
  startBtn.on("click", function () {
    //show only starting page
    startPage.hide();
    $("#questions-page").removeClass("hide");
    $("#questions-page").show();

    startTimer();

    showQuestion(currentQuestionIndex, choices);
  });

  function showQuestion(index, choices) {
    // get current question object from array
    var currentQuestion = questions[index];

    // update title with current question
    var titleEl = $("#question-title");
    titleEl.text(currentQuestion.title);

    // clear out any old question choices
    choices.empty();

    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {
      // create new button for each choice
      var choicesOpt = $("<button>");
      choicesOpt.attr("class", "choice");
      choicesOpt.attr("value", choice);
      choicesOpt.text(i + 1 + ". " + choice);

      // attach click event listener to each choice
      choicesOpt.on("click", questionClick);

      // display on the page
      choices.append(choicesOpt);
    });
  }

  function questionClick() {
    // verify if correct answer selected
    if (this.value !== questions[currentQuestionIndex].answer) {
      // deducts time if incorrect
      time -= 15;

      if (time < 0) {
        time = 0;
        quizEnd();
      }
      // display new time on page
      timerID.text(time);
      feedbackElement.text("Wrong!");
    } else {
      feedbackElement.text("Correct!");
    }

    // flash right/wrong feedback
    feedbackElement.addClass("feedback");
    setTimeout(function () {
      feedbackElement.removeClass("feedback");
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex, choices);
      } else {
        quizEnd(time);
      }
    }, 1000);
  }

  function quizEnd() {
    // hide questions page
    $("#questions-page").hide();

    // show score page
    $("#score-page").removeClass("hide");
    $("#score-page").show();

    var score = time;

    // display score
    scoreElement.text(score);
  }
});
