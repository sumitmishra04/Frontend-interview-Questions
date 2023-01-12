function isValid(str) {
  const stack = new Stack();
  for (let i in str) {
    if (str[i] === "[" || str[i] === "{" || str[i] === "(") {
      stack.push(str[i]);
    }
    else if(str[i] === ')' && stack.size !== 0 && stack.peek() === '(') {
        stack.pop()
    } else if(str[i] === '}' && stack.size !== 0 && stack.peek() === '{') {
        stack.pop()
    } else if(str[i] === ']' && stack.size !== 0 && stack.peek() === '[') {
        stack.pop()
    } else {
        return false
    }
  }
  return stack.size === 0
}

console.log(isValid("[{}]"));
