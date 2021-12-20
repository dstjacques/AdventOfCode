const fs = require('fs');
const { EOL } = require('os');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let input = parseInput(data);

    let lines = input.lines;
    let grid = createGrid(input.columnCount, input.rowCount);

    grid = fillGrid(grid, lines);
    //printGrid(grid);

    let overlaps = countOverlaps(grid, 2);
    console.log(overlaps);
})

function parseInput(data) {
    let input = data.split(EOL);
    let maxX = 0;
    let maxY = 0;

    let lines = [];
    for(let i = 0; i < input.length; i++) {
        let coords = input[i].split(' -> ');
        let coord1 = coords[0].split(',');
        let coord2 = coords[1].split(',');

        let x1 = parseInt(coord1[0]);
        maxX = Math.max(x1, maxX);

        let y1 = parseInt(coord1[1]);
        maxY = Math.max(y1, maxY);

        let x2 = parseInt(coord2[0]);
        maxX = Math.max(x2, maxX);

        let y2 = parseInt(coord2[1]);
        maxY = Math.max(y2, maxY);
        
        lines.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
    }
    return { lines: lines, columnCount: maxX+1, rowCount: maxY+1 };
}

function fillGrid(grid, lines) {
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.x1 === line.x2) {
            let start = Math.min(line.y1, line.y2);
            let end = Math.max(line.y1, line.y2);
            for(let j = start; j <= end; j++) {
                grid[j][line.x1]++;
            }
        }
        else if (line.y1 === line.y2) {
            let start = Math.min(line.x1, line.x2);
            let end = Math.max(line.x1, line.x2);
            for(let j = start; j <= end; j++) {
                grid[line.y1][j]++;
            }
        }
        else if (Math.abs(line.x2-line.x1) === Math.abs(line.y2-line.y1)) {
            let diagonalDistance = Math.abs(line.x2 - line.x1);
            let xDirection = line.x2 - line.x1 < 0 ? -1 : 1;
            let yDirection = line.y2 - line.y1 < 0 ? -1 : 1;
            let x = line.x1;
            let y = line.y1;
            for(var j = 0; j <= diagonalDistance; j++) {
                grid[y + (j * yDirection)][x + (j * xDirection)]++;
            }
        }
    }
    return grid;
}

function createGrid(columnCount, rowCount) {
    let grid = new Array();
    for(let i = 0; i < rowCount; i++) {
        grid.push((new Array(columnCount)).fill(0));
    }
    return grid;
}

function printGrid(grid) {
    for(let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(','));
    }
}

function countOverlaps(grid, overlapValue) {
    let overlaps = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] >= overlapValue) {
                overlaps++;
            }
        }
    }
    return overlaps;
}
// 6127 too low