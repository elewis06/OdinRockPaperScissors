const ROCK = "ROCK", PAPER = "PAPER", SCISSORS = "SCISSORS";

function getHumanChoice() {
    let humanChoice = prompt("Rock, Paper, or Scissors?").toUpperCase();
    while (![ROCK, PAPER, SCISSORS].includes(humanChoice)) {
        humanChoice = prompt("Invalid input. Rock, Paper, or Scissors?");
    }
    return humanChoice;
}

function getComputerChoice() {
    return [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];
}

function getRoundResult(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return 0;
    } else {
        if (
            humanChoice === ROCK && computerChoice === SCISSORS ||
            humanChoice === PAPER && computerChoice === ROCK ||
            humanChoice === SCISSORS && computerChoice === PAPER
        ) {
            return 1;
        } else if (
            humanChoice === ROCK && computerChoice === PAPER ||
            humanChoice === PAPER && computerChoice === SCISSORS ||
            humanChoice === SCISSORS && computerChoice === ROCK
        ) {
            return -1;
        }
    }
}

function playRound() {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();
    let roundResult = getRoundResult(humanChoice, computerChoice);

    console.log(`You play ${humanChoice}. Computer plays ${computerChoice}.`);

    switch(roundResult) {
        case 0:
            console.log(`${humanChoice} matches ${computerChoice}. No winner!`);
            break;
        case 1:
            console.log(`${humanChoice} beats ${computerChoice}. You win!`);
            break;
        case -1:
            console.log(`${computerChoice} beats ${humanChoice}. You lose!`);
            break;
    }

    return roundResult;
}

function playGame() {
    let numRounds = 5;
    let humanScore = 0;
    let computerScore = 0;

    for (let round = 1; round <= numRounds; round++) {
        let roundResult = playRound();
        if (roundResult == 1) {
            humanScore++;
        } else if (roundResult == -1) {
            computerScore++;
        }
    }

    if (humanScore > computerScore) {
        console.log(`Your score: ${humanScore}. Computer score: ${computerScore}. You Win!`);
    } else if (humanScore < computerScore) {
        console.log(`Your score: ${humanScore}. Computer score: ${computerScore}. You lost!`);
    } else {
        console.log(`Your score: ${humanScore}. Computer score: ${computerScore}. You tied!`);
    }
}

playGame();
