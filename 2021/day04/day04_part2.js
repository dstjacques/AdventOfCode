const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let bingo = parseInput(data);
    let score = playBingo(bingo.boards, bingo.draws);
    console.log(score);
})

function parseInput(data) {
    let lines = data.split (EOL);

    let draws = lines[0].split(',');
    let boards = [];
    let board = [];
    for (let i = 2; i < lines.length; i++) {
        if (lines[i] === '') {
            boards.push(board);
            board = [];
            continue;
        }
        let row = lines[i].split(' ').filter(x => x !== '');
        board.push(row);
    }
    boards.push(board);
    return { draws: draws, boards: boards };
}

function findWinCombos(board) {
    let winCombos = [];
    for (let i = 0; i < board.length; i++) {
        // Add each row as a winning combination
        let row = board[i];
        let rowCombo = new Map(row.map(x => [x, x]));
        winCombos.push(rowCombo);
        
        // Transpose the matrix for column combinations
        let column = new Map();
        for (var j = 0; j < board.length; j++) {
            let number = board[j][i];
            column.set(number, number);
        }
        // Add each column as a winning combinations
        winCombos.push(column);
    }

    return winCombos;
}

function playBingo(boards, draws) {
    let boardWinCombos = [];
    for (let i = 0; i < boards.length; i++) {
        let winCombos = findWinCombos(boards[i]);
        boardWinCombos.push(winCombos);
    }
    
    let winners = new Map();
    for (let i = 0; i < draws.length; i++) {
        for (let j = 0; j < boardWinCombos.length; j++) {
            let draw = draws[i];
            let didWin = updateBoard(boardWinCombos[j], draw);
            if (didWin) {
                winners.set(j, j);
                if (winners.size === boardWinCombos.length) {
                    console.log(`Board ${j} was the last to win when drawing ${draws[i]} on turn ${i}`);
                    return score(boardWinCombos[j], draw);
                }
            }
        }
    }
}

function updateBoard(boardWinCombos, draw) {
    let didWin = false;
    for (let i = 0; i < boardWinCombos.length; i++) {
        var combo = boardWinCombos[i];
        if (combo.has(draw)) {
            let a = combo.delete(draw);
            if (combo.size === 0) {
                didWin = true;
            }
        }
    }

    return didWin;
}

function score(boardCombos, winningDraw) {
    var sum = 0;
    for (var i = 0; i < boardCombos.length; i += 2) {
        var row = boardCombos[i];
        var unmarkedNumbers = Array.from(row.keys()).map(x => parseInt(x));
        var unmarkedSum = unmarkedNumbers.reduce((a, b) => a + b, 0);
        sum += unmarkedSum;
    }
    return sum * winningDraw;
}
