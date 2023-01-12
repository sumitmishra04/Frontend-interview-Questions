function index(str) {
  let res = "";
  for (let i = 0; i < str.length; ) {
    for (let j = i; j < str.length; ) {
      while (str[i] === str[j]) {
        j++;
      }
      res += str[i];
      if (j - i > 1) {
        res +=  (j - i);
      }
      i = j;
    }
  }
  return res;
}

console.log(index("aaabbbccc"));
console.log(index("abbbccc"));
console.log(index("abbbbbbbbbbbbbbbbbb"));
console.log(index("abc"));
