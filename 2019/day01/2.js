   

function updateNounVerb(intcode, nounValue, verbValue) {
    intcode[1] = nounValue;
    intcode[2] = verbValue;
    return intcode;
}

function to1202ProgramAlarm(intcode) {
    return updateNounVerb(intcode, 12, 2);
}

function toIntcode(intcodeString) {
    var intcode = intcodeString.split(',').map(x => parseInt(x));
    return intcode;
}

function runIntcode(intcode) {
    var index = 0;
    while(1) {
        var opcode = intcode[index];
        if (opcode === 99) {
            break;
        }
        else if (opcode === 1 || opcode === 2) {
            var inputIndex1 = intcode[index + 1];
            var inputIndex2 = intcode[index + 2];
            var outputIndex = intcode[index + 3];
            if (opcode === 1) {
                intcode[outputIndex] = intcode[inputIndex1] + intcode[inputIndex2];
            }
            else if (opcode === 2) {
                intcode[outputIndex] = intcode[inputIndex1] * intcode[inputIndex2];
            }
        }

        index += 4;
    }
    return intcode[0];
}

function findNounVerb(intcode, expectedOutput, minNounVerb, maxNounVerb) {
    for(var i = minNounVerb; i <= maxNounVerb; i++){
        var noun = i;
        for(var j = minNounVerb; j <= maxNounVerb; j++) {
            var verb = j;
            var code = intcode.slice(0);
            var output = runIntcode(updateNounVerb(code, noun, verb))
            if (output === expectedOutput) {
                return 100 * noun + verb;
            }
        }
    }
}

console.assert(runIntcode(toIntcode('1,0,0,0,99')) === 2, 'runIntcode 1,0,0,0,99');
console.assert(runIntcode(toIntcode('2,3,0,3,99')) === 2, 'runIntcode 2,3,0,3,99');
console.assert(runIntcode(toIntcode('2,4,4,5,99,0')) === 2, 'runIntcode 2,4,4,5,99,0');
console.assert(runIntcode(toIntcode('1,1,1,4,99,5,6,0,99')) === 30, 'runIntcode 1,1,1,4,99,5,6,0,99');

var input = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,19,9,23,1,23,13,27,1,10,27,31,2,31,13,35,1,10,35,39,2,9,39,43,2,43,9,47,1,6,47,51,1,10,51,55,2,55,13,59,1,59,10,63,2,63,13,67,2,67,9,71,1,6,71,75,2,75,9,79,1,79,5,83,2,83,13,87,1,9,87,91,1,13,91,95,1,2,95,99,1,99,6,0,99,2,14,0,0';

console.log('Part 1: ' + runIntcode(to1202ProgramAlarm(toIntcode(input))));

console.log('Part 2: ' + findNounVerb(toIntcode(input), 19690720, 0, 99));
