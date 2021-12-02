#!/usr/bin/env python3
import sys
import operator
import datetime

records = []
for line in sys.stdin:
    records.append(line.strip())

records.sort()

awaken = 'w'
asleep = 'a'

def parse_event(record):
    date_string, event_string = record.replace("[", "").split("] ")
    date = datetime.datetime.strptime(date_string, "%Y-%m-%d %H:%M")

    event = ''
    if event_string.find("Guard") > -1:
        event = event_string.split("#")[1].split(" ")[0]
    elif event_string == 'wakes up':
        event = awaken
    elif event_string == 'falls asleep':
        event = asleep

    return (date, event)

guard_sleep_ranges = {}
guard_sleep_minutes = [0] * 5000
asleep = False
guard = None
previous_date = datetime.datetime.now()
for record in records:
    (date, event) = parse_event(record)

    previous_minute = previous_date.minute
    if previous_date.hour == 23:
        previous_minute = 0

    minutes = date.minute - previous_minute

    if event == awaken:
        guard_sleep_minutes[guard] += minutes
        if guard not in guard_sleep_ranges:
            guard_sleep_ranges[guard] = []
        guard_sleep_ranges[guard].append((previous_minute, date.minute))
        previous_date = date
        asleep = False
    elif event == asleep:
        previous_date = date
        asleep = True
    else:
        guard = int(event)
        previous_date = date
        asleep = False

max_guard_1, max_minutes = max(enumerate(guard_sleep_minutes), key=operator.itemgetter(1))

def most_common_minute(sleep_ranges):
    sleep_minutes = [0] * 60
    for i in range(0, len(sleep_ranges)):
        sleep_range = sleep_ranges[i]
        for j in range(sleep_range[0], sleep_range[1]):
            sleep_minutes[j] += 1
    max_minute, max_occurrences = max(enumerate(sleep_minutes), key=operator.itemgetter(1))
    return (max_minute, max_occurrences)

guard_common_minute_number = {}
guard_common_minute_count = {}
for id in guard_sleep_ranges:
    sleep_ranges = guard_sleep_ranges[id]
    guard_common_minute_number[id], guard_common_minute_count[id] = most_common_minute(sleep_ranges)

print("Part 1: %d" % (max_guard_1 * guard_common_minute_number[max_guard_1]))

max_guard_2 = None
max_minute_count = -1
for id, minute_count in guard_common_minute_count.items():
    if minute_count > max_minute_count:
        max_guard_2 = id
        max_minute_count = minute_count

print("Part 2: %d" % (max_guard_2 * guard_common_minute_number[max_guard_2]))