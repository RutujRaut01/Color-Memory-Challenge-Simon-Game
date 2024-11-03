var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function()
{
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    animatePress(userChoosenColour);
    playSound(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

var level = 0;
var start = false;

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(mycolour)
{
    var targetClass =  $("."+mycolour);
    targetClass.addClass("pressed");
    setTimeout(function()
    {
        targetClass.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
    {
        $("body").removeClass("game-over");
    },1000);
        $("h1").text("Press Any Key to Restart.");
    }

}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(function()
{
    if(!start)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
}
);

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    var className = "."+randomChoosenColour;

    $(className).animate({opacity: 0.1}, 100)
                       .animate({opacity: 1}, 100)
                       .animate({opacity: 0.1}, 100)
                       .animate({opacity: 1}, 100);
    playSound(randomChoosenColour);

}

function handler(id)
{
    userChoosenColour = id;
    playSound(userChoosenColour);
}

