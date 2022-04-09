from bidict import bidict
import time
from pathlib import Path

t1 = 0
t2 = 0
t3 = 0
t4 = 0
def dance(program_count, moves, count):
    i = 0
    programs = [chr(x+97) for x in range(0, program_count)]
    programs = ''.join(programs)
    while i < count:
        programs = perform_dance(programs, moves)
        i += 1
    return programs

def perform_dance(programs, moves):
    for i in range(0, len(moves)):
        programs = process_move(programs, moves[i])
    return programs

def process_move(programs, move):
    operation = move[0]
    arguments = move[1:]
    global t1, t2, t3
    s = time.time()
    if operation == 's':
        programs = spin(programs, int(arguments))
        t1 += time.time()-s
    else:
        argument1, argument2 = arguments.split('/')
        if operation == 'x':
            programs = exchange(programs, int(argument1), int(argument2))
            t2 += time.time()-s
        elif operation == 'p':
            programs = partner(programs, argument1, argument2)
            t3 += time.time()-s

    #print programs
    return programs

def spin(programs, count):
    #print 'spin %d' % count
    return programs[-count:] + programs[0:len(programs)-count]



def exchange(programs, position1, position2):
    #print 'ex %d %d' % (position1, position2)
    A = programs[position1]
    B = programs[position2]
    if position1 < position2:
        programs = programs[:position1] + B + programs[position1+1:position2] + A + programs[position2+1:]
    else:
        programs = programs[:position1] + A + programs[position1+1:position2] + B + programs[position2+1:]

    #programs = programs[:position1] + B + programs[position1+1:]
    #programs = programs[:position2] + A + programs[position2+1:]
    return programs
    

def partner(programs, name1, name2):
    #print 'part %s %s' % (name1, name2)
    position1 = programs.find(name1)
    position2 = programs.find(name2)
    return exchange(programs, position1, position2)

MOVES_TEST = ['s1','x3/4','pe/b']
#print(dance(5, MOVES_TEST, 1))

MOVES_PUZZLE = Path('16.puzzle.txt').read_text().split(',')
#print(dance(16, MOVES_PUZZLE, 1))
#print(dance(16, MOVES_PUZZLE, 2))

#print(dance(16, MOVES_PUZZLE, 100))

#print(t1)
#print(t2)
#print(t3)
#print(t4)

a = bidict()
a[1] = 'a'

#s = time.time()
#programs = 'abcde'
for i in range(0, 10000000):
    b = a.inv['a']
    #a = 'abcde'.replace('a', 'e')
    #programs = spin(programs, 2)
#print(time.time()-s)