class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     * 
     You should aim for a solution with O(m * (4^n)) time and O(n) space, where m is the number of cells in the given board and n is the size of the given word.
     */
    exist(board, word) {
        const rowLen = board.length
        const colLen = board[0].length
        let wordIndex = 0
        function dfs(row, col, wordIndex) {
            if(wordIndex === word.length) return true
            if(row<0 || col<0 || row>=rowLen || col>=colLen || board[row][col] !== word[wordIndex]) {
                return false
            }
            const temp = board[row][col]
            board[row][col] = '#'
            const found = dfs(row+1, col, wordIndex+1) ||
                          dfs(row, col-1, wordIndex+1) ||
                          dfs(row, col+1, wordIndex+1) ||
                          dfs(row-1, col, wordIndex+1)
            board[row][col] = temp
            return found
        }
        for(let i = 0; i<rowLen; i++) {
            for(let j = 0; j<colLen; j++) {
                if(dfs(i,j, wordIndex)) return true
            }
        }
        return false
    }
}
