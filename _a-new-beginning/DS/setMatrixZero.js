class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        let topRowHasZero = false
        let leftColHasZero = false
        const rowLen = matrix.length
        const colLen = matrix[0].length

        for(let i = 0; i<colLen; i++) {
            if(matrix[0][i] === 0) {
                topRowHasZero = true
                break
            }
        }
        for(let i = 0; i<rowLen; i++) {
            if(matrix[i][0] === 0) {
                leftColHasZero = true
                break
            }
        }

        for(let i = 1; i<rowLen; i++) {
            for(let j = 1; j<colLen; j++) {
                if(matrix[i][j] === 0) {
                    matrix[0][j] = 0
                    matrix[i][0] = 0
                }
            }
        }

        for(let i = 1; i<rowLen; i++) {
            for(let j = 1; j<colLen; j++) {
                if(matrix[i][0] === 0 || matrix[0][j] === 0) {
                    matrix[i][j] = 0
                }
            }
        }

        if(topRowHasZero) {
            for(let i = 0; i<colLen;i++) {
                matrix[0][i] = 0
            }
        }
        if(leftColHasZero) {
            for(let i = 0; i<rowLen;i++) {
                matrix[i][0] = 0
            }
        }

        return matrix
        

    }
}
