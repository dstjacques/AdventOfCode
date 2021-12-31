const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let positions = parseInput(data);
    let costs = buildCosts(Math.max(...positions));
    let result = recurse(positions, 0, positions.length, costs);
    console.log(result);
})

function parseInput(data) {
    let input = data.split(',').map(x => parseInt(x));
    return input;
}

function buildCosts(max) {
    let costs = [0];
    for(var i = 1; i <= max; i++) {
        costs[i] = costs[i-1] + i;
    }
    return costs;
}

function recurse(positions, minIndex, maxIndex, costs) {
    let remaining = positions.slice(minIndex, maxIndex);
    if (remaining.length === 1) {
        return sumDifferences(positions, minIndex, costs);
    }
    let midpoint = minIndex + Math.floor(remaining.length / 2);
    let leftMinIndex = minIndex;
    let leftMaxIndex = midpoint;
    let rightMinIndex = midpoint;
    let rightMaxIndex = maxIndex;
    let leftSum = recurse(positions, leftMinIndex, leftMaxIndex, costs);
    let rightSum = recurse(positions, rightMinIndex, rightMaxIndex, costs);
    return leftSum < rightSum ? leftSum : rightSum;
}

function sumDifferences(positions, target, costs) {
    let addDifference = (p, c) => p + costs[Math.abs(target - c)];
    result = positions.reduce(addDifference, 0);
    return result;
}