function spiralOrder(matrix) {
    const result = []
    const totalLength = matrix.flat(Infinity).length

    function helper(topRow, leftCol, rightCol, bottomRow) {
        for (let i = leftCol; i <= rightCol; i++) {
            result.push(matrix[topRow][i])
        }
        for (let i = topRow + 1; i <= bottomRow; i++) {
            result.push(matrix[i][rightCol])
        }
        if (topRow < bottomRow) {
            for (let i = rightCol - 1; i >= leftCol; i--) {
                result.push(matrix[bottomRow][i])
            }
        }
        if (leftCol < rightCol) {
            for (let i = bottomRow - 1; i > topRow; i--) {
                result.push(matrix[i][leftCol])
            }
        }
        if (result.length !== totalLength) {
            helper(topRow + 1, leftCol + 1, rightCol - 1, bottomRow - 1)
        }

    }

    helper(0, 0, matrix[0].length - 1, matrix[0].length - 1)
    return result
}

console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]))
console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]))