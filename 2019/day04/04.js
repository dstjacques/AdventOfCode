const { PerformanceObserver, performance } = require('perf_hooks');

function isValidPassword(digits, passwordNumber, onlyDoubleAdjacent) {
    var password = String(passwordNumber).padStart(digits, '0');
    if (password.length !== digits) {
        return false;
    }

    var hasAdjacent = false;
    var hasDecrease = false;
    for(var j = 1; j < password.length; j++) {
        var previous = password[j-1];
        var current = password[j];
        if (previous === undefined) {
            continue;
        }
        if(previous > current) {
            hasDecrease = true;
            break;
        }
        if(previous === current) {
            if (onlyDoubleAdjacent) {
                var next = password[j+1];
                if (next == undefined && password[j-2] !== current) {
                    hasAdjacent = true;
                    
                }
                else if (next != undefined && next !== current) {
                    //console.log(previous + ' ' + current + ' ' + next);
                    hasAdjacent = true;
                    console.log(current + ' ' + next);
                }
            }
            else {
                hasAdjacent = true;
            }
        }
    }
    if (hasAdjacent && !hasDecrease) {
        //console.log(password);
        return true;
    }
    return false;
}

var digits = 6;
var rangeStart = 382345;
var rangeEnd = 843167;
var validPart1 = 0;
var validPart2 = 0;
for(var i = rangeStart; i <= rangeEnd; i++) {
    /*
    if (isValidPassword(digits, i, false)) {
        validPart1 += 1;
    }
    
    if (isValidPassword(digits, i, true)) {
        validPart2 += 1;
    }
    */
    
}

console.log(isValidPassword(6, 777888, true));
return;

tests_part1 = {
    111111: true,
    223450: false,
    123789: false,
    112233: true,
    123444: true,
    111122: true,
    699999: true,
    588999: true,
    234566: true,
    111222: true
}

for(var value in tests_part1) {
    var result = isValidPassword(digits, value, false);
    console.assert(result === tests_part1[value], 'Failed part1 for ' + value);
}

tests_part2 = {
    111111: false,
    223450: false,
    123789: false,
    112233: true,
    123444: false,
    111122: true,
    699999: false,
    588999: true,
    234566: true,
    111222: true
}

for(var value in tests_part2) {
    var result = isValidPassword(digits, value, true);
    console.assert(result === tests_part2[value], 'Failed part2 for ' + value);
}

console.log('Part 1: ' + validPart1);
console.log('Part 2: ' + validPart2);
// 250 is not right
// 300 is too high
// 404 is not right