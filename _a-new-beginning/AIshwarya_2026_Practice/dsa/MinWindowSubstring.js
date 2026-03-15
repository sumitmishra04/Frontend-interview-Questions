/*
Input: s = "OUZODYXAZV", t = "XYZ"
output => "YXAZ"
*/

function minWindow(s, t) {
  if(t === "") return ''
  const freqT = new Map()
  const freqS = new Map()

  for(let c of t) {
   freqT.set(c, (freqT.get(c) || 0) + 1)
  }
  let have = 0
  let need = freqT.size
  let minLen = Infinity
  let minLenIdx = [-1,-1]
  let l = 0
  for(let r = 0; r < s.length; r++) {
    let c = s[r]
    freqS.set(c, (freqS.get(c) || 0) + 1)
    if(freqT.has(c) && freqS.get(c) === freqT.get(c)) {
      have++
    }
    while(have === need) {
      if(r - l + 1 < minLen) {
        minLen = r - l + 1
        minLenIdx = [l, r + 1] 
      }
      let leftChar = s[l]
      freqS.set(leftChar, freqS.get(leftChar) - 1)
      if(freqT.has(leftChar) && freqS.get(leftChar) < freqT.get(leftChar)){
        have--
      }
      l++
    }
  }
  const [start,end] = minLenIdx
  return s.substring(minLenIdx[0], minLenIdx[1])
}

console.log(minWindow("OUZODYXAZV","XYZ"))

// O(n)