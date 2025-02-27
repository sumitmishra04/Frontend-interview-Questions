class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        const stack = []
        for(let i =0; i< tokens.length; i++) {
            if(!isNaN(tokens[i])) {
                stack.push(parseInt(tokens[i]))
            } else {
                const operand2 = stack.pop()
                const operand1 = stack.pop()
                if(tokens[i] === '+') {
                   stack.push(operand1 + operand2) 
                } else if(tokens[i] === '-') {
                   stack.push(operand1 - operand2) 
                }else if(tokens[i] === '*') {
                   stack.push(operand1 * operand2) 
                }else if(tokens[i] === '/') {
                   stack.push(Math.trunc(operand1 / operand2))
                }
            }
        }
        return stack.pop()
    }
}
