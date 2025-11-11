 
// Time complexity: O(N+V+E)
// Space complexity: O(V+E)
// Where 
// V is the number of unique characters, 
// E is the number of edges and 
// N is the sum of lengths of all the strings.

class Solution {
  /**
   * @param {string[]} words
   * @return {string}
   */
  foreignDictionary(words) {
    const adj = new Map()
    const indegree = new Map()

    // initialise
    for(let word of words) {
        for(let ch of word) {
            adj.set(ch, new Set())
            indegree.set(ch, 0)
        }
    }
    // fill the adj and indegree
    for(let i = 0; i<words.length-1; i++) {
        const word1= words[i]
        const word2= words[i+1]
        const minLen = Math.min(word1.length, word2.length)
        let found = false
        for(let i = 0;i<minLen;i++) {
            const ch1= word1[i]
            const ch2= word2[i]
            if(ch1 !== ch2) {
                if(!adj.get(ch1).has(ch2)) {
                   adj.get(ch1).add(ch2)
                   indegree.set(ch2, indegree.get(ch2) + 1)
                }
                found = true
                break;
            }
        }
        if(!found && word1.length > word2.length) return ""
    }
    // construct queue
    let queue = []
    for(let [ch, deg] of indegree) {
        if(deg === 0) queue.push(ch)
    }

    let result = ""
    while(queue.length) {
        const ch = queue.shift()
        result += ch
        for(let neighbour of adj.get(ch)) {
            indegree.set(neighbour, indegree.get(neighbour) - 1)
            if(indegree.get(neighbour) === 0) queue.push(neighbour)
        }
    }

    if(result.length !== indegree.size) return ""
    return result
  }
}
