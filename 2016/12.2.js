// 9227731 for 'a' is too high
var program = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 19 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5`

var registers = { 'a': 0, 'b': 0, 'c': 1, 'd': 0 };
var instructions = program.split('\n');

function cpy(registers, source, target)
{
 var value = getValue(registers, source);
 registers[target] = value;
}
function jnz(registers, value, jumpOffset)
{
 var value = getValue(registers, value);
 if (value !== 0)
 {
  return true;
 }
 return false;
}
function inc(registers, register)
{
 registers[register]++;
}
function dec(registers, register)
{
 registers[register]--;
}
function getValue(registers, value)
{
 if (value >= 'a' && value <= 'z')
 {
  return registers[value];
 }
 return parseInt(value);
}

var c = 0;
for(var i = 0; i < instructions.length; i++)
{
 var parts = instructions[i].split(' ');
 var instruction = parts[0];
 var operand1 = parts[1];
 var operand2 = parts.length > 2 ? parts[2] : '';
 
 if (instruction === 'cpy')
 {
  cpy(registers, operand1, operand2);
 }
 else if (instruction === 'jnz')
 {
  if (jnz(registers, operand1, operand2))
  {
   i += (parseInt(operand2) - 1);
  }
 }
 else if (instruction === 'inc')
 {
  inc(registers, operand1);
 }
 else if (instruction === 'dec')
 {
  dec(registers, operand1);
 }
 c++;
 //console.log(registers);
 if (c > 10)
 {
  //break;
 }
}

console.log(registers);