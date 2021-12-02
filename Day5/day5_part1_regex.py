#!/usr/bin/env python3
import sys
import re

capital_first = "|".join(['[' + chr(x + 65) + ']' + '[' + chr(x + 97) + ']' for x in range(0, 26)])
capital_last = "|".join(['[' + chr(x + 97) + ']' + '[' + chr(x + 65) + ']' for x in range(0, 26)])

result = ''
previous = sys.stdin.readline()
while True:
    result = re.sub(capital_first, '', previous)
    result = re.sub(capital_last, '', result)
    if result == previous or result == '':
        break
    previous = result
    #print("<%s> <%s>" % (previous, result))

print(len(result))