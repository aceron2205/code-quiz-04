$(document).ready(function () {
  var initialPage = $("#initial-page");
  var questionPage = $("#questions-page");
  var startBtn = $("#button-start");
  var startPage = $("#start-page");
  var choices = $("#choices");
  var timerID = $("#time");
  var feedbackElement = $("#feedback");
  var scoreElement = $("#final-score");
  var questionCounter = $('#question-counter')
  var score = 0;
  var btnSubmitResults = $('#btn-initials')
  var resInput = $('#input-initials')
  var highScores = JSON.parse(localStorage.getItem('highScores') || '[]')
  var highScoresTable = $('#high-scores')
  var hsPanel = $('#hs')


  initialPage.show();
  questionPage.hide();


  
  if(highScores.length === 0) {
    hsPanel.hide()
  }

  
  highScores.forEach(value => {
    highScoresTable.append($("<li>").text(value));
  })

  // load questions from file
  var currentQuestionIndex = 0;
  var time = 60;

  function startTimer() {
    var timerInterval = setInterval(function () {
      time -= 1;
      timerID.text(time);
      if (time <= 0) {
        clearInterval(timerInterval);
        quizEnd()
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

  btnSubmitResults.on("click", function () {
    var initials = resInput.val().trim()
    if(!initials.length) {
      alert('please enter your initials')
      return;
    }

    highScores.push(initials + '-' + score)

    localStorage.setItem('highScores', JSON.stringify(highScores))

    alert('Your score is now saved :)')

    document.location.href = '/'
    
  });

  function showQuestion(index, choices) {
    questionCounter.text((index + 1) + " / " + questions.length )
    
    feedbackElement.text("");

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
    // disable buttons
    $('#choices > button').attr("disabled", true)

    // verify if correct answer selected
    if (this.value !== questions[currentQuestionIndex].answer) {
      // deducts time if incorrect
      time -= 15;
      // display new time on page
      timerID.text(time);
      feedbackElement.text("Wrong!");
    } else {
      score += 1
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

    score = (questions.length / score).toFixed(2)

    // display score
    scoreElement.text(score);
  }
});
