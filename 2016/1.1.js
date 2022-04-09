var dir = 0;
/*
 0: 'N',
 1: 'E',
 2: 'S',
 3: 'W'
*/
var x = 0;
var y = 0;
var moveX = {
 0: 0,
 1: 1,
 2: 0,
 3: -1
};
var moveY = {
 0: 1,
 1: 0,
 2: -1,
 3: 0
}
var turn = {
 'L': -1,
 'R': 1
}

var inputs = 'R4, R3, L3, L2, L1, R1, L1, R2, R3, L5, L5, R4, L4, R2, R4, L3, R3, L3, R3, R4, R2, L1, R2, L3, L2, L1, R3, R5, L1, L4, R2, L4, R3, R1, R2, L5, R2, L189, R5, L5, R52, R3, L1, R4, R5, R1, R4, L1, L3, R2, L2, L3, R4, R3, L2, L5, R4, R5, L2, R2, L1, L3, R3, L4, R4, R5, L1, L1, R3, L5, L2, R76, R2, R2, L1, L3, R189, L3, L4, L1, L3, R5, R4, L1, R1, L1, L1, R2, L4, R2, L5, L5, L5, R2, L4, L5, R4, R4, R5, L5, R3, L1, L3, L1, L1, L3, L4, R5, L3, R5, R3, R3, L5, L5, R3, R4, L3, R3, R1, R3, R2, R2, L1, R1, L3, L3, L3, L1, R2, L1, R4, R4, L1, L1, R3, R3, R4, R1, L5, L2, R2, R3, R2, L3, R4, L5, R1, R4, R5, R4, L4, R1, L3, R1, R3, L2, L3, R1, L2, R3, L3, L1, L3, R4, L4, L5, R3, R5, R4, R1, L2, R3, R5, L5, L4, L1, L1';

inputs = inputs.split(', ');
for(var i in inputs)
{
 var input = inputs[i];
 var turn_dir = input.substring(0,1);
 var dist = input.substring(1);
 
 var new_dir = (dir + turn[turn_dir]) % 4;
 dir = new_dir >= 0 ? new_dir : 3;
 x += moveX[dir] * dist;
 y += moveY[dir] * dist;
}
console.log(Math.abs(x) + Math.abs(y));
