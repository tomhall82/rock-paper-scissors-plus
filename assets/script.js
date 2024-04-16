// Select elements
const mode = document.querySelectorAll(".mode-button");
const buttons = document.querySelectorAll(".game-button");
const scoreArea = document.querySelector(".score-area");
const wins = document.querySelector(".wins");
const losses = document.querySelector(".losses");
const highScore = document.querySelector(".high-score");
const menu = document.querySelectorAll(".menubtn");

// Game logic

let score = { wins: 0, losses: 0, highScore: 0 };

function playGame(playerChoice) {
  let choices = [];
  let playerName = sessionStorage.getItem("playerName");
  let gameType = sessionStorage.getItem("gameType");
  if (gameType === "plus") {
    choices = ["rock", "paper", "scissors", "lizard", "spock"];
  } else if (gameType === "traditional") {
    choices = ["rock", "paper", "scissors"];
  } else {
    alert(`Game mode not found`);
  }
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  console.log("Choices", choices);
  console.log("Gametype", gameType);

  const winningCombinations = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  if (playerChoice === computerChoice) {
    // Draw
    alert(`IT'S A DRAW! \nGreat minds think alike!`);
  } else if (winningCombinations[playerChoice].includes(computerChoice)) {
    // Player wins
    alert(`YOU WIN ${playerName}! \nComputer chose ${computerChoice}`);
    score.wins++;
    // Update high score
    if (score.wins >= score.highScore) {
      score.highScore = score.wins;
    }
  } else {
    // Computer wins
    alert(
      `Sorry ${playerName}, YOU LOSE... \nComputer chose ${computerChoice}`
    );
    score.wins = 0;
    score.losses++;
  }

  // Update score display
  wins.textContent = score.wins;
  losses.textContent = score.losses;
  highScore.textContent = score.highScore;
}

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.type;
    playGame(playerChoice);
  });
});

mode.forEach((mode) => {
  mode.addEventListener("click", () => {
    gameType = mode.dataset.type;
    sessionStorage.setItem("gameType", gameType);
  });
});

// Player name

function getName() {
  let playerName = prompt(
    "Welcome to Rock, Paper, Scissors Plus! \nPlease enter your playerName:",
    ""
  );
  if (playerName == null || playerName == "") {
    alert("Ah, a mysterious stranger... lets play!");
    playerName = "Mysterious Stranger";
    sessionStorage.setItem("playerName", playerName);
  } else {
    alert("Hi " + playerName + "! Lets play!");
    sessionStorage.setItem("playerName", playerName);
  }
}

// Display name on index page
document.getElementById("player-name").innerHTML =
  sessionStorage.getItem("playerName");
