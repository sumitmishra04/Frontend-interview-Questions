/**
 * @param {character[][]} grid
 * @return {number}
 */

 var noOfIsland = function(grid) { 
    let noOfIsland = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "1") {
          noOfIsland++
          DFS(grid, i, j, grid.length, grid[i].length);
        }
      }
    }
    return noOfIsland
  }
  
  function DFS(matrix, i, j, nR, nC ) {
    if (
      i < 0 ||
      j < 0 ||
      i >= nR.length ||
      j >= nC.length ||
      matrix[i][j] === "0"
    ) {
      return;
    }
    matrix[i][j] = "0";
    DFS(matrix, i + 1, j, nR, nC);
    DFS(matrix, i - 1, j, nR, nC);
    DFS(matrix, i, j + 1, nR, nC);
    DFS(matrix, i, j - 1, nR, nC);
  }
  

  console.log(noOfIsland([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))