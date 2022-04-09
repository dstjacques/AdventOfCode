https://jsfiddle.net/gurc6ovn/
import hashlib
import time
start_time = time.time()
for i in range(0, 10000000):
 input = 'abbhdwsy' + str(i)
 hash = hashlib.md5(input.encode()).hexdigest()
 if hash[0:5] == '00000':
  print(hash[5])

print("--- %s seconds ---" % (time.time() - start_time))