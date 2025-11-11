class Solution {
    /**
     * @param {number} n
     * @return {string[]}
     */
    generateParenthesis(n) {
        const result = []
        function parenthesis(paren, open, close) {
            if(paren.length === 2*n) {
                result.push(paren)
            }
            if(open < n) {
                parenthesis(paren + '(', open+1, close)
            }
             if(close < open) {
                parenthesis(paren + ')', open, close+1)
            }
        }
        parenthesis("", 0, 0)
        return result
    }
}
