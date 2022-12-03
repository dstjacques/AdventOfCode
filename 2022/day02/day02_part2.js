const fs = require('fs');
const {EOL} = require('os');
const internal = require('stream');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(scoreGames(data));
})

let theirPlays = ['A', 'B', 'C']
let myOutcomes = ['X', 'Y', 'Z']

function scoreGame(plays) {
    let score = 0;
    let theirPlayIndex = theirPlays.indexOf(plays[0]);
    let myOutcomeIndex = myOutcomes.indexOf(plays[1]);

    if (myOutcomeIndex === 1) {
        // Tie points
        score += 3;
        // Tie move points
        score += theirPlayIndex + 1;
    }
    else if (myOutcomeIndex === 2) {
        // Win points
        score += 6;
        // Win move points
        let myMove = (theirPlayIndex + 1) % 3;
        score += myMove + 1;
    }
    else {
        // Lose move points
        let myMove = (theirPlayIndex + 2) % 3;
        score += myMove + 1;
    }
    return score
}

function scoreGames(input) {
    let total = 0;
    let games = input.split(EOL);
    for(let game of games) {
        let plays = game.split(' ');
        total += scoreGame(plays);
    }
    return total;
}
