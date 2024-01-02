/*
RULE OF THUMB FOR THIS HW ASSIGNMENT
1. Start button that leads to the quiz starting
2. Quiz has a functional score and timer system
3. Each correct answer button press leads to the next question
4. Incorrect answer buttons decreases time from the timer
5. Quiz ends when the timer ends or the answers are all correct
6. When it is over, you can save your data to a leaderboard that is saved to your localStorage
7. There is a functional leaderboard button available at the start
*/

// html el
var startQuiz = document.querySelector("#start")
var questionDiv = document.querySelector('#quests')
var answersDiv = document.querySelector("#answers")
var headerEl = document.querySelector('.main-page-header')
var timerEl = document.querySelector('#timer')

/*
1. add function to compare if data-answer === correct1, etc
2. recall questionnaire in that function
3. in that function add currentAnswer+ and currentQuestion+
4. make function for gameover status
*/

// vars
var timer = 60;
var time = '';

// Question arrays
var currentQuestion = 0;
var currentAnswer = 0;

var questions = [
    "What is a boolean?",
    "What does CSS mean?",
    "What does HTML mean"
]


var answer1 = [
    "a true or false statement",
    "a type of boot",
    "a type of pasta",
    "a string of code"
]

var answer2 = [
    "Computer Science Studies",
    "Cascading Style Sheet",
    "Chicken Salad Sunday",
    "Classic Salty Soup"
]

var answer3 = [
    "a console log",
    "A graphics processor",
    "A type of Mercedes",
    "HyperText Markup Language"
]

var answers = [
    answer1,
    answer2,
    answer3
]
function endGame(){
    answersDiv.setAttribute('class', 'hidden');
    questionDiv.setAttribute('class', 'hidden');
    
    
}

var correct1 = "a true or false statement";
var correct2 = "Cascading Style Sheet";
var correct3 = "HyperText Markup Language";


function questionnaire(){
    if (currentQuestion < 3){
        questionDiv.innerHTML = "<p>" + questions[currentQuestion] + "</p>";
        var tempAnswers = answers[currentAnswer];
        console.log(tempAnswers);
        answersDiv.textContent = '';
        for (var i=0; i < tempAnswers.length; i++){
            // answersDiv.innerHTML += tempAnswers[i];
            var btn = document.createElement('button');
            btn.textContent = tempAnswers[i];
            btn.setAttribute("data-answer", tempAnswers[i]);
            
            btn.setAttribute('class', 'blocked')
            answersDiv.append(btn);
        }
    }
}
function quiz(){
    headerEl.setAttribute('class', 'hidden');
    console.log(questionDiv);
    questionnaire();

    
    time = setInterval(function(){
        timerEl.textContent = "Timer: " + timer;
        timer--;
        if (timer === 0 || currentQuestion === 3){
            clearInterval(time);
            endGame()
        }
    }, 1000)
    
}


function answerCheck(event){
    console.log(event.target)
    var answerSelected = event.target.getAttribute('data-answer');
    console.log(answerSelected);
    if(answerSelected == correct1 || answerSelected == correct2 || answerSelected == correct3){
        currentQuestion++;
        currentAnswer++;
        questionnaire();
    } else {
        timer = timer - 15;
        currentQuestion++;
        currentAnswer++;
        questionnaire();
    }
}



answersDiv.addEventListener("click", answerCheck);
startQuiz.addEventListener("click", quiz);
