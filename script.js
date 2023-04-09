$(document).ready(function() {
var initialPage = $("#initial-page")
var questionPage = $("#questions-page")
var startBtn = $("#button-start")
var startPage = $("#start-page")

    initialPage.hide();
    questionPage.hide();

    // load questions from file
    
        // start quiz

        startBtn.on("click", function() {


            startPage.hide();
            $("#questions-page").removeClass("hide");
            $("#questions-page").show(); 

            $.getJSON("questions.json", function(data) {



            // display questions
            var currentQuestion = 0;

            function displayQuestion() {
                var questionData = data[currentQuestion];
                $("#question").text(questionData.title);
                $("#option1").text(questionData.option1);
                $("#option2").text(questionData.option2);
                $("#option3").text(questionData.option3);
                $("#option4").text(questionData.option4);
            }

            displayQuestion();
        });
    });
});

/*


//DOM Variables
var startBtn = $("#button-start")
console.log(startBtn)




//-----------------Starting Page
var startPage = $("#start-page");
console.log(startPage)
var question = $("#question");
var option
//ar questionPage = $("#question-page");

//var initialsPage = $("#initial-page");



//-----------Landing page set up-------//
        $(document).ready(function(){
            $("#initial-page").hide()
            $("#questions-page").hide()
            //$("#start-page").hide()
        })


     /*      // load questions from file
    $.getJSON("questions.js", function(data) {
    //-------start button------------//
        startBtn.on("click", startQuiz);

        
    //-------start quiz--------------//
     /*   function startQuiz() {
            //hide landing page
          startPage.hide();
          
          $("#questions-page").removeClass("hide");
          $("#questions-page").show();

           // display questions
           var currentQuestion = 0;

           function displayQuestion() {
               var questionData = data[currentQuestion];
               $("#question").text(questionData.title);
               $("#option1").text(questionData.option1);
               $("#option2").text(questionData.option2);
               $("#option3").text(questionData.option3);
               $("#option4").text(questionData.option4);
           }

           displayQuestion();
       });
*/
    