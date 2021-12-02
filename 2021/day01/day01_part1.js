const fs = require('fs');
const {EOL} = require('os');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(countIncreases(data));
})

function countIncreases(sequence) {
    let measurements = sequence.split(EOL);
    let previous = Number.MAX_SAFE_INTEGER;
    let increases = 0;
    for(let next of measurements) {
        next = parseInt(next);
        if (next > previous) {
            increases++;
        }
        previous = next;
    }
    return increases;
}
