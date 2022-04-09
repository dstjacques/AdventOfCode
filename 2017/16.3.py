from array import array
from bidict import bidict
import time
from pathlib import Path

t1 = 0
t2 = 0

def dance(program_count, moves, count):
    programs = bidict()
    for i in range(0, program_count):
        programs[i] = chr(i+97)

    i = 0
    spin_count = 0
    while i < count:
        spin_count = perform_dance(programs, moves, spin_count)
        i += 1
    return spin_programs(programs, spin_count)

def spin_programs(programs, spin_count):
    chars = [0 for x in range(0, len(programs))]
    for i in programs.items():
        chars[(i[0]+spin_count)%len(programs)] = i[1]
    return ''.join(chars)

def perform_dance(programs, moves, spin_count):
    for i in range(0, len(moves)):
        spin_count = process_move(programs, moves[i], spin_count)
        #print_programs(programs)
    return spin_count

def process_move(programs, move, spin_count):
    global t1, t2
    operation = move[0]
    arguments = move[1:]
    if operation == 's':
        spin_count += int(arguments)
    else:
        argument1, argument2 = arguments.split('/')
        s = time.time()
        if operation == 'x':
            exchange(programs, int(argument1), int(argument2), spin_count)
            t1 += time.time()-s
        elif operation == 'p':
            partner(programs, argument1, argument2)
            t2 += time.time()-s
    return spin_count

def exchange(programs, position1, position2, spin_count):
    #print('ex %d %d' % (position1, position2))
    spun_position1 = (position1 - spin_count) % len(programs)
    spun_position2 = (position2 - spin_count) % len(programs)
    #A = programs[spun_position1]
    #B = programs[spun_position2]
    #programs[spun_position2] = None
    #programs[spun_position1] = B
    #programs[spun_position2] = A

def partner(programs, name1, name2):
    #print('part %s %s' % (name1, name2))
    #A = programs.inv[name1]
    #B = programs.inv[name2]
    pass
    #programs.inv[name2] = None
    #programs.inv[name1] = B
    #programs.inv[name2] = A

MOVES_TEST = ['s1','x3/4','pe/b']
print(dance(5, MOVES_TEST, 1))

MOVES_PUZZLE = Path('16.puzzle.txt').read_text().split(',')
#print(dance(16, MOVES_PUZZLE, 100))
#print(dance(16, MOVES_PUZZLE, 2))

#print(dance(16, MOVES_PUZZLE, 100))

print(t1)
print(t2)
#print(t3)
#print(t4)

#s = time.time()
#programs = 'abcde'
#for i in range(0, 10000000):
    #b = a.inv['a']
    #a = 'abcde'.replace('a', 'e')
    #programs = spin(programs, 2)
#print(time.time()-s)
a = array('B')
print(a)