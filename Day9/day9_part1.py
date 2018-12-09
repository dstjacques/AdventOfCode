#!/usr/bin/env python3
import sys

input = sys.stdin.readline()

player_count = int(input.split(' players')[0])
last_marble = int(input.split('worth ')[1].split(' points')[0])

scores = [0] * player_count
marbles = [0]
current_player = 0
current_marble = 0
index_marble = 0
while True:
    current_marble += 1

    if current_marble % 23 == 0:
        scores[current_player] += current_marble
        if index_marble > 6:
            index_marble = index_marble - 7
        else:
            index_marble = index_marble + len(marbles) - 7

        to_remove = marbles[index_marble]
        scores[current_player] += to_remove
        marbles.remove(to_remove)
        if index_marble == len(marbles):
            index_marble = 0

    else:
        if len(marbles) == 1:
            marbles.append(current_marble)
            index_marble = 1
        else:
            if len(marbles) % 2 == 0:
                index_marble = (index_marble + 2) % (len(marbles))
            else:
                index_marble = (index_marble + 2) % (len(marbles)+1)
            marbles.insert(index_marble, current_marble)

    current_player = (current_player + 1) % player_count
    
    if current_marble == last_marble:
        break

print(sorted(scores, reverse=True)[0])