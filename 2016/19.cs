using System;
using System.Linq;
using System.Collections.Generic;
class MainClass {
  public static void Main (string[] args) {
    LinkedList<int> elves = new LinkedList<int>();
    int elf_count = 3014387;
    for(int i = 1; i <= elf_count; i++)
    {
      elves.AddLast(i);
    }
    
    var elf = elves.Find(1);
    while(elves.Count > 1)
    {
      var toRemove = elves.First;
      var next = elves.First.Next;
      if (elf.Next != null)
      {
        toRemove = elf.Next;
        next = elves.First;
        if (elf.Next.Next != null)
        {
          toRemove = elf.Next;
          next = elf.Next.Next; 
        }
      }
      elves.Remove(toRemove);
      elf = next;
    }
    
    Console.WriteLine(String.Join(",", elves.ToArray()));
  }
}
      