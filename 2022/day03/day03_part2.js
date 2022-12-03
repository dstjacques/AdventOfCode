const { match } = require('assert');
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

function findMatches(one, two) {
    let matches = [];
    for(let i in one) {
        for(let j in two) {
            let f = one[i];
            let s = two[j];
            if (f === s) {
                matches.push(f);
            }
        }
    }
    return matches;
}

function calcScore(c) {
    let code = c.charCodeAt(0);
    if (code >= 95) {
        return code - 96;
    }
    else {
        return code - 38;
    }
}

function findBadge(sackOne, sackTwo, sackThree) {
    let matchesOneTwo = findMatches(sackOne, sackTwo);
    let matchesTwoThree = findMatches(sackTwo, sackThree);
    let sackMatchOneTwo = matchesOneTwo.join('');
    let sackMatchTwoThree = matchesTwoThree.join('');

    let matchesAll = findMatches(sackMatchOneTwo, sackMatchTwoThree).join('');
    return calcScore(matchesAll[0]);
}

function rucksacks(input) {
    let total = 0;
    let rucksacks = input.split(EOL);

    let done = 0;
    while(done < rucksacks.length) {
        total += findBadge(rucksacks[done], rucksacks[done+1], rucksacks[done+2]);
        done += 3;
    }
    return total;
}
