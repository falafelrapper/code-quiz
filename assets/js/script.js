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

// vars
var timer = 60;

// Question arrays
var currentQuestion = 0;
var currentAnswer = 0;

var questions = [
    "What is a boolean?",
    "What does CSS mean?",
    "What does HTML mean"
]

var answers = [
    answer1,
    answer2,
    answer3
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

answer1[0] = true;
answer2[1] = true;
answer3[3] = true;

function endgame(){
    
}

function quiz(){
    headerEl.setAttribute('class', 'hidden');
    console.log(questionDiv);
    questionDiv.innerHTML = "<p>" + questions[currentQuestion] + "</p>";
    answersDiv.innerHTML = "<ul>" + answers[currentAnswer] + "</ul>";

    setInterval(function(){
        timerEl.textContent = "timer: " + timer;
        timer--;
    }, 1000)

    if (timer === 0){
        endGame()
    }
}

startQuiz.addEventListener("click", quiz);
