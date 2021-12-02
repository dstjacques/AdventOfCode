#!/usr/bin/env python3
import sys

def count_characters(text):
    chars = {}
    for char in text:
        if char not in chars:
            chars[char] = 0
        chars[char] += 1

    counts = [False, False, False, False]
    for count in chars.values():
        if count < len(counts):
            counts[count] = True
    return counts

letter_two_times = 0
letter_three_times = 0
for line in sys.stdin:
    counts = count_characters(line)
    letter_two_times = letter_two_times + 1 if counts[2] else letter_two_times
    letter_three_times = letter_three_times + 1 if counts[3] else letter_three_times

print(letter_two_times * letter_three_times)