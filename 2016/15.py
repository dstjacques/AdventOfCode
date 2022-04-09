disc_positions = []
disc_current = []

def reset():
  global disc_positions, disc_current
  #disc_positions = [5, 2]
  #disc_current = [4, 1]
  disc_positions = [7, 13, 3, 5, 17, 19]
  disc_current = [0, 0, 2, 2, 0, 7]

def update():
  for j in range(0, len(disc_positions)):
    d = disc_positions[j]
    c = disc_current[j]
    newC = (c + 1) % d
    disc_current[j] = newC



def drop(start_time):
  for i in range(0, len(disc_current)):
    disc_current[i] = (disc_current[i] + start_time) % disc_positions[i]
    
  #print(disc_current)
  for i in range(0, len(disc_current)):
    update()
    #print(disc_current)
    if disc_current[i] != 0:
      return False
  return True
  
for i in range(0, 500000):
  if i % 1000 == 0:
    print(i)
  reset()
  success = drop(i)
  if success:
    print('Waited %d' % i)
    break

