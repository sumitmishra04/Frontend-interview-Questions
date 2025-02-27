var uniquePaths = function(m,n) {
    let memo = Array(m).fill(Array(n).fill(1));
    for(let row = 1; row<m;row++) {
        for(let col = 1; col<n;col++) {
            memo[row][col] = memo[row-1][col] + memo[row][col-1]
        }
    }
    return memo[m-1][n-1]
}

console.log('uniquePaths', uniquePaths(3,7))