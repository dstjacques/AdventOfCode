const fs = require('fs');
const {EOL} = require('os');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(findSumOfLargestGroups(data, 3));
})

function sumArray(array) {
    return array.reduce((sum, next) => sum + next, 0);
}

function findSumOfLargestGroups(input, numberOfLargestGroups) {
    let largestGroups = Array(numberOfLargestGroups).fill(0)
    let itemGroups = input.split(EOL+EOL);
    for(let itemGroup of itemGroups) {
        let items = itemGroup.split(EOL);
        let sum = sumArray(items.map(x => parseInt(x)));
        let smallestValue = Math.min(...largestGroups);
        if (sum > smallestValue) {
            smallestIndex = largestGroups.indexOf(smallestValue)
            largestGroups[smallestIndex] = sum;
        }
    }
    return sumArray(largestGroups);
}
