const difficulty = document.getElementById("difficulty");
const color = document.getElementById("color");
const startBtn = document.getElementById("startBtn");

const menu = document.getElementById("menu");
const gameInfo = document.getElementById("gameInfo");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");
const target = document.getElementById("target");

const settings = {
    easy: { size: 60, time: 2.0, spread: 0.18 },
    normal: { size: 45, time: 1.4, spread: 0.40 },
    hard: { size: 30, time: 1.0, spread: 1.0 }
};

let score = 0;
let timeLeft = 0;
let current;
let pos = { x: 0, y: 0 };
let timers = { timeout: null, interval: null };
let started = false;
let firstClick = false;
let over = false;

const rand = (min, max) => Math.random() * (max - min) + min;

function stopTimers() {
    clearTimeout(timers.timeout);
    clearInterval(timers.interval);
    timers.timeout = null;
    timers.interval = null;
}

function setPosition(x, y) {
    pos.x = x;
    pos.y = y;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

function updateTime() {
    timeText.textContent = `Time left for click: ${timeLeft.toFixed(1)}`;
}

function placeTarget() {
    const maxX = gameArea.clientWidth - current.size;
    const maxY = gameArea.clientHeight - current.size;

    let x, y;

    if (difficulty.value === "hard" || !firstClick) {
        x = rand(0, maxX);
        y = rand(0, maxY);
    } else {
        const dx = maxX * current.spread;
        const dy = maxY * current.spread;

        x = rand(Math.max(0, pos.x - dx), Math.min(maxX, pos.x + dx));
        y = rand(Math.max(0, pos.y - dy), Math.min(maxY, pos.y + dy));
    }

    setPosition(x, y);
}

function endGame() {
    if (over) return;
    over = true;
    started = false;
    stopTimers();
    alert(`Time is over! Your score is ${score}.`);
    location.reload();
}

function startRound() {
    stopTimers();
    timeLeft = current.time;
    updateTime();

    timers.interval = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            timeLeft = 0;
            updateTime();
            endGame();
        } else {
            updateTime();
        }
    }, 100);

    timers.timeout = setTimeout(endGame, current.time * 1000);
}

startBtn.addEventListener("click", () => {
    if (!difficulty.value || !color.value) {
        alert("Please choose difficulty and color.");
        return;
    }

    current = settings[difficulty.value];
    score = 0;
    over = false;
    started = true;
    firstClick = false;

    scoreText.textContent = "Score: 0";
    timeText.textContent = "Timer will start after the first click";

    menu.classList.add("hidden");
    gameInfo.classList.remove("hidden");
    gameArea.classList.remove("hidden");

    target.style.width = `${current.size}px`;
    target.style.height = `${current.size}px`;
    target.style.backgroundColor = color.value;
    target.style.display = "block";

    placeTarget();
});

target.addEventListener("click", () => {
    if (!started || over) return;

    if (firstClick) stopTimers();
    firstClick = true;

    score++;
    scoreText.textContent = `Score: ${score}`;

    placeTarget();
    startRound();
});
