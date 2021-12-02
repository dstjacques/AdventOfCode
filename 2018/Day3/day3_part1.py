#!/usr/bin/env python3
import sys

def parse_claim(text):
    delimited = text.strip().replace("#", "").replace(" @ ", ",").replace(": ", ",").replace("x", ",").split(",")
    return [int(x) for x in delimited]
    
def get_index(row, col, grid_size):
    return row * grid_size + col

grid_size = 1000
grid = [0] * grid_size * grid_size

for line in sys.stdin:
    [id, col, row, width, height] = parse_claim(line)
    
    for i in range(col, col + width):
        for j in range(row, row + height):
            index = get_index(j, i, grid_size)
            grid[index] += 1

no_claim_count = grid.count(0)
one_claim_count = grid.count(1)

print(len(grid) - no_claim_count - one_claim_count)