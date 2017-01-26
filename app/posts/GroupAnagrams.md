## Group Anagrams
---
### problem

From [leet code 49](https://leetcode.com/problems/anagrams/). Given an array of strings, group anagrams together. For example, given: 

> ["eat", "tea", "tan", "ate", "nat", "bat"], 

Return:

> [  
&nbsp;&nbsp;&nbsp;["ate", "eat","tea"],  
&nbsp;&nbsp;&nbsp;["nat","tan"],  
&nbsp;&nbsp;&nbsp;["bat"]  
]

Note: All inputs will be in lower-case.

### analysis
The most easist way to solve this problem is to have two inner loops check element[i] with element[i...n] which is O(n^2).

The other approach is to use more space and save the index of anagrams. 
Take above example: [[0, 1, 3], [2, 4], [5]]. After got this, we can loop through orignal string and get the output. 
This will have O(m*n), m is longest length of a signle string in orignal array.

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  if (!strs || strs.length === 0) {
    return [[""]];
  }

  // use map as an hash table, sorted string as key, and index of orignal string as value
  let hashTable = new Map();
  strs.forEach((element, index) => {
    let stortedElement = element.split('').sort().join('');
    if (hashTable.has(stortedElement)) {
      let value = hashTable.get(stortedElement);
      value.push(index);
      hashTable.set(stortedElement, value);
    } else {
      hashTable.set(stortedElement, [index]);
    }
  });

  let result = [];
  hashTable.forEach((value) => {
    let anagrams = [];
    value.forEach((index) => {
      anagrams.push(strs[index]);
    });

    result.push(anagrams);
  });
  
  return result;
};
```