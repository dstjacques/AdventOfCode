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
    let commands = sequence.split(EOL);
    let h = 0;
    let d = 0;
    for (var i = 0; i < commands.length; i++) {
        var parts = commands[i].split(' ');
        console.log(parts);
        if (parts[0] == 'forward') {
            h += parseInt(parts[1]);
        }
        if (parts[0] == 'down') {
            d += parseInt(parts[1]);
        }
        if (parts[0] == 'up') {
            d -= parseInt(parts[1]);
        }
    }
    return h * d;
}
