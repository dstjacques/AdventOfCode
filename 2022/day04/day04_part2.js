const fs = require('fs');
const {EOL} = require('os');
const { start } = require('repl');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(findOverlappingPairs(data));
})

function findOverlappingPairs(input) {
    let totalFound = 0;
    let pairs = input.split(EOL);

    for(let i = 0; i < pairs.length; i++) {
        if (isOverlappingPair(pairs[i])) {
            totalFound++;
        }
    }
    return totalFound;
}

function isOverlappingPair(pair) {
    let aStart, aEnd, bStart, bEnd;
    [aStart, aEnd, bStart, bEnd] = pair.split(/[-,]/).map(x => parseInt(x));
    
    if (isOverlapping(aStart, aEnd, bStart) || isOverlapping(aStart, aEnd, bEnd) || isOverlapping(bStart, bEnd, aStart) || isOverlapping(bStart, bEnd, aEnd)) {
        return true;
    }
    return false;
}

function isOverlapping(aStart, aEnd, b) {
    if (b >= aStart && b <= aEnd) {
        return true;
    }
    return false;
}