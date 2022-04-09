import re
import sys
from hashlib import md5

prefix = 'yjdafjpo'

search_pattern_characters = 3
confirm_pattern_characters = 5

confirm_max_distance = 1000

search_pattern = re.compile('(.)\\1{' + str(search_pattern_characters-1) + '}')
confirm_pattern = re.compile('((.)\\2{' + str(confirm_pattern_characters-1) + '})')

def hash(str):
  str = str.encode('utf-8')
  md5_digest = md5(str).hexdigest()
  return md5_digest

search_results = []
confirm_results = {}
for i in range(0, 50000):
  md5_hash = hash(prefix + str(i))
  for match in re.finditer(search_pattern, md5_hash):
    search_result = match.group()
    search_results.append((i, search_result))
    break

  for match in re.finditer(confirm_pattern, md5_hash):
    confirm_result = match.group()
    if confirm_result not in confirm_results:
      confirm_results[confirm_result] = []
    confirm_results[confirm_result].append(i)

pad_keys = []
for result in search_results:
  result_index = result[0]
  confirm_str = result[1][0] * confirm_pattern_characters
  if confirm_str in confirm_results:
    confirms = [x for x in confirm_results[confirm_str] if x - result_index < confirm_max_distance and x - result_index > 0]
    if len(confirms) > 0:
      pad_keys.append(result_index)

print(len(pad_keys))
print('Part 1: %d' % sorted(pad_keys)[63])