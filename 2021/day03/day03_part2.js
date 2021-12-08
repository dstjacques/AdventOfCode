const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(calculateLifeSupportRating(data));
})

function calculateLifeSupportRating(data) {
    let numbers = data.split(EOL);

    let allIndexes = numbers.map((val, index) => index);
    let majority = allIndexes;
    let minority = allIndexes;

    let index = 0;
    while (1) {
        majority = splitByCommonBit(numbers, majority, index).majority;
        minority = splitByCommonBit(numbers, minority, index).minority;
        if (majority.length === 1 && majority.length === 1) {
            break;
        }
        index++;
    }

    let oxygenGeneratorRatingIndex = majority[0];
    let oxygenGeneratorRatingBinary = numbers[oxygenGeneratorRatingIndex];
    let oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
    let CO2ScrubberRatingIndex = minority[0];
    let CO2ScrubberRatingBinary = numbers[CO2ScrubberRatingIndex];
    let CO2ScrubberRating = parseInt(CO2ScrubberRatingBinary, 2);
    
    let lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;
    return lifeSupportRating;
}

/**
 * 
 * @param {Array.<string>} numbers Full dataset being analyzed
 * @param {Array.<number>} numberIndexes Indexes of the entries that should be considered for splitting
 * @param {number} bitIndex Position of the bit that should be used for splitting
 * @returns An array of indexes for the numbers that have the most common bit value at that index (majority) and an array for the least common bit value at that index (minority)
 */
function splitByCommonBit(numbers, numberIndexes, bitIndex) {
    if (numberIndexes.length === 1) {
        return { majority: numberIndexes, minority: numberIndexes }
    }

    var zeroIndexes = [];
    var oneIndexes = [];
    for (var i = 0; i < numberIndexes.length; i++) {
        let numberIndex = numberIndexes[i];
        let number = numbers[numberIndex];
        let bit = number[bitIndex];
        if (bit === '0') {
            zeroIndexes.push(numberIndex);
        }
        else if (bit === '1') {
            oneIndexes.push(numberIndex);
        }
    }

    if (oneIndexes.length >= zeroIndexes.length) {
        let o = { majority: oneIndexes, minority: zeroIndexes };
        return o;
    }
    let o = { majority: zeroIndexes, minority: oneIndexes };
    return o;
}
