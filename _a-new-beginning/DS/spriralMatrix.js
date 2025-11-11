class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    spiralOrder(matrix) {
    const result = []
    const totalLength = matrix.flat(1).length
    
    function helper(left, top, right, bottom) {
        if(result.length === totalLength) return result

        for(let i = left; i<=right; i++) {
            result.push(matrix[top][i])
        }
        for(let i = top+1; i<=bottom; i++){
            result.push(matrix[i][right])
        }
        if(top !== bottom) {
           for(let i = right-1; i>=left; i--){
            result.push(matrix[bottom][i])
           } 
        }
        if(left!== right) {
           for(let i = bottom-1; i>top; i--){
            result.push(matrix[i][left])
           } 
        }
        helper(top+1, left+1, right-1, bottom -1)
    }
    helper(0, 0, matrix[0].length - 1, matrix.length - 1 )
    return result
}

}
