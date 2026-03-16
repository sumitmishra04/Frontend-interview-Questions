/*Input: n = "123"
Output: "121"*/

var nearestPalindrome = function(n) {
  const candidates = new Set()
  const len = n.length

  candidates.add(BigInt(Math.pow(10,len - 1) - 1)).toString()
  candidates.add(BigInt(Math.pow(10,len) + 1)).toString()

  const prefix = BigInt(n.slice(0,Math.ceil(len/2)))
  for(let i of [-1n, 0n, 1n]) {
    prefixStr = (prefix + i).toString()
    let candidate = null
    if(len % 2 === 0) {
      candidate = prefixStr + prefixStr.split('').reverse().join('')
    } else {
      candidate = prefixStr + prefixStr.slice(0,-1).split('').reverse().join('')
    }
    candidates.add(candidate)
  }
  candidates.delete(n)
  let closest = ""
  let minDiff = -1n
  for(let c of candidates) {
    let diff = BigInt(c) - BigInt(n)
    if(diff < 0n) diff = -diff 
    if(minDiff === -1n || diff < minDiff || (diff === minDiff && BigInt(c) < BigInt(closest))) {
      minDiff = diff
      closest = c
    }
  }
  return closest
}

console.log(nearestPalindrome('23455'))

// complexity O(n)