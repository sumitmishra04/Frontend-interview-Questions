/*
const grid = [
    ["0","1","1","1","0"],
    ["0","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  */
//Output: 1

function numIslands(grid) {
  if(grid.length === 0) return 0
  const ROWS = grid.length
  const COLS = grid[0].length
  const one = "1"
  const zero = "0"
  let count = 0
  function bfs(r,c) {
  const direction = [[0,1],[0,-1], [1,0],[-1,0]]
  const queue = [[r,c]]
  grid[r][c] = zero
  let head = 0
  while(head < queue.length){
    const [row,col] = queue[head++]
    for(let [dr,dc] of direction) {
      const newRow = row + dr
      const newCol = col + dc
      if(newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && grid[newRow][newCol] === one ) {
        queue.push([newRow,newCol])
        grid[newRow][newCol] = zero
      }
    }
  }
  }
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      if(grid[i][j] === one) {
        bfs(i,j)
        count++
      }
    }
  }
  return count
}

const grid = [
    ["0","1","1","1","0"],
    ["0","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]

console.log('>>>', numIslands(grid))

// Each cell is visited once → Time Complexity: O(m × n)
// Space complexity: O(m × n) (recursion stack worst case)