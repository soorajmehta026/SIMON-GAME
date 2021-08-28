var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;

$(document).keypress( function (event) {
	// $
	if(!start)
	{
		
		$("#level-title").text("Level " + level);
    	nextSequence();
    	start=true;
	}
});
// ###############################################################################
function startOver() {
	// body...
	level=0;
	start=false;
	gamePattern=[];

}
// ###################################################################################
function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

     
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
			setTimeout(function () {
    		$("body").removeClass("game-over");
  		}, 200);
			$("#level-title").text("Game Over, Press Any Key to Restart");
 			startOver();

    }

}


// ################################################################################
$(".btn").click(function () {
	// body...

	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	
	// console.log(userClickedPattern);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length-1);
});

// ###############################################################################
function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
  	audio.play();
}

//################################################################################
function nextSequence() {
	userClickedPattern=[];
	level++;
	$("#level-title").text("Level "+level);

	var randumNumber=Math.floor(Math.random()*4);
	var randomChosenColor=buttonColors[randumNumber];
	gamePattern.push(randomChosenColor);

	$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
	// checkanswer(level);
	
	
};
// setTimeout(function animatePress(userChosenColour) {
// 	// body...
// 	$(".btn").addClass("pressed");
// },100);
// ################################################################################

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

