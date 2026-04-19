const boardElement = document.getElementById("board");
const movesElement = document.getElementById("moves");
const timerElement = document.getElementById("timer");
const targetElement = document.getElementById("target");
const messageElement = document.getElementById("message");
const newGameBtn = document.getElementById("new-game-btn");
const restartBtn = document.getElementById("restart-btn");

let levels = [];
let currentLevelIndex = -1;
let currentGrid = [];
let initialGrid = [];
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameWon = false;
let lastMove = null;

async function loadLevels() {
  const response = await fetch("./levels.json");
  levels = await response.json();
}

function copyGrid(grid) {
  return grid.map(row => [...row]);
}

function startTimer() {
  stopTimer();
  timer = 0;
  timerElement.textContent = timer;

  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = timer;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetStats() {
  moves = 0;
  movesElement.textContent = moves;
  messageElement.textContent = "";
  gameWon = false;
  lastMove = null;
}

function renderBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add(currentGrid[row][col] === 1 ? "on" : "off");

      cell.addEventListener("click", () => handleCellClick(row, col));
      boardElement.appendChild(cell);
    }
  }
}

function toggleCell(row, col) {
  if (row >= 0 && row < 5 && col >= 0 && col < 5) {
    currentGrid[row][col] = currentGrid[row][col] === 1 ? 0 : 1;
  }
}

function handleCellClick(row, col) {
  if (gameWon) return;

  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);

  if (lastMove && lastMove.row === row && lastMove.col === col) {
    moves--;
    lastMove = null;
  } else {
    moves++;
    lastMove = { row, col };
  }

  if (moves < 0) {
    moves = 0;
  }

  movesElement.textContent = moves;

  renderBoard();
  checkWin();
}

function checkWin() {
  const allOff = currentGrid.every(row => row.every(cell => cell === 0));

  if (allOff) {
    gameWon = true;
    stopTimer();

    const target = levels[currentLevelIndex].target;

    if (moves === target) {
      messageElement.textContent = `You won in minimum moves: ${moves}!`;
    } else {
      messageElement.textContent = `You won in ${moves} moves. Minimum is ${target}.`;
    }
  }
}

function loadLevel(index) {
  currentLevelIndex = index;
  initialGrid = copyGrid(levels[index].grid);
  currentGrid = copyGrid(levels[index].grid);

  targetElement.textContent = levels[index].target;

  resetStats();
  startTimer();
  renderBoard();
}

function startNewGame() {
  if (levels.length === 0) return;

  let availableIndexes = levels.map((_, index) => index);

  if (currentLevelIndex !== -1 && levels.length > 1) {
    availableIndexes = availableIndexes.filter(index => index !== currentLevelIndex);
  }

  const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  loadLevel(randomIndex);
}

function restartGame() {
  if (currentLevelIndex === -1) return;

  currentGrid = copyGrid(initialGrid);
  resetStats();
  startTimer();
  renderBoard();
}

newGameBtn.addEventListener("click", startNewGame);
restartBtn.addEventListener("click", restartGame);

document.addEventListener("DOMContentLoaded", async () => {
  await loadLevels();
  startNewGame();
});
