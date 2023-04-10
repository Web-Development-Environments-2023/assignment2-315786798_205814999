import BulletController from "./BulletController.js";
import EnemyController from "./EnemyController.js"
import Player from "./player.js";

const canvas = document.getElementById('thegame')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 500;

const playerVelocity = 6;
const bulletLimit = 10;
const bulletColor = "green";
const enemyBulletColor = "red";

let playerBulletController = new BulletController(canvas,bulletLimit,bulletColor,true);
let enemyBulletController = new BulletController(canvas,4,enemyBulletColor,false);
let enemy = new EnemyController(canvas,enemyBulletController,playerBulletController);
let player = new Player(canvas,playerVelocity, playerBulletController);

let runGame = false;
let isGameOver = false;
let win = false;

let timerObj = document.getElementById("time");
let chosenTimerValue = 120;
let isFormSubmitted = false;
let currentTimer = 120;
let gameInterval;
let timerInterval;
const maxLives = 3;
let livesLeft = maxLives;
let gameOverMessage = "";
let lastAddedScore = [];
let highScores = [];
let gameMusic = new Audio("audio/background-music.mp3");
let gotHitSound = new Audio("audio/gothit.mp3");
let loseGameSound = new Audio("audio/losegame.wav");
gameMusic.volume = 0.5;
gotHitSound.volume = 0.5;
loseGameSound.volume = 0.5;



function displayHighScore(message){

    ctx.textAlign = "center";
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(gameOverMessage, canvas.width/2, 30);
    
    ctx.fillText("Score", canvas.width/2 - 150, 60);
    ctx.fillText("Date", canvas.width/2 + 50, 60);
    
    highScores.sort((a,b) => b[0]-a[0]);
    
    for (let i = 0; i < highScores.length; i++) {
        ctx.fillStyle = "white";
        let score = highScores[i][0];
        let date = new Date(highScores[i][1]).toLocaleString();
        if(score==lastAddedScore[0]&&date==lastAddedScore[1]){
            ctx.fillStyle = "yellow";
            score = "New->"+score;
        }               
        ctx.fillText(score, canvas.width/2 - 160, 100 + i * 30);
        ctx.fillText(date, canvas.width/2 + 50, 100 + i * 30);
    }
    
}


document.getElementById("config-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // code to submit the form
    isFormSubmitted = true;
    chosenTimerValue = parseInt(timerObj.textContent, 10);
    resetGame();
});


var resetBtn = document.getElementById("resetButton");
resetBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("keydown", function(e) {
    e.preventDefault();
  });

function resetGame(){
    stopGame();
    playerBulletController = new BulletController(canvas,bulletLimit,bulletColor,true);
    enemyBulletController = new BulletController(canvas,4,enemyBulletColor,false);
    enemy = new EnemyController(canvas,enemyBulletController,playerBulletController);
    player = new Player(canvas,playerVelocity, playerBulletController);
    startGame();
}

function shouldGameRun(){
    if(isFormSubmitted && localStorage.getItem('isLoggedIn') == 'true'){
        if(localStorage.getItem('resthighscores') == 'true'){
            localStorage.setItem('resthighscores', 'false');
            highScores.length = 0;
        }
        return true;
    }
    
    stopGame();    
    return false;
}

function game(){
    //ctx.drawImage(background,0,0,canvas.width,canvas.height);
    if(shouldGameRun()){

        updateScore();
        checkGameOver();
        displayGameOver();
        if(!isGameOver){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            enemy.draw(ctx);
            player.draw(ctx);
            playerBulletController.draw(ctx);
            enemyBulletController.draw(ctx);
        }   
    }       
}

function displayGameOver(){
    if(isGameOver){   
        displayHighScore("Something something");
    }
}

function startGame(){
    document.getElementById("lives").textContent = maxLives;
    livesLeft = maxLives;
    currentTimer = chosenTimerValue;
    time.textContent = currentTimer;
    isGameOver=false;

    gameInterval = setInterval(game, 1000/60);
    timerInterval = setInterval(updateTimer, 1000);
    gameMusic.currentTime=0;
    gameMusic.play();

}

function gotHit(reposition=false){
    gotHitSound.currentTime=0;
    gotHitSound.play();
    livesLeft--;
    document.getElementById("lives").textContent = livesLeft;
    if(reposition)
        player.reposition();
}

function addHighScore(score){ 
    lastAddedScore = [score,new Date(new Date()).toLocaleString()];
    highScores.push(lastAddedScore);
}

function stopGame(){
    gameMusic.pause();
    clearInterval(timerInterval);
    clearInterval(gameInterval);
}

function checkGameOver(){
    if(isGameOver){
        return;
    }
    let score = parseInt(document.getElementById("score").textContent, 10);
    if(enemyBulletController.collideWith(player)){
        if(livesLeft <= 1){
            isGameOver=true;
            gameOverMessage = "YOU LOSE!";
            gotHit();
            addHighScore(document.getElementById("score").textContent);
            stopGame()
            loseGameSound.play();
        }else{
            gotHit(true);
        }
        
    }
    if(enemy.enemyRows.length === 0){
        win=true;
        isGameOver=true;
        gameOverMessage = "CHAMPION!";
        addHighScore(document.getElementById("score").textContent);
        stopGame()
    }
    if(currentTimer <= 0){
        win=false;    
        if(score < 100){
            gameOverMessage="You can do better!";
        }else{
            gameOverMessage="Winner!";
        }
        isGameOver=true;
        addHighScore(document.getElementById("score").textContent);
        stopGame()
    }
    
}

function updateScore(){
    document.getElementById("score").textContent = enemy.totalScore;
}

function updateTimer(){
    if(shouldGameRun()){
        currentTimer -= 1;
        time.textContent = currentTimer;
    }   
}

  

