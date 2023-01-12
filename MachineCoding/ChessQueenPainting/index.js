function createBoard() {
    const board = document.getElementById('chess')
    board.classList.add('board')
    for (let i = 0; i < 8; i++) {
      const row = document.createElement('div')
      row.classList.add('row')
      for (let j = 0; j < 8; j++) {
        let cell = initializeNewCell(i, j)
        colorCodeCell(cell, i, j)
        cell.addEventListener('click', () => paintBoard(cell))
        row.appendChild(cell)
      }
      board.appendChild(row)
    }
  }
  
  function initializeNewCell(i, j) {
    const cell = document.createElement('div')
    cell.id = i + '' + j
    cell.classList.add('cell')
    return cell
  }
  
  function paintBoard(cell) {
    let row = +cell.id.split('')[0]
    let col = +cell.id.split('')[1]
    const elem = document.getElementById(row + '' + col)
    resetBoard()
    paintTopRight(row, col)
    paintBottomLeft(row, col)
    paintTopLeft(row, col)
    paintBottomRight(row, col)
    elem.classList.add('highlight')
  }
  
  function resetBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = document.getElementById(i + '' + j)
        colorCodeCell(cell, i, j)
      }
    }
  }
  
  function colorCodeCell(cell, i, j) {
    if ((j + i) % 2 !== 0) {
      cell.classList.add('white')
    } else {
      cell.classList.add('dark')
    }
    cell.classList.remove('highlight')
  }
  
  function paintTopRight(row, col) {
    while (row >= 0 && col < 8) {
      const elem = document.getElementById(row + '' + col)
      elem.classList.add('highlight')
      row = row - 1
      col = col + 1
    }
  }
  
  function paintBottomLeft(row, col) {
    while (row < 8 && col >= 0) {
      const elem = document.getElementById(row + '' + col)
      elem.classList.add('highlight')
      row = row + 1
      col = col - 1
    }
  }
  
  function paintTopLeft(row, col) {
    while (row >= 0 && col >= 0) {
      const elem = document.getElementById(row + '' + col)
      elem.classList.add('highlight')
      row = row - 1
      col = col - 1
    }
  }
  
  function paintBottomRight(row, col) {
    while (row < 8 && col < 8) {
      const elem = document.getElementById(row + '' + col)
      elem.classList.add('highlight')
      row = row + 1
      col = col + 1
    }
  }
  
  createBoard()
  