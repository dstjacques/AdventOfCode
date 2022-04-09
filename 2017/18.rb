=begin
input = <<-INSTRUCTIONS
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
INSTRUCTIONS
=end

input = <<-INSTRUCTIONS
set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 826
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
INSTRUCTIONS

def getRegisterIndex(x)
  return x.ord - 97  
end

def getRegisterValue(registers, y)
  if y.ord >= 97 and y.ord <= 122
    return registers[getRegisterIndex(y)]
  end
  return y.to_i
end

def snd(registers, lastSound, x)
  lastSound[0] = x
end

def rcv(registers, lastSound, x)
  if x != 0
    return true
  end
end

def set(registers, x, y)
  registers[x] = y
end

def add(registers, x, y)
  registers[x] += y
end

def mul(registers, x, y)
  registers[x] *= y
end

def mod(registers, x, y)
  registers[x] %= y
end

def jgz(registers, x, y)
  if registers[x] > 0
    return y
  end
  return nil
end

def process(instructions)
  registers = Array.new(26) { 0 }
  current = [0]
  lastSound = [0]
  while 1 do
    jump = nil
    instruction = instructions[current[0]]
    #print instruction + "\n"
    parts = instruction.split(' ')
    operator = parts[0]
    if parts.length == 2
      operand = getRegisterValue(registers, parts[1])
      done = self.send(operator, registers, lastSound, operand)
      if done == true
        print lastSound[0]
        break
      end
    else
      operand1 = getRegisterIndex(parts[1])
      operand2 = getRegisterValue(registers, parts[2])
      if operator == 'jgz'
        jump = jgz(registers, operand1, operand2)
      elsif
        self.send(operator, registers, operand1, operand2)
      end
    end
    if jump.nil?
      current[0] += 1
    else
      current[0] += jump
    end
    #print instruction
    #print registers
    #print jump
    #print "\n"
    if current[0] < 0 or current[0] >= instructions.length
      break
    end
  end
end

instructions = input.split("\n")
process(instructions)
#print "\n"
