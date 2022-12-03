const fs = require('fs');
const {EOL} = require('os');
const internal = require('stream');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(rucksacks(data));
})

function rucksack(line) {
    let half = line.length/2;
    let first = line.substring(0, half);
    let second = line.substring(half);

    for(let i in first) {
        for(let j in second) {
            let f = first[i];
            let s = second[j];
            if (f === s) {
                let code = f.charCodeAt(0);
                if (code >= 95) {
                    return code - 96;
                }
                else {
                    return code - 38;
                }
            }
        }
    }
}

function rucksacks(input) {
    let total = 0;
    let games = input.split(EOL);
    for(let game of games) {
        total += rucksack(game);
    }
    return total;
}
