#!/usr/bin/env python3
import sys

frequency = 0
for line in sys.stdin:
    frequency = eval("frequency %s" % line)

print(frequency)