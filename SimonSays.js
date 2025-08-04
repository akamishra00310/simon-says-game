let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "green", "blue", "yellow"];
let highLevel = [];

let highScore = localStorage.getItem("highScore") || 0;


let startSound = new Audio("startMusic.mp3");
startSound.volume = 0.4; 

let backgroundSound = new Audio("backgroundMusic.mp3");

backgroundSound.loop = true;
backgroundSound.volume = 0.04;

let buttonSound = new Audio("button.mp3");
buttonSound.volume = 0.2;

let errorSound = new Audio("error.mp3");
errorSound.volume = 0.1;

h2.innerHTML = `Click start to play <BR> 🏆 High Score: ${highScore}`;


document.getElementById("startBtn").addEventListener("click", function () {
    if (started == false) {
        console.log("Game started");
        started = true;


          startSound.play();
        backgroundSound.play();


        levelup();
        this.style.display = "none"; // hide start button
        document.getElementById("restartBtn").style.display = "inline-block";
    }


});


function gameflash(btn) {
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 400);
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 300);
}
function levelup() {
    userSeq = [];
    level++;


   h2.innerHTML = ` 🏆 High Score ${highScore} <br> Current Level: ${level} `;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);
    gameflash(randomButton);
    gameSeq.push(`${randomColor}`);

    setTimeout(() => buttonSound.play(), 100);



    console.log(gameSeq);


    highLevel.push(level);
}


function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 600);


        }
    }
    else {

        if (level - 1 > highScore) {
            highScore = level - 1;
            localStorage.setItem("highScore", highScore);
        }
        h2.innerHTML = `❌ Game Over!! <br> Score: ${level - 1} | 🏆 High Score: ${highScore} <br><b>Click restart to play again</b>`;

        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function restart() {
            body.style.backgroundColor = "black";
            h2.style.color = "red";
        }, 300);
          errorSound.play();
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        // reset();
        
        document.getElementById("restartBtn").addEventListener("click", function () {
 setTimeout(reset, 1000);
    h2.style.color = "white";
    h2.innerHTML = `Click Start to play <br> 🏆 High Score: ${highScore}`;
    this.style.display = "none"; // restart button gayab
    document.getElementById("startBtn").style.display = "inline-block"; // start wapas aa jaye
});
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);

        buttonSound.play();
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
};
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    
    backgroundSound.pause();
    backgroundSound.currentTime = 0
}