import {useState, useRef} from 'react'
const initialBoard = Array(9).fill(null)
const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const useTicTacToe = () => {
  const [board, setBoard] = useState([...initialBoard])
  const [isNextX, setIsNextX] = useState(true)
  const winningCombinationRef = useRef([])

  const calculateWinner = () => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i]
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        winningCombinationRef.current = WINNING_PATTERN[i]
        return board[a]
      }
    }
  }

  const reset = () => {
    winningCombinationRef.current = []
    setBoard(initialBoard)
  }

  const handleClick = (index) => {
    const winner = calculateWinner()
    if (winner) return
    setBoard((val) => {
      val[index] = isNextX ? 'X' : 'O'
      return val
    })
    setIsNextX((val) => !val)
  }

  const getStatus = () => {
    const winner = calculateWinner()
    if (winner) {
      return `Winner: ${winner}`
    }
    if (!board.includes(null)) return `Its a draw`
    return `Next Player: ${isNextX ? 'X' : 'O'}`
  }

  return [
    board,
    reset,
    handleClick,
    getStatus,
    (winningCombination = winningCombinationRef),
  ]
}

export default useTicTacToe














import React,  {useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import useTicTacToe from './useTicTacToe'

const Box = {
  aspectRatio: '1 / 1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '50px',
  border: '1px solid grey',
}

const BoxContainer = {
  width: '300px',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
}

function App() {
  const [board, reset, handleClick, getStatus, winningCombination] =
    useTicTacToe()

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <button onClick={reset}>Restart</button>
      <p>{getStatus()}</p>

      <br />
      <div style={BoxContainer}>
        {board.map((el, index) => {
          return (
            <button
              style={{
                ...Box,
                background: winningCombination.current.includes(index)
                  ? 'green'
                  : 'white',
              }}
              key={index}
              onClick={() => handleClick(index)}
            >
              {el}
            </button>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
