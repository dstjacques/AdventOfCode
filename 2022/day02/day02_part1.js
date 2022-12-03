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

let theirPlays = [null, 'A', 'B', 'C']
let myPlays = [null, 'X', 'Y', 'Z']

function scoreGame(plays) {
    let score = 0;
    let theirPlayIndex = theirPlays.indexOf(plays[0]);
    let myPlayIndex = myPlays.indexOf(plays[1]);

    let isMyRockWin = myPlayIndex === 1 && theirPlayIndex === 3;
    let isMyPaperWin = myPlayIndex === 2 && theirPlayIndex === 1;
    let isMyScissorsWin = myPlayIndex === 3 && theirPlayIndex === 2;
    let isDraw = myPlayIndex === theirPlayIndex;
    if (isMyRockWin || isMyPaperWin || isMyScissorsWin) {
        score += 6;
    }
    else if (isDraw) {
        score += 3;
    }

    let pointsForMyPlay = myPlayIndex;
    return score + pointsForMyPlay;
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
