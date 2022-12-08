const fs = require('fs');
const {EOL} = require('os');

fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let result = findVisible(data);
    console.log(countVisible(result));
})

function countVisible(result) {
    let totalVisible = 0;
    let size = result.leftToRightVisible.length;
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            if (result.leftToRightVisible[i][j] || result.rightToLeftVisible[i][j] || result.topToBottomVisible[i][j] || result.bottomToTopVisible[i][j]) {
                totalVisible++;
            }
        }
    }
    return totalVisible;
}

function findVisible(input) {    
    let rows = input.split(EOL).map(x => x.split('').map(y => parseInt(y)));
    let size = rows.length;

    leftToRightVisible = (Array(size).fill([])).map(_ => Array(size).fill(null));
    rightToLeftVisible = (Array(size).fill([])).map(_ => Array(size).fill(null));
    topToBottomVisible = (Array(size).fill([])).map(_ => Array(size).fill(null));
    bottomToTopVisible = (Array(size).fill([])).map(_ => Array(size).fill(null));
    
    for(let i = 0; i < size; i++) {
        let row = rows[i];
        // Find visible cells iterating left-to-right
        leftToRightVisible[i] = findVisibleLeftToRight(row);
        // Find visible right-to-left by reversing the input and then reversing the result
        rightToLeftVisible[i] = findVisibleLeftToRight(row.slice().reverse()).reverse();

        let column = rows.map(x => x[i]);

        // Find visible cells iterating top-to-bottom
        let columnTopToBottomVisible = findVisibleLeftToRight(column);
        // Find visible bottom-to-top by reversing the input and then reversing the result
        let columnBottomToTopVisible = findVisibleLeftToRight(column.slice().reverse()).reverse();
        for(let j = 0; j < size; j++) {
            // Transpose the results into columns instead of rows
            topToBottomVisible[j][i] = columnTopToBottomVisible[j];
            bottomToTopVisible[j][i] = columnBottomToTopVisible[j];
        }
    }
    
    return {
        leftToRightVisible: leftToRightVisible,
        rightToLeftVisible: rightToLeftVisible,
        topToBottomVisible: topToBottomVisible,
        bottomToTopVisible: bottomToTopVisible
    }
}

function findVisibleLeftToRight(row) {
    let isVisible = Array(row.length).fill(null);
    for(let i = 0; i < row.length; i++) {
        isVisible[i] = true;
        if (i === 0) {
        }
        else if (isVisible[i-1] && row[i-1] < row[i]) {
        }
        else {
            for(let j = 0; j < i; j++) {
                if (row[j] >= row[i]) {
                    isVisible[i] = false;
                    break;
                }
            }
        }
    }
    
    return isVisible;
}


