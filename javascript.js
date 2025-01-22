const ROCK = "ROCK", PAPER = "PAPER", SCISSORS = "SCISSORS";
const WIN = "WIN", TIE = "TIE", LOSE = "LOSE";
let userWins = 0;
let userLosses = 0;
let computerWins = 0;
let computerLosses = 0;
let ties = 0;

function resetScore() {
    userWins = 0;
    userLosses = 0;
    computerWins = 0;
    computerLosses = 0;
    ties = 0;

    resetRoundResultText();
    updateScoreBoardText();
}

function incrementUserWins() {
    userWins += 1;
}

function incrementUserLosses() {
    userLosses += 1;
}

function incrementComputerWins() {
    computerWins += 1;
}

function incrementComputerLosses() {
    computerLosses += 1;
}

function incrementTies() {
    ties += 1;
}

function setRoundResultText(userSelection, computerSelection, roundResult) {
    let welcomeMessageDiv = document.querySelector(".welcome-message");
    let userSelectionMessageDiv = document.querySelector(".user-selection-message");
    let computerSelectionMessageDiv = document.querySelector(".computer-selection-message");
    let resultMessageDiv = document.querySelector(".result-message");

    welcomeMessageDiv.textContent = "";
    userSelectionMessageDiv.textContent = `You selected ${userSelection}.`;
    computerSelectionMessageDiv.textContent = `Computer selected ${computerSelection}.`;
    resultMessageDiv.textContent = `You ${roundResult}!`;
}

function resetRoundResultText() {
    let welcomeMessageDiv = document.querySelector(".welcome-message");
    let userSelectionMessageDiv = document.querySelector(".user-selection-message");
    let computerSelectionMessageDiv = document.querySelector(".computer-selection-message");
    let resultMessageDiv = document.querySelector(".result-message");

    welcomeMessageDiv.textContent = "Welcome to a game of rock, paper, scissors! Make your selection!";
    userSelectionMessageDiv.textContent = "";
    computerSelectionMessageDiv.textContent = "";
    resultMessageDiv.textContent = "";
}

function updateScoreBoardText() {
    let userWinsScoreDiv = document.querySelector(".user-wins-score");
    let userLossesScoreDiv = document.querySelector(".user-losses-score");
    let tiesScoreDiv = document.querySelector(".ties-score");

    userWinsScoreDiv.textContent = userWins;
    userLossesScoreDiv.textContent = userLosses;
    tiesScoreDiv.textContent = ties;
}

function getHumanChoice() {
    let humanChoice = prompt("Rock, Paper, or Scissors?").toUpperCase();
    while (![ROCK, PAPER, SCISSORS].includes(humanChoice)) {
        humanChoice = prompt("Invalid input. Rock, Paper, or Scissors?");
    }
    return humanChoice;
}

function getComputerSelection() {
    return [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];
}

function getRoundResult(humanChoice, computerSelection) {
    if (humanChoice === computerSelection) {
        return TIE;
    } else {
        if (
            humanChoice === ROCK && computerSelection === SCISSORS ||
            humanChoice === PAPER && computerSelection === ROCK ||
            humanChoice === SCISSORS && computerSelection === PAPER
        ) {
            return WIN;
        } else if (
            humanChoice === ROCK && computerSelection === PAPER ||
            humanChoice === PAPER && computerSelection === SCISSORS ||
            humanChoice === SCISSORS && computerSelection === ROCK
        ) {
            return LOSE;
        }
    }
}

function playRound(e) {
    e.stopPropagation();
    let userSelectedButton = e.target.name;
    let computerSelection = getComputerSelection();
    let roundResult = "";
    let userSelection = "";

    if (userSelectedButton === "userRockButton") {
        roundResult = getRoundResult(ROCK, computerSelection);
        userSelection = ROCK;
    } else if (userSelectedButton === "userPaperButton") {
        roundResult = getRoundResult(PAPER, computerSelection);
        userSelection = PAPER;
    } else if (userSelectedButton === "userScissorsButton") {
        roundResult = getRoundResult(SCISSORS, computerSelection);
        userSelection = SCISSORS;
    } else {
        console.error(`Something went wrong. Expected value of [userRockButton|userPaperButton|userScissorsButton]. Received:\n${e}`);
        return -1;
    }

    switch(roundResult) {
        case WIN:
            incrementUserWins();
            incrementComputerLosses();
            break;
        case LOSE:
            incrementComputerWins();
            incrementUserLosses();
            break;
        case TIE:
            incrementTies();
            break;
    }

    setRoundResultText(userSelection, computerSelection, roundResult);
    updateScoreBoardText();
}

let userOptionsButtons = document.querySelectorAll(".user-option");
let resetScoreButton = document.querySelector(".reset-score-button");

userOptionsButtons.forEach((userOptionsButton) => userOptionsButton.addEventListener("click", playRound));
resetScoreButton.addEventListener("click", resetScore);
