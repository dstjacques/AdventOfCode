const fs = require('fs');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let timerData = parseInput(data);
    simulate(timerData, days);
    console.log(sum(timerData.count));
})

function parseInput(data) {
    let timerStatus = new Array(defaultFirstStart + 1);
    for(let i = 0; i < timerStatus.length; i++) {
        timerStatus[i] = i;
    }

    let timerCount = new Array(defaultFirstStart + 1).fill(0);
    let input = data.split(',').map(x => parseInt(x));
    for(let i = 0; i < input.length; i++) {
        timerCount[input[i]]++;
    }

    let timerData = { status: timerStatus, count: timerCount };
    return timerData;
}

let defaultFirstStart = 8;
let defaultNextStart = 6;
let days = 256

function simulate(timerData, days) {
    for(let i = 0; i < days; i++) {
        //console.log(`Before day ${i+1}: ${timerData.count}`);
        processDay(timerData);
        //console.log(`After day ${i+1}: ${timerData.count}`);
    }
}

function processDay(timerData) {
    let expiredTimers = timerData.count.shift();
    timerData.count[defaultNextStart] += expiredTimers;
    timerData.count.push(expiredTimers);
}

function sum(array) {
    const addition = (p, c) => p + c;
    return array.reduce(addition);
}