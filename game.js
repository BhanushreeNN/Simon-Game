var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
if (level == 0){
$(document).keypress(function(){
    nextSequence();
});
}
//to show the next sequence of colours
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("body").addClass("change");
    setTimeout(function(){
        $("body").removeClass("change");
    },100);
    $("h1").text("Level - "+level);
    var randomNumber = Math.floor(4*(Math.random()));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var i=0;
    playSequence();
    function playSequence() {
        setTimeout(function(){
            playSound(gamePattern[i]);
            i++;
            if(i<gamePattern.length)
            playSequence();
        }, 500)                   
    }
}

//to take input sequence from user
$(".btn").click(handler);
function handler(){
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
}
// checkAnswer(userClickedPattern.length);
//to check the sequence entered by the user
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }
    else{
    console.log("failure");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },300);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}

//------------------------------------------------------------------------------------------
//to animate the button when the user clicks
function animatePress(currentColour){
    $(".",currentColour).addClass("pressed");
    setTimeout(function(){
        $(".",currentColour).removeClass("pressed");
    },100);
}
//to play sound of the respective colour
function playSound(name){
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
