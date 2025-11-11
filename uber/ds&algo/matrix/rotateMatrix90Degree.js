class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    rotate(matrix) {
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const temp = matrix[j][i]
                matrix[j][i] = matrix[i][j]
                matrix[i][j] = temp
            }
        }
        for (let row of matrix) {
            row.reverse()
        }

        return matrix
    }
}
