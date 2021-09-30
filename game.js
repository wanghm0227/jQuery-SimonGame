// Game settins
const COLORS = ["green", "red", "yellow", "blue"];

var randomPattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// If player don't know how to play, get instruction text
$("#game-help").click(function () {
  if ($("#game-instruction").css("display") === "none") {
    $("#game-instruction").css("display", "block");
  } else {
    $("#game-instruction").css("display", "none");
  }
});

// Close instruction
$("#close-instruction").click(function () {
  $("#game-instruction").css("display", "none");
});

// Press any key to start game
$(document).keypress(function () {
  if (!started) {
    setTimeout(() => {
      nextSequence();
    }, 200);
    started = true;
  }
});

// Detect player click
$(".btn").click(function () {

  let btnColor = $(this).attr("id");
  playSound(btnColor);
  animatePress(btnColor);
  userClickedPattern.push(btnColor);

  checkAnswer(userClickedPattern.length - 1);

});


// Generate random color
function nextSequence() {

  level++;
  $("#level-title").text(`level ${level}`);
  let randomColor = COLORS[Math.floor(Math.random() * 4)];
  randomPattern.push(randomColor);

  // Add animation to button
  $(`#${randomColor}`).fadeOut(150).fadeIn(150);
  playSound(randomColor);

}


// Play sound
function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}


// Press button animation
function animatePress(buttonColor) {
  let btn = $(`#${buttonColor}`);
  btn.addClass("pressed");
  setTimeout(() => {
    btn.removeClass("pressed");
  }, 150);
}


// Check whether player clicked correctlly
function checkAnswer(lastIndex) {
  if (userClickedPattern[lastIndex] === randomPattern[lastIndex]) {
    if (userClickedPattern.length === randomPattern.length) {
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 750);
    }
  } else {
    gameOver();
  }
}


// Reset game settings
function gameOver() {

  // gmae over animtion and sound
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 150);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  started = false;
  level = 0;
  userClickedPattern = [];
  randomPattern = [];
}

