#!/usr/bin/env python3
import sys

def are_similar(text1, text2):
    diff = 0
    for i in range(0, len(text1)):
        if text1[i] != text2[i]:
            diff += 1
        if diff > 1:
            break
    return diff < 2

def common_letters(text1, text2):
    common = ''
    for i in range(0, len(text1)):
        if text1[i] == text2[i]:
            common += text1[i]
    return common    

def checksum(text):
    return sum([ord(char) for char in line])

def get_checksum(input):
    return input[0]


inputs = []
for line in sys.stdin:
    c = checksum(line)
    inputs.append((c, line.strip()))

inputs.sort(key=get_checksum)

index1 = 0
index2 = 1
while True:
    diff = get_checksum(inputs[index2]) - get_checksum(inputs[index1])
    text1 = inputs[index1][1]
    text2 = inputs[index2][1]

    if diff <= 26:
        if are_similar(text1, text2):
            print(common_letters(text1, text2))
            break
        else:
            index2 += 1
    else:
        index1 += 1
        index2 = index1 + 1