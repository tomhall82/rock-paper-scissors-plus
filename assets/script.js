// Select elements
const buttons = document.querySelectorAll(".game-button");
const scoreArea = document.querySelector(".score-area");
const wins = document.querySelector(".wins");
const losses = document.querySelector(".losses");

// Game logic
const choices = ["rock", "paper", "scissors", "lizard", "spock"];
let score = { wins: 0, losses: 0 };

function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  if (playerChoice === computerChoice) {
    // It's a tie
    alert(`IT'S A DRAW!`);
  }

  const winningCombinations = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  if (winningCombinations[playerChoice].includes(computerChoice)) {
    // Player wins
    alert(`YOU WIN! Computer chose ${computerChoice}`);
    score.wins++;
  } else {
    // Computer wins
    alert(`YOU LOSE... Computer chose ${computerChoice}`);
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
