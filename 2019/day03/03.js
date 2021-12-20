console.log(new Date().toLocaleString())
var centralPortIndex = 0;
var gridSize = 10;
//console.log(new Array(gridSize * gridSize))
// -10  .. -1
// 0 1 2 ... 9
// 1000 1001 ... 1999
// 2000 2001

var sample1Wire1 = 'R8,U5,L5,D3';
var sample1Wire2 = 'U7,R6,D4,L4';
console.log('Sample1: ' + closestIntersectDistance(gridSize, centralPortIndex, sample1Wire1, sample1Wire2));

var sample2Wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
var sample2Wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
console.log('Sample2: ' + closestIntersectDistance(gridSize, centralPortIndex, sample2Wire1, sample2Wire2));

var sample3Wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
var sample3Wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
console.log('Sample3: ' + closestIntersectDistance(gridSize, centralPortIndex, sample3Wire1, sample3Wire2));


function closestIntersectDistance(gridSize, centralPortIndex, wire1, wire2) {
    var indexes1 = getIndexes(gridSize, wire1);
    var indexes2 = getIndexes(gridSize, wire2);

    var intersects = indexes1.filter(function(index) {
        return indexes2.indexOf(index) !== -1;
    });

    var distances = [];
    intersects.forEach(function(intersect) {
        distances.push(manhattanDistance(gridSize, centralPortIndex, intersect))
    }.bind(this));

    console.log(intersects);
    return distances.sort(function(a, b){ return a-b; })[0];
}

function getIndexes(gridSize, wire) {
    var index = 0;
    var indexes = [];
    var moves = wire.split(',');
    for(var i = 0; i < moves.length; i++) {
        var direction = moves[i][0];
        var distance = moves[i].substring(1);
        for(var j = 1; j <= distance; j++) {
            if (direction === 'U') {
                index = up(gridSize, index, 1);
            }
            else if (direction === 'D') {
                index = down(gridSize, index, 1);
            }
            else if (direction === 'L') {
                index = left(gridSize, index, 1);
            }
            else if (direction === 'R') {
                index = right(gridSize, index, 1);
            }
            indexes.push(index);
        }
    }
    return indexes;
}


function up(gridSize, index, distance) {
    return index - (distance * gridSize);
}

function down(gridSize, index, distance) {
    return index + (distance * gridSize);
}

function left(gridSize, index, distance) {
    return index - distance;
}

function right(gridSize, index, distance) {
    return index + distance;
}

function manhattanDistance(gridSize, index1, index2) {
    var distance = 0;
    while(index1 !== index2) {
        if (index2 > index1) {
            if ((index2 - index1) >= gridSize) {
                index1 = down(gridSize, index1, 1);
            }
            else {
                index1 = right(gridSize, index1, 1);
            }
        }
        else if (index2 < index1) {
            if (Math.abs(index2 - index1)+10 > gridSize) {
                index1 = up(gridSize, index1, 1);
            }
            else {
                index1 = left(gridSize, index1, 1);
            }
        }
        distance += 1;
        //console.log(index1);
    }
    return distance;
}

// 0 1 2
// 3 4 5
// 6 7 8