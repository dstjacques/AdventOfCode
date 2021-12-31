const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let positions = parseInput(data);
    let result = recurse(positions, positions);
    console.log(result);
})

function parseInput(data) {
    let input = data.split(',').map(x => parseInt(x));
    return input;
}

function recurse(positions, remaining) {
    if (remaining.length === 1) {
        return sumDifferences(positions, positions.indexOf(remaining[0]));
    }
    let midpoint = Math.floor(remaining.length / 2);
    let left = remaining.slice(0, midpoint);
    let right = remaining.slice(midpoint);

    let leftSum = recurse(positions, left);
    let rightSum = recurse(positions, right);
    return leftSum < rightSum ? leftSum : rightSum;
}

function sumDifferences(positions, target) {
    let addDifference = (p, c) => p + Math.abs(target - c);
    return positions.reduce(addDifference, 0);
}