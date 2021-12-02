const fs = require('fs');
const {EOL} = require('os');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(countIncreases(data, 3));
})

function countIncreases(sequence, slidingWindowSize) {
    const adder = (x, y) => x + y;

    let measurements = sequence.split(EOL).map(n => parseInt(n));
    let previous = Number.MAX_SAFE_INTEGER;
    let increases = 0;
    for (var i = 0; i < measurements.length; i++) {
        var slidingWindowSum = measurements.slice(i, i + slidingWindowSize).reduce(adder);        
    
        if (slidingWindowSum > previous) {
            increases++;
        }
        previous = slidingWindowSum;
    }
    return increases;
}
