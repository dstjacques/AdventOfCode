/*
var p = 'abcde'
var input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`;
*/
var p = 'abcdefgh';
var input = `move position 2 to position 1
move position 2 to position 5
move position 2 to position 4
swap position 0 with position 2
move position 6 to position 5
swap position 0 with position 4
reverse positions 1 through 6
move position 7 to position 2
rotate right 4 steps
rotate left 6 steps
rotate based on position of letter a
rotate based on position of letter c
move position 2 to position 0
swap letter d with letter a
swap letter g with letter a
rotate left 6 steps
reverse positions 4 through 7
swap position 6 with position 5
swap letter b with letter a
rotate based on position of letter d
rotate right 6 steps
move position 3 to position 1
swap letter g with letter a
swap position 3 with position 6
rotate left 7 steps
swap letter b with letter c
swap position 3 with position 7
move position 2 to position 6
swap letter b with letter a
rotate based on position of letter d
swap letter f with letter b
move position 3 to position 4
rotate left 3 steps
rotate left 6 steps
rotate based on position of letter c
move position 1 to position 3
swap letter e with letter a
swap letter a with letter c
rotate left 2 steps
move position 6 to position 5
swap letter a with letter g
rotate left 5 steps
reverse positions 3 through 6
move position 7 to position 2
swap position 6 with position 5
swap letter e with letter c
reverse positions 2 through 7
rotate based on position of letter e
swap position 3 with position 5
swap letter e with letter d
rotate left 3 steps
rotate based on position of letter c
move position 4 to position 7
rotate based on position of letter e
reverse positions 3 through 5
rotate based on position of letter h
swap position 3 with position 0
swap position 3 with position 4
move position 7 to position 4
rotate based on position of letter a
reverse positions 6 through 7
rotate based on position of letter g
swap letter d with letter h
reverse positions 0 through 3
rotate right 2 steps
rotate right 6 steps
swap letter a with letter g
reverse positions 2 through 4
rotate based on position of letter e
move position 6 to position 0
reverse positions 0 through 6
move position 5 to position 1
swap position 5 with position 2
rotate right 3 steps
move position 3 to position 1
rotate left 1 step
reverse positions 1 through 3
rotate left 4 steps
reverse positions 5 through 6
rotate right 7 steps
reverse positions 0 through 2
move position 0 to position 2
swap letter b with letter c
rotate based on position of letter d
rotate left 1 step
swap position 2 with position 1
swap position 6 with position 5
swap position 5 with position 0
swap letter a with letter c
move position 7 to position 3
move position 6 to position 7
rotate based on position of letter h
move position 3 to position 0
move position 4 to position 5
rotate left 4 steps
swap letter h with letter c
swap letter f with letter e
swap position 1 with position 3
swap letter e with letter b
rotate based on position of letter e`;

function swapXY(s, x, y)
{
	var a = s.split("");
  var tmp = a[x];
  a[x] = a[y];
  a[y] = tmp;
  return a.join("");
}

function swapLetterXY(s, x, y)
{
	var rx = new RegExp(x, 'g');
  var ry = new RegExp(y, 'g');
	s = s.replace(rx, ":::");
  s = s.replace(ry, x);
  s = s.replace(":::", y);
	return s;
}

function rotateRight(s, x)
{
  for(var i=0; i < x; i++) {
    var middle = s.length - 1;
    var end = s.slice(0, middle);
    var start = s.slice(middle);
    s = start + end;
  }
  return s;
}

function rotateLeft(s, x)
{
  for(var i=0; i < x; i++) {
    var end = s.slice(0, 1);
    var start = s.slice(1);
    s = start + end;
  }
  return s;
}

function rotatePosX(s, x)
{
	var index = s.indexOf(x);
  var rotations = 1 + index;
  if (index > 3) {
  	rotations++;
  }
  return rotateRight(s, rotations);
}

function revXY(s, x, y)
{
  var span = s.slice(x, y+1);
  var rSpan = span.split("").reverse().join("");
  var begin = s.slice(0, x);
  var end = s.slice(y+1);
  return begin + rSpan + end;
}

function moveXY(s, x, y) {
	var c = s[x];
	var r = s.slice(0, x) + s.slice(x+1);
  var a = r.slice(0, y) + c + r.slice(y);
	return a;
}
//console.log(rotateLeft('abcd', 3));
//console.log(revXY('abcdef', 1, 5));
var lines = input.split('\n');
for(var i = 0; i < lines.length; i++)
{
	var line = lines[i];
  var parts = line.split(' ');
  if (parts[0] === 'move') {
  	p = moveXY(p, parseInt(parts[2]), parseInt(parts[5]));
  }
  else if (parts[0] === 'reverse') {
  	p = revXY(p, parseInt(parts[2]), parseInt(parts[4]));
  }
  else if (parts[0] === 'swap') {
  	if (parts[1] === 'position') {
    	p = swapXY(p, parseInt(parts[2]), parseInt(parts[5]));
    }
    else if (parts[1] === 'letter') {
    	p = swapLetterXY(p, parts[2], parts[5]);
    }
  }
  else if (parts[0] === 'rotate') {
  	if (parts[1] === 'right') {
    	p = rotateRight(p, parseInt(parts[2]));
    }
    else if (parts[1] === 'left') {
      p = rotateLeft(p, parseInt(parts[2]));
    }
    else if (parts[1] === 'based') {
    	p = rotatePosX(p, parts[6]);
    }
  }
  console.log(i + " " + p);
}

console.log(p);