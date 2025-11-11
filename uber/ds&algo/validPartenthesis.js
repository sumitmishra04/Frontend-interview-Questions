class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
        const parens = {')': '(', '}': '{', ']': '['}
        const stack = []

        for(let i=0; i<s.length;i++) {
            if(s[i] in parens) {
                const val = stack.pop()
                if(val !== parens[s[i]]) {
                    return false
                }
            } else {
                stack.push(s[i])
            }
        }

        return stack.length === 0
    }
}
