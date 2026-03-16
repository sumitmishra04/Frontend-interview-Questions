
function foreignDictionary(words) {
  // 1: declare 2 maps
  const adj = new Map()
  const indegree = new Map()
  let result = ''
  // 2: initialize maps
  for(let word of words) {
    for(let char of word) {
      if(!adj.has(char)) {
        adj.set(char, new Set())
       indegree.set(char, 0)
      }
    }
  }

  // 3. fill adj and indegree
  for(let i = 0; i < words.length - 1; i++) {
    let word1 = words[i]
    let word2 = words[i + 1]
    let found = false
    let minLen = Math.min(word1.length, word2.length)
    for(let j = 0; j < minLen; j++) {
      let ch1 = word1[j]
      let ch2 = word2[j]
      if(ch1 !== ch2) {
        if(!adj.get(ch1).has(ch2)) {
        adj.get(ch1).add(ch2)
        indegree.set(ch2, indegree.get(ch2) + 1)
        }
        found = true
        break
      }
    }
    if(!found && word1.length > word2.length) return ""
  }
  console.log('adj', adj)
  console.log('ind', indegree)

  // 4. find the starting point
  let queue = []
  for(let [char,deg] of indegree) {
    if(deg === 0) {
      queue.push(char)
    }
  }
  // 5. traverse the path
  while(queue.length) {
    const curr = queue.shift()
    result += curr
    for(let char of adj.get(curr)){
       indegree.set(char, indegree.get(char) - 1)
       if(indegree.get(char) === 0) queue.push(char)
    }
  }
  if(result.length !== indegree.size) return ""
  return result

}
const input = ["hrn","hrf","er","enn","rfnn"]

const words = ["wrt","wrf","er","ett","rftt","te"]
// Output: "hernf"

console.log('>>>>', foreignDictionary(words))

/*
N = number of words
M = total characters
K = unique characters
Operation	Complexity
Graph build	O(M)
Topological sort	O(K + edges)

✅ Total Time: O(M)
✅ Space: O(K + edges)
*/