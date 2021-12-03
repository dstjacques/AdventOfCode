const fs = require('fs');
const { EOL } = require('os');
const { Z_ASCII } = require('zlib');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(calculatePowerConsumption(data));
})

function calculatePowerConsumption(data) {
    let numbers = data.split(EOL);
    let commonBits = findCommonBitArray(numbers);

    let gammaRateBinaryArray = commonBitsToBinaryArray(commonBits);
    let gammaRate = parseInt(gammaRateBinaryArray.join(''), 2);

    let epsilonRateBinary = inverseBitArray(gammaRateBinaryArray);
    let epsilonRate = parseInt(epsilonRateBinary.join(''), 2);

    return gammaRate * epsilonRate;
}

function findCommonBitArray(numbers) {
    var commonBits = [];
    for (var i = 0; i < numbers.length; i++) {
        var number = numbers[i];
        for (var j = 0; j < number.length; j++) {
            if (!commonBits[j]) {
                commonBits[j] = 0;
            }
            number[j] == '1' ? commonBits[j]++ : commonBits[j]--;
        }
    }
    return commonBits;
}

function commonBitsToBinaryArray(commonBits) {
    return commonBits.map(x => x >= 0 ? '1' : '0');
}

function inverseBitArray(bitArray) {
    return bitArray.map(x => x == '1' ? '0' : '1');
}