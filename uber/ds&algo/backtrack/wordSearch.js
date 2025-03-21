class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const rowLen = board.length;
        const colLen = board[0].length;

        function dfs(r, c, i) {
            if (i === word.length) return true
            if (r >= rowLen || r < 0 || c >= colLen || c < 0 || board[r][c] !== word[i]) {
                return false
            }
            const temp = board[r][c]
            board[r][c] = '#'
            const found = dfs(r + 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c - 1, i + 1)
            board[r][c] = temp
            return found
        }
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                if (dfs(i, j, 0)) return true
            }
        }
        return false
    }
}

// Time Complexity: O(m * n * 4^L)
// m * n for traversing the board.
// Each cell explores up to 4 directions.
// L is the length of the word.
// Space Complexity: O(L) (recursion depth is at most the length of the word).