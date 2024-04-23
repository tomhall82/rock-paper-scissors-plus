// Select elements
const mode = document.querySelectorAll(".mode-button");
const buttons = document.querySelectorAll(".game-button");
const wins = document.querySelector(".wins");
const losses = document.querySelector(".losses");
const highScore = document.querySelector(".high-score");
const changeName = document.querySelector("#change-username");

const winningCombinations = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

let firstVisit = true;

// Game logic

let score = { wins: 0, losses: 0, highScore: 0 };

/**
 * Selects correct array for choices depending on game type
 */
function getUserChoices(gameType) {
  let choices = [];
  if (gameType === "plus") {
    choices = ["rock", "paper", "scissors", "lizard", "spock"];
  } else if (gameType === "traditional") {
    choices = ["rock", "paper", "scissors"];
  } else {
    alert(`Game mode not found`);
  }
  return choices;
}

/**
 * Main game function
 */
function playGame(playerChoice) {
  let playerName = sessionStorage.getItem("playerName");
  let gameType = sessionStorage.getItem("gameType");
  const choices = getUserChoices(gameType);
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  if (playerChoice === computerChoice) {
    // Draw
    alert(`IT'S A DRAW! \nGreat minds think alike ${playerName}!`);
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

// Add event listeners to game buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.type;
    playGame(playerChoice);
  });
});

// Add event listeners to gamemode buttons
mode.forEach((mode) => {
  mode.addEventListener("click", () => {
    const gameType = mode.dataset.type;
    sessionStorage.setItem("gameType", gameType);
  });
});

// Player name display and call function on index page for first time visitors
if (
  (window.location.href.match("index.html") &&
    sessionStorage.getItem("firstVisit") === true) ||
  sessionStorage.getItem("firstVisit") === null
) {
  getName();
  firstVisit = false;
  sessionStorage.setItem("firstVisit", firstVisit);
}

// Get name function
/**
 * Generates an alert box and stores either user input into player name or placeholder in session storage.
 */
function getName() {
  let playerName = prompt(
    "Welcome to Rock, Paper, Scissors Plus! \nPlease enter your Username:",
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
  // Refresh page to make sure latest username shows
  location.replace("index.html");
}

// Change and display name on index page
if (window.location.href.match("index.html")) {
  document.getElementById("player-name").innerHTML =
    sessionStorage.getItem("playerName");
  changeName.addEventListener("click", getName);
}
