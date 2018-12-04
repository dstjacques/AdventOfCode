#!/usr/bin/env python3
import sys

def parse_claim(text):
    delimited = text.strip().replace("#", "").replace(" @ ", ",").replace(": ", ",").replace("x", ",").split(",")
    return [int(x) for x in delimited]
    
def get_index(row, col, grid_size):
    return row * grid_size + col

grid_size = 1000
grid = [None] * grid_size * grid_size

claim_overlaps = {}
for line in sys.stdin:
    [id, col, row, width, height] = parse_claim(line)
    if id not in claim_overlaps:
        claim_overlaps[id] = False

    for i in range(col, col + width):
        for j in range(row, row + height):
            index = get_index(j, i, grid_size)

            if grid[index] == None:
                grid[index] = []
            grid[index].append(id)

            visits = len(grid[index])
            if visits > 1:
                for k in range(0, visits):
                    visitor = grid[index][k]
                    claim_overlaps[visitor] = True

for claim_id, overlaps in claim_overlaps.items():
    if not overlaps:
        print(claim_id)