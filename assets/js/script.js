// HTML Elements
var startQuiz = document.querySelector("#start")
var questionDiv = document.querySelector("#quests")
var answersDiv = document.querySelector("#answers")
var leaderboardDiv = document.querySelector("#leaderboard")
var headerEl = document.querySelector(".main-page-header")
var timerEl = document.querySelector("#timer")
var nameInput = document.querySelector("#nameInput")
var saveButton = document.querySelector("#saveButton")
var restartButton = document.querySelector("#restartButton")

// Variables
var timer = 60
var time = ""

// Question arrays
var currentQuestion = 0
var currentAnswer = 0

var questions = [
  "What is a boolean?",
  "What does CSS mean?",
  "What does HTML mean",
]

var answer1 = [
  "a true or false statement",
  "a type of boot",
  "a type of pasta",
  "a string of code",
]

var answer2 = [
  "Computer Science Studies",
  "Cascading Style Sheet",
  "Chicken Salad Sunday",
  "Classic Salty Soup",
]

var answer3 = [
  "a console log",
  "A graphics processor",
  "A type of Mercedes",
  "HyperText Markup Language",
]

var answers = [answer1, answer2, answer3]

var correct1 = "a true or false statement"
var correct2 = "Cascading Style Sheet"
var correct3 = "HyperText Markup Language"

// Functions

function endGame() {
  answersDiv.classList.add("hidden")
  questionDiv.classList.add("hidden")
  leaderboardDiv.removeAttribute("class", "hidden")
}

function restartGame() {
  currentQuestion = 0
  currentAnswer = 0
  timer = 60
  clearInterval(time)

  questionDiv.classList.remove("hidden")
  answersDiv.classList.remove("hidden")
  leaderboardDiv.setAttribute("class", "hidden")
  nameInput.value = ""

  quiz()
}

function saveScore() {
  var playerName = nameInput.value.trim()

  if (playerName !== "") {
    var points = timer + 1
    var leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || []

    leaderboardData.push({ name: playerName, points: points })
    leaderboardData.sort((a, b) => b.points - a.points)
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))

    displayLeaderboard()
  }
}

function displayLeaderboard() {
  var leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || []
  var leaderboardTable = document.querySelector("#leaderboardTable")
  leaderboardTable.innerHTML = ""

  var headerRow = leaderboardTable.insertRow(0)
  var nameHeader = headerRow.insertCell(0)
  var pointsHeader = headerRow.insertCell(1)
  nameHeader.innerHTML = "<b>Name</b>"
  pointsHeader.innerHTML = "<b>Points</b>"

  for (var i = 0; i < leaderboardData.length; i++) {
    var row = leaderboardTable.insertRow(i + 1)
    var nameCell = row.insertCell(0)
    var pointsCell = row.insertCell(1)
    nameCell.innerHTML = leaderboardData[i].name
    pointsCell.innerHTML = leaderboardData[i].points
  }
}

function questionnaire() {
  if (currentQuestion < 3) {
    questionDiv.innerHTML = "<p>" + questions[currentQuestion] + "</p>"
    var tempAnswers = answers[currentAnswer]
    console.log(tempAnswers)
    answersDiv.textContent = ""
    for (var i = 0; i < tempAnswers.length; i++) {
      // answersDiv.innerHTML += tempAnswers[i];
      var btn = document.createElement("button")
      btn.textContent = tempAnswers[i]
      btn.setAttribute("data-answer", tempAnswers[i])

      btn.setAttribute("class", "blocked")
      answersDiv.append(btn)
    }
  }
}
function quiz() {
  headerEl.classList.add("hidden")
  console.log(questionDiv)
  questionnaire()

  time = setInterval(function () {
    timerEl.textContent = "Timer: " + timer
    if (timer <= 0 || currentQuestion === 3) {
      clearInterval(time)
      endGame()
    }
    timer--
  }, 1000)
}

function answerCheck(event) {
  console.log(event.target)
  var answerSelected = event.target.getAttribute("data-answer")
  console.log(answerSelected)
  if (
    answerSelected == correct1 ||
    answerSelected == correct2 ||
    answerSelected == correct3
  ) {
    currentQuestion++
    currentAnswer++
    questionnaire()
  } else {
    timer = timer - 15
    currentQuestion++
    currentAnswer++
    questionnaire()
  }
}

// Event Listeners
answersDiv.addEventListener("click", answerCheck)
startQuiz.addEventListener("click", quiz)
saveButton.addEventListener("click", saveScore)
restartButton.addEventListener("click", restartGame)
displayLeaderboard()
