function index(arr) {
  const wordMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    const sortedWord = [...arr[i]].sort().join();
    if (wordMap.has(sortedWord)) {
      wordMap.set(sortedWord, [...wordMap.get(sortedWord), arr[i]]);
    } else {
      wordMap.set(sortedWord, [arr[i]]);
    }
  }
  return wordMap
}

console.log(index(["eat", "ate", "tan", "ant", "bat", "tea"]));
