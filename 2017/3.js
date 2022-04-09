
var test1 = { square: 1, ExpectedSteps: 0, actualSteps: null,  };
var test2 = { square: 12, ExpectedSteps: 3, actualSteps: null };
var test3 = { square: 23, ExpectedSteps: 2, actualSteps: null };
var test4 = { square: 1024, ExpectedSteps: 31, actualSteps: null };
var puzzle1 = { square: 325489, ExpectedSteps: 552, actualSteps: null };

/*
runTest(test1);
runTest(test2);
runTest(test3);
runTest(test4);
runTest(puzzle1);
*/

function calculateDistance(input) {
    var square = input.square;
    var maxSquare = 0;
    var squareSize = 0;
    var spirals = 0;
    for(var i = 1; maxSquare < square; i+=2) {
        maxSquare = Math.pow(i, 2);
        squareSize = i;
        spirals += 1;
    }
    var difference = maxSquare - square;

    var bottom = squareSize;
    var left = bottom + (squareSize - 1);
    var top = left + (squareSize - 1);
    var right = top + (squareSize - 1);

    var spiralLocation = right;
    if (difference < bottom) {        
        spiralLocation = bottom;
    }
    else if (difference < left) {
        spiralLocation = left;
    }
    else if (difference < top) {
        spiralLocation = top;
    }
    var outerSpiralMidpoint = (maxSquare-(spiralLocation-spirals));

    var outerSpiralDistance = Math.abs(square-outerSpiralMidpoint);
    var innerSpiralDistance = spirals-1;
    var distanceFromCenter = outerSpiralDistance + innerSpiralDistance;
    return distanceFromCenter;
}

function location(squareSize, square) {
    var maxSquare = Math.pow(squareSize, 2);
    var difference = maxSquare - square;

    var bottom = squareSize;
    var left = bottom + (squareSize - 1);
    var top = left + (squareSize - 1);
    var right = top + (squareSize - 1);

    /*
    if (square === 11) {
        console.log('D: ' + difference + 'Bottom: ' + bottom + 'Left: ' + left);
    }*/

    if (difference < bottom) {
        return 'bottom';
    }
    else if (difference < left) {
        return 'left';
    }
    else if (difference < top) {
        return 'top';
    }
    else {
        return 'right';
    }
}

function runTest(input) {
    var steps = calculateDistance(input);
    input.actualSteps = steps;
    console.log(input);
}

function squareDetails(square) {
    var maxSquare = 0;
    var squareSize = 0;
    var spirals = 0;
    for(var i = 1; maxSquare < square; i+=2) {
        maxSquare = Math.pow(i, 2);
        squareSize = i;
        spirals += 1;
    }
    return {
        maxSquare,
        squareSize,
        spirals
    };
}


function coalesceZero(n) {
    return n == null ? 0 : n;
}

function getArrayValue(array, x, y) {
    if (array[x] == null) {
        return 0;
    }
    if (array[x][y] == null) {
        return 0;
    }
    return array[x][y];
}

function calc(mem, x, y) {
    var sum = 0;
    sum += getArrayValue(mem, x, y+1);
    sum += getArrayValue(mem, x, y-1);

    sum += getArrayValue(mem, x+1, y);
    sum += getArrayValue(mem, x+1, y+1);
    sum += getArrayValue(mem, x+1, y-1);
    
    sum += getArrayValue(mem, x-1, y);
    sum += getArrayValue(mem, x-1, y+1);
    sum += getArrayValue(mem, x-1, y-1);

    //console.log(sum + ' ' + x  + ' ' + y);
    return sum;
}

var mem = [];
var mem_sum = [];
var details = squareDetails(50);

var size = details.squareSize;
for(var i = 0; i < size; i++) {
    var row = [];
    var row_sum = [];
    for(var j = 0; j < size; j++) {
        row.push(0);
        row_sum.push(0);
    }
    mem.push(row);
    mem_sum.push(row_sum);
}

var maxSquare = details.maxSquare;
var spirals = details.spirals;

function fill(memory, x, y, value) {
    if (memory[x][y] !== 0) {
        throw 'X: ' + x + ', Y: ' + y + ' already contains ' + memory[x][y];
    }
    memory[x][y] = value;
}

function populate(memory, memory_sum, x, y, squareNumber) {
    fill(memory, x, y, square++);
    var sum = calc(memory_sum, x, y);
    if (sum > 325489) {
        //console.log(sum);
    }
    fill(memory_sum, x, y, sum);
}


var square = 1;
for(var i = 1; i <= spirals; i++) {
    var width = i * 2 - 1;

    if (i === 1) {
        var center = spirals-1;
        fill(mem, center, center, square++);
        fill(mem_sum, center, center, 1);
    }
    else {
        var xRights = [];
        var yRights = [];
        for(var j = 0; j < width-2; j++) {
            var xRight = (size-1)-(spirals-i)
            var yRight = spirals-i+1+j;
            xRights.push(xRight);
            yRights.push(yRight);
            //console.log('Right X: ' + xRight + ', Y: ' + yRight);   
        }
        yRights.reverse();
        for(var k = 0; k < yRights.length; k++) {
            //fill(mem, yRights[k], xRights[k], square++);
            //var sum = calc(mem_sum, yRights[k], xRights[k]);
            //fill(mem_sum, yRights[k], xRights[k], sum);
            populate(mem, mem_sum, yRights[k], xRights[k], square++);
        }

        for(var j = width-1; j >= 0; j--) {
            var xTop = spirals-i;
            var yTop = spirals-i+j;
            //console.log('Top X: ' + xTop + ', Y: ' + yTop);   
            //fill(mem, xTop, yTop, square++);
            populate(mem, mem_sum, xTop, yTop, square++);
        }
        for(var j = 0; j < width-2; j++) {
            var xLeft = spirals-i;
            var yLeft = spirals-i+1+j;
            //console.log('Left X: ' + xLeft + ', Y: ' + yLeft);
            //fill(mem, yLeft, xLeft, square++);
            populate(mem, mem_sum, yLeft, xLeft, square++);
        }
        for(var j = 0; j < width; j++) {
            var xBottom = spirals-i+j;
            var yBottom = size-(spirals-i+1);
            //console.log('Bottom X: ' + xBottom + ', Y: ' + yBottom);
            //fill(mem, yBottom, xBottom, square++);
            populate(mem, mem_sum, yBottom, xBottom, square++);
        }
    }
}
console.log(mem);
console.log(mem_sum);
