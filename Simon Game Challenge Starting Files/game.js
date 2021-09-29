// 设置四种颜色的按钮
const buttonColors = ["red", "blue", "green", "yellow"];

// 初始化系统给的颜色顺序和玩家点击的颜色顺序
var gamePattern = [];
var userClickedPattern = [];

// 初始关数和游戏开始标志
var level = 0;
gameStarted = false;

// 用户按任意按钮开始游戏
$(document).keypress(function () {

  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }

});

// 将玩家点击的颜色加入颜色顺序数组
$(".btn").click(function () {

  // 通过按钮块的id属性获取按钮的颜色
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // 玩家点击按钮时的动画和声音
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // 检查玩家每次点击的按钮是否符合系统的颜色顺序
  checkAnswer(userClickedPattern.length - 1);

});

// 系统随机生成下一关的按钮要求
function nextSequence() {
  // 清空上一关玩家点击的按钮顺序
  userClickedPattern = [];

  // 更新关数与标题
  level++;
  $("#level-title").html("level " + level);

  // 随机生成需要点击的按钮，并加入顺序数组
  let randomNumber = Math.floor(Math.random() * 4),
    randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // 生成按钮的动画与声音
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// 播放音效
function playSound(name) {
  sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

// 动画效果
function animatePress(currentColour) {
  let btn = $(`#${currentColour}`);
  btn.addClass("pressed");
  setTimeout(function () {
    btn.removeClass("pressed");
  }, 100);
}

// 检查用户的点击与游戏要求是否相符
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gameStarted = false;
  gamePattern = [];
  level = 0;
}