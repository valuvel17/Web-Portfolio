const gameElements = {
  playBtn: document.getElementById("play-game"),
  gameContainer: document.getElementById("bug-game"),
  scoreDisplay: document.getElementById("score"),
  livesDisplay: document.getElementById("lives"),
  finalScore: document.getElementById("final-score"),
  gameOverMsg: document.getElementById("game-over-msg"),
  resetBtn: document.getElementById("reset-btn"),
  squishSound: document.getElementById("squish-sound"),
  gameoverSound: document.getElementById("gameover-sound"),
};

let score = 0;
let lives = 3;
let gameInterval = null;

/* ------------------------------ Event Binding ----------------------------- */

window.onload = () => {
  document.querySelector("#play-game button").onclick = startGame;
  gameElements.resetBtn.onclick = resetGame;
};


/* ------------------------------- Game Logic ------------------------------- */

function startGame() {
  resetStats();
  toggleGameVisibility(true);
  gameInterval = setInterval(spawnBug, 500);
}

function resetStats() {
  score = 0;
  lives = 3;
  updateScore();
  updateLives();
}

function spawnBug() {
  const bug = createBug();
  document.body.appendChild(bug);

  setTimeout(() => {
    if (document.body.contains(bug)) {
      bug.remove();
      decreaseLives();
    }
  }, 1500);
}

function createBug() {
  const bug = document.createElement("span");
  bug.textContent = "🐞";
  bug.className = "bug";
  bug.style.top = `${Math.random() * 80}vh`;
  bug.style.left = `${Math.random() * 90}vw`;

  bug.onclick = () => {
    bug.remove();
    playSound(gameElements.squishSound);
    increaseScore();
  };

  return bug;
}

function increaseScore() {
  score++;
  updateScore();
}

function decreaseLives() {
  lives--;
  updateLives();
  if (lives <= 0) endGame();
}

function endGame() {
  clearInterval(gameInterval);
  removeAllBugs();
  showGameOver();
  playSound(gameElements.gameoverSound);
}

function resetGame() {
  toggleGameVisibility(false);
  hideGameOver();
}

/* ------------------------------- UI Helpers ------------------------------- */

function updateScore() {
  gameElements.scoreDisplay.textContent = `Score: ${score}`;
}

function updateLives() {
  gameElements.livesDisplay.textContent = `Lives: ${lives}`;
}

function toggleGameVisibility(show) {
  gameElements.playBtn.style.display = show ? "none" : "block";
  gameElements.gameContainer.style.display = show ? "block" : "none";
}

function showGameOver() {
  gameElements.finalScore.textContent = score;
  gameElements.gameOverMsg.style.display = "block";
  gameElements.resetBtn.style.display = "inline-block";
}

function hideGameOver() {
  gameElements.gameOverMsg.style.display = "none";
  gameElements.resetBtn.style.display = "none";
}

function removeAllBugs() {
  document.querySelectorAll(".bug").forEach(bug => bug.remove());
}

function playSound(audioElement) {
  audioElement.currentTime = 0;
  audioElement.play();
}

