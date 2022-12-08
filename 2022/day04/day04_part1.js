const fs = require('fs');
const {EOL} = require('os');
const { start } = require('repl');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(findFullyContainedPairs(data));
})

function findFullyContainedPairs(input) {
    let totalFound = 0;
    let pairs = input.split(EOL);

    for(let i = 0; i < pairs.length; i++) {
        if (isFullyContainedPair(pairs[i])) {
            totalFound++;
        }
    }
    return totalFound;
}

function isFullyContainedPair(pair) {
    let aStart, aEnd, bStart, bEnd;
    [aStart, aEnd, bStart, bEnd] = pair.split(/[-,]/).map(x => parseInt(x));
    
    if (isFullyContained(aStart, aEnd, bStart, bEnd) || isFullyContained(bStart, bEnd, aStart, aEnd)) {
        return true;
    }
    return false;
}

function isFullyContained(aStart, aEnd, bStart, bEnd) {
    if (bStart >= aStart && bEnd <= aEnd) {
        return true;
    }
    return false;
}