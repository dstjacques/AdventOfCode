import hashlib
import time
answer = [''] * 8
print(answer)
start_time = time.time()
for i in range(0, 100000000):
 if '' not in answer:
  break
 input = 'abbhdwsy' + str(i)
 hash = hashlib.md5(input.encode()).hexdigest()
 if hash[0:5] == '00000':
  try:
   position = int(hash[5])
   if position > -1 and position < 8:
    if answer[position] == '':
     answer[position] = hash[6]
  except:
   continue
print(answer)
print("--- %s seconds ---" % (time.time() - start_time))