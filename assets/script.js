// Select elements
const mode = document.querySelectorAll(".mode-button");
const buttons = document.querySelectorAll(".game-button");
const scoreArea = document.querySelector(".score-area");
const wins = document.querySelector(".wins");
const losses = document.querySelector(".losses");

// Game logic

let score = { wins: 0, losses: 0 };

function playGame(playerChoice) {
  let choices = [];
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
    alert(`YOU WIN! \nComputer chose ${computerChoice}`);
    score.wins++;
  } else {
    // Computer wins
    alert(`YOU LOSE... \nComputer chose ${computerChoice}`);
    score.wins = 0;
    score.losses++;
  }

  // Update score display
  wins.textContent = score.wins;
  losses.textContent = score.losses;
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
