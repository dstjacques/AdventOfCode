#!/usr/bin/env python3
import sys

def manhattan_distance(p, q):
    return abs(p[0] - q[0]) + abs(p[1] - q[1])

coords = []
max = -1
for line in sys.stdin:
    x, y = [int(x) for x in line.strip().replace(' ', '').split(',')]
    coords.append([x, y])
    if x > max:
        max = x
    if y > max:
        max = y

size = max+1
grid = [['' for x in range(0, size)] for y in range(0, size)]
for j in range(0, size):
    for i in range(0, size):
        min_char = None
        min_dist = None
        char = 65
        for q in coords:
            p = [i, j]
            distance = manhattan_distance(p, q)
            if distance == 0:
                min_char = chr(char).upper()
                break
            elif min_dist == None or distance < min_dist:
                min_dist = distance
                min_char = chr(char).lower()
            elif distance == min_dist:
                #if j == 4 and i == 4:
                    #print(">>" + min_char)
                    #print(">>" + chr(char))
                    #print(">>" + str(distance))
                min_char = '.'
            char += 1
        #print("%d %d" % (i, j))
        grid[j][i] = min_char
        #print(min_char, end='')
    #print()

print()

infinite_coords = set([])
area_sizes = [0] * size

row_index = 0
for row in grid:
    first_column = row[0]
    infinite_coords.add(first_column.upper())

    last_column = row[size-1]
    infinite_coords.add(last_column.upper())

    for col in row:
        if row_index == 0:
            infinite_coords.add(col.upper())

        if row_index == size-1:
            infinite_coords.add(col.upper())

        if len(area_sizes) <= ord(col.upper())-65:
            print(row)
            print(col)
        area_sizes[ord(col.upper())-65] += 1

    row_index += 1

infinite_coords.discard('.')

for i in infinite_coords:
    index = ord(i)-65
    area_sizes[index] = -1

print(sorted(area_sizes, reverse=True)[0])
