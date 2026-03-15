// Input: 
// board = [
//   ["A","B","C","D"],
//   ["S","A","A","T"],
//   ["A","C","A","E"]
// ],
// word = "CAT"

// Output: true

function exist(board, word) {
  const ROWS = board.length
  const COLS = board[0].length
  function dfs(r,c,idx) {
    if(idx === word.length) return true
    if(r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== word[idx]) return false
    const temp = board[r][c]
    board[r][c] = '#'
    const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c + 1, idx + 1) 
    board[r][c] = temp
    return found
  }
  for(let i = 0; i < ROWS; i++){
      for(let j = 0; j < ROWS; j++){
        if(board[i][j] === word[0]){
          if(dfs(i,j,0)) return true
        }
      }
  }
  return false
}

console.log('exist', exist([["A","B","C","D"],["S","A","A","T"],["A","C","A","E"]], "CAT"))
/*
complexity: m * 4^n
m -> cells on board
n -> length of word
*/ 