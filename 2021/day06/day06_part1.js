const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let timers = parseInput(data);
    simulate(timers, days);
    console.log(timers.length);
})

function parseInput(data) {
    let input = data.split(',').map(x => parseInt(x));
    return input;
}

let defaultFirstStart = 8;
let defaultNextStart = 6;
let days = 80;

function simulate(timers, days) {
    for(let i = 0; i < days; i++) {
        processDay(timers);
        // console.log(`After day ${i+1}: ${timers.length} (${timers})`);
    }
}

function processDay(timers) {
    let newTimers = 0;
    for(let i = 0; i < timers.length; i++) {
        if (timers[i] === 0) {
            newTimers++;
        }
        timers[i] = processTimer(timers[i]);
    }
    for(let i = 0; i < newTimers; i++) {
        timers.push(defaultFirstStart);
    }
}

function processTimer(timer) {
    let newTimer = --timer;
    if (newTimer === -1) {
        return defaultNextStart;
    }
    return newTimer;
}
