def split_whitespace_to_ints(values)
  return values.split().map { |s| s.to_i }
end

def reallocate_memory(memory)
  banks = split_whitespace_to_ints(memory)
  return reallocate(banks)
end

def reallocate(banks)  
  states = Hash.new
  redistributions = 0
  while true
    state = banks.join(" ")
    if states[state] != nil
      return { "redistributions" => redistributions, "memory" => state }
    else
      states[state] = true
      banks = redistribute(banks)
      redistributions += 1
    end
  end
end

def redistribute(banks)
  highest_block_count = banks.max()
  highest_block_index = banks.index(highest_block_count)
 
  banks[highest_block_index] = 0
 
  increment = highest_block_count / banks.size
  remainder = highest_block_count % banks.size
  banks = banks.map { |blocks| blocks + increment }
  i = 1
  while i <= remainder
    index_to_increment = (highest_block_index + i) % banks.size
    banks[index_to_increment] += 1
    i += 1
  end
  return banks
end

# Redistributions until repeated state
reallocations_test1 = reallocate_memory("0 2 7 0")
puts reallocations_test1["redistributions"]

# Length of infinite cycle
reallocations_test2 = reallocate_memory(reallocations_test1["memory"])
puts reallocations_test2["redistributions"]

# Redistributions until repeated state
reallocations_puzzle1 = reallocate_memory("2    8    8    5    4    2    3    1    5    5    1    2    15    13    5    14")
puts reallocations_puzzle1["redistributions"]

# Length of inifinite cycle
reallocations_puzzle2 = reallocate_memory(reallocations_puzzle1["memory"])
puts reallocations_puzzle2["redistributions"]

