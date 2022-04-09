
SAFE = '.'
TRAP = '^'

initial = '^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^.'
num_rows = 39

prev = initial
next = ''
safe_tiles = initial.count(SAFE)
for i in range(0, num_rows):
  for j in range(0, len(initial)):
    left = prev[j-1] if j-1 >= 0 else SAFE
    center = prev[j]
    right = prev[j+1] if j+1 < len(initial) else SAFE
    
    new_tile = SAFE
    if center == TRAP and (left+center+right).count(TRAP) == 2:
      new_tile = TRAP
    elif (left == TRAP or right == TRAP) and (left+center+right).count(TRAP) == 1:
      new_tile = TRAP
    next += new_tile
  safe_tiles += next.count(SAFE)
  print(next)
  prev = next
  next = ''
  
print(safe_tiles)