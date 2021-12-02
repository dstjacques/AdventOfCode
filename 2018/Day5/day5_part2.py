#!/usr/bin/env python3
import sys

class Character:
    value = None
    prev = None
    next = None

def remove_units(polymer, unit_type):
    first = None
    previous = None

    polymer = polymer.replace(unit_type.lower(), '')
    polymer = polymer.replace(unit_type.upper(), '')
    for char in polymer:
        c = Character()
        c.value = char
        c.prev = previous

        if previous == None:
            first = c
        elif previous != None:
            previous.next = c

        previous = c

    current = first
    last = None
    while True:
        if current == None or current.next == None:
            break

        prev = current.prev
        next = current.next
        if abs(ord(current.value)-ord(next.value)) == 32:
            if prev != None and next.next != None:
                prev.next = next.next
                next.next.prev = prev
                current = prev
            elif next.next == None:
                prev.next = None
                current = prev
            elif prev == None:
                if next.next != None:
                    next.next.prev = None
                current = next.next
        else:
            current = next

    last = current
    if current == None:
        print("Nothing")

    while last.prev != None:
        last = last.prev

    units = 0
    while last != None:
        units += 1
        last = last.next

    return units

results = []
input = sys.stdin.readline()
for i in range(65, 65+26):
    result = remove_units(input, chr(i))
    results.append(result)

print(sorted(results)[0])
