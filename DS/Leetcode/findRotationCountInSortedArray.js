function Count(arr) {
  let min = Infinity;
  let minIndex 
  arr.forEach((item, index) => {
    if (item < min) {
      min = item;
      minIndex = index
    }
  });
  return minIndex
}

console.log(Count([ 8, 1, 4, 6]));
