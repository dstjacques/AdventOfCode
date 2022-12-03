const fs = require('fs');
const {EOL} = require('os');
const internal = require('stream');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(findLargestSum(data));
})

function findLargestSum(input) {
    let largestSum = 0
    let itemGroups = input.split(EOL+EOL);
    for(let itemGroup of itemGroups) {
        let items = itemGroup.split(EOL);
        let sum = items.map(x => parseInt(x)).reduce((sum, next) => sum + next, 0);
        if (sum > largestSum) {
            largestSum = sum;
        }
    }
    return largestSum;
}
