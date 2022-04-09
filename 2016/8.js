var input = `rect 1x1
rotate row y=0 by 6
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 4
rect 2x1
rotate row y=0 by 5
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 5
rect 4x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 6
rect 4x1
rotate row y=0 by 4
rotate column x=0 by 1
rect 3x1
rotate row y=0 by 6
rotate column x=0 by 1
rect 4x1
rotate column x=10 by 1
rotate row y=2 by 16
rotate row y=0 by 8
rotate column x=5 by 1
rotate column x=0 by 1
rect 7x1
rotate column x=37 by 1
rotate column x=21 by 2
rotate column x=15 by 1
rotate column x=11 by 2
rotate row y=2 by 39
rotate row y=0 by 36
rotate column x=33 by 2
rotate column x=32 by 1
rotate column x=28 by 2
rotate column x=27 by 1
rotate column x=25 by 1
rotate column x=22 by 1
rotate column x=21 by 2
rotate column x=20 by 3
rotate column x=18 by 1
rotate column x=15 by 2
rotate column x=12 by 1
rotate column x=10 by 1
rotate column x=6 by 2
rotate column x=5 by 1
rotate column x=2 by 1
rotate column x=0 by 1
rect 35x1
rotate column x=45 by 1
rotate row y=1 by 28
rotate column x=38 by 2
rotate column x=33 by 1
rotate column x=28 by 1
rotate column x=23 by 1
rotate column x=18 by 1
rotate column x=13 by 2
rotate column x=8 by 1
rotate column x=3 by 1
rotate row y=3 by 2
rotate row y=2 by 2
rotate row y=1 by 5
rotate row y=0 by 1
rect 1x5
rotate column x=43 by 1
rotate column x=31 by 1
rotate row y=4 by 35
rotate row y=3 by 20
rotate row y=1 by 27
rotate row y=0 by 20
rotate column x=17 by 1
rotate column x=15 by 1
rotate column x=12 by 1
rotate column x=11 by 2
rotate column x=10 by 1
rotate column x=8 by 1
rotate column x=7 by 1
rotate column x=5 by 1
rotate column x=3 by 2
rotate column x=2 by 1
rotate column x=0 by 1
rect 19x1
rotate column x=20 by 3
rotate column x=14 by 1
rotate column x=9 by 1
rotate row y=4 by 15
rotate row y=3 by 13
rotate row y=2 by 15
rotate row y=1 by 18
rotate row y=0 by 15
rotate column x=13 by 1
rotate column x=12 by 1
rotate column x=11 by 3
rotate column x=10 by 1
rotate column x=8 by 1
rotate column x=7 by 1
rotate column x=6 by 1
rotate column x=5 by 1
rotate column x=3 by 2
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 14x1
rotate row y=3 by 47
rotate column x=19 by 3
rotate column x=9 by 3
rotate column x=4 by 3
rotate row y=5 by 5
rotate row y=4 by 5
rotate row y=3 by 8
rotate row y=1 by 5
rotate column x=3 by 2
rotate column x=2 by 3
rotate column x=1 by 2
rotate column x=0 by 2
rect 4x2
rotate column x=35 by 5
rotate column x=20 by 3
rotate column x=10 by 5
rotate column x=3 by 2
rotate row y=5 by 20
rotate row y=3 by 30
rotate row y=2 by 45
rotate row y=1 by 30
rotate column x=48 by 5
rotate column x=47 by 5
rotate column x=46 by 3
rotate column x=45 by 4
rotate column x=43 by 5
rotate column x=42 by 5
rotate column x=41 by 5
rotate column x=38 by 1
rotate column x=37 by 5
rotate column x=36 by 5
rotate column x=35 by 1
rotate column x=33 by 1
rotate column x=32 by 5
rotate column x=31 by 5
rotate column x=28 by 5
rotate column x=27 by 5
rotate column x=26 by 5
rotate column x=17 by 5
rotate column x=16 by 5
rotate column x=15 by 4
rotate column x=13 by 1
rotate column x=12 by 5
rotate column x=11 by 5
rotate column x=10 by 1
rotate column x=8 by 1
rotate column x=2 by 5
rotate column x=1 by 5`;

var width = 50;
var height = 6;

function rotateCol(screen, col, pixels) {
 var newCol = Array(height).fill(0);
 for(var i=0; i < height; i++) {
  newCol[(i+pixels)%height] = screen[i][col];
 }
 for(var i=0; i < height; i++) {
  screen[i][col] = newCol[i];
 }
 return screen;
}

function rotateRow(screen, row, pixels) {
 var newRow = Array(width).fill(0);
 for(var i=0; i < width; i++) {
  newRow[(i+pixels)%width] = screen[row][i];
 }
 for(var i=0; i < width; i++) {
  screen[row][i] = newRow[i];
 }
 return screen;
}

function rect(screen, wide, tall)
{
 for(var i=0; i < tall; i++) {
  //console.log(i + ' ' + tall);
  if(i === 0 || i+1 === tall) {
   for(var j=0; j < wide; j++)
   {
    screen[i][j] = 1;
   }
  }
  else {
   screen[i][0] = 1;
   screen[i][wide-1] = 1;
   //console.log(wide);
  }
 }
 return screen;
}

var screen = [];
for(var i = 0; i < height; i++)
{
 screen[i] = Array(50).fill(0);
}

/*
screen = rect(screen, 3, 2);
console.table(screen);
screen = rotateCol(screen, 1, 1);
console.table(screen);
screen = rotateRow(screen, 0, 4);
console.table(screen);
screen = rotateCol(screen, 1, 1);
console.table(screen);
*/

var lines = input.split('\n');
var answer = '';
for(var i = 0; i < lines.length; i++)
{
 var parts = lines[i].split(' ');
 if (parts[0] === 'rect')
 {
   var a = parseInt(parts[1].split('x')[0]);
   var b = parseInt(parts[1].split('x')[1]);
   //console.log(a + ' ' +  b);
   screen = rect(screen, a, b);
 }
 else if (parts[1] === 'row')
 {
  var a = parseInt(parts[2].split('=')[1]);
  var b = parseInt(parts[4]);
  //console.log(a + ' ' +  b);
  screen = rotateRow(screen, a, b);
 }
 else if (parts[1] === 'column')
 {
  var a = parseInt(parts[2].split('=')[1]);
  var b = parseInt(parts[4]);
  //console.log(a + ' ' +  b);
  screen = rotateCol(screen, a, b);
 }
 //console.log(parts);
 if (i === 20){
  //break;
 }
}

var count = 0;
for(var i = 0; i < height; i++)
{
 for(var j = 0; j < width; j++)
 {
  if (screen[i][j] === 1)
  {
   count += 1;
   screen[i][j] = '.'
  }
  else {
   screen[i][j] = 1;
  }
 }
}

console.log(count);
console.table(screen);
//console.log(answer);