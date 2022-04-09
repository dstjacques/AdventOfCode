#!/usr/bin/env python3
import sys

def parse_point(line):
    return [int(x) for x in line.strip().replace('position=<', '').replace('> velocity=<', ',').replace('>', '').replace(' ', '').split(',')]

def grid(points, time):
    grid = [['.' for x in range(0, width)] for y in range(0, height)]
    for p in points:
        px = p[0]
        py = p[1]
        vx = p[2] * time
        vy = p[3] * time
        grid[py + vy - grid_offset_y][px + vx - grid_offset_x] = '#'
        break
    return grid

def print_grid(grid):
    index = grid_offset_y
    for row in grid:
        print(str(index).zfill(2) + ' ' + ''.join(row))
        index += 1

min_x = None
min_y = None
max_x = None
max_y = None
points = []
for line in sys.stdin:
    point = parse_point(line)
    points.append(point)

    px = point[0]
    py = point[1]

    if min_x == None or px < min_x:
        min_x = px
    if min_y == None or py < min_y:
        min_y = py

    if max_x == None or px > max_x:
        max_x = px
    if max_y == None or py > max_y:
        max_y = py

width = max_x-min_x + 1
height = max_y-min_y + 1

print(height)
print(width)

grid_offset_x = min_x
grid_offset_y = min_y

rows = grid(points, 3)
print_grid(rows)

