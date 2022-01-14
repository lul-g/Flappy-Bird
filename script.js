var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var game = document.getElementById("game");
var gameOver = document.getElementById("gameOver");
var score = document.getElementById("score").textContent;

var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 200) + 300);
    hole.style.top = random + "px";
    counter++;
});

//functions
function startGame() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);
    if ((characterTop > 420) || ((blockLeft < 70) && (blockLeft > 0) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        alert("GAME OVER! \nScore:" + score)
        character.style.top = 100 + "px";
        counter = 0;
        score = counter;
        audio6.pause();
        audio6.currentTime = 0;
        clearInterval(startGame);
    }
}

var gameOverInterval = setInterval(function() { startGame() }, 10);

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function() {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 3) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

var initialTime = setInterval(function() {
    document.getElementById("score").textContent = score;
    prevScore = score;
    score++;
    clearInterval(initialTime);

}, 1000);

var scoreCounter = setInterval(function () {
    document.getElementById("score").textContent = score;
    score++;
}, 2000)

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        jump();
        audio6.play();
        game.style.backgroundImage = "url(intergalacticbackground.png)";
        game.style.backgroundSize = "cover";
        gameOverInterval = setInterval(gameOver, 10);
        scoreInterval = setInterval(y(), 2000);
    }
}


//audio
var audio6 = new Audio(
    "https://cdn.glitch.com/9129ceae-eb17-46e3-bc25-e775df6de83c%2FELECTRONIC1.mp3?v=1616558675459"
);