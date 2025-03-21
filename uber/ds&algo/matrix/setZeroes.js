class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        const rowFlags = Array(matrix.length).fill(false)
        const colFlags = Array(matrix[0].length).fill(false)

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] === 0) {
                    rowFlags[i] = true
                    colFlags[j] = true
                }
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (rowFlags[i] === true || colFlags[j] === true) {
                    matrix[i][j] = 0
                }
            }
        }

        return matrix
    }
}
