function HappyNumber(num) {
  const sumSeen = new Set();
  while (num !== 1) {
    let sum = 0;
    let current = num;
    while (current !== 0) {
      sum += (current % 10) * (current % 10);
      current = Math.floor(current/10)
    }
    if(sumSeen.has(sum)){
        return false
    }
    sumSeen.add(sum)
    num = sum
  }
  return true
}

1 + 81
82
64 

console.log(HappyNumber(3233));
