#!/usr/bin/env python3
import sys

lines = []
for line in sys.stdin:
    lines.append(line)

seen = {}
frequency = 0
repeat = None
while repeat == None:
    for line in lines:
        if frequency not in seen:
            seen[frequency] = 1

        frequency = eval("frequency %s" % line)

        if frequency in seen:
            repeat = frequency
            break

print(repeat)