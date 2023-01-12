
const colorPallete = [
  { orange300: "#FFBD5D" },
  { red300: "#F49999" },
  { grey300: "#CBD2D6" },
  { blue300: "#BFDBEE" },
  { green300: "#99EDD1" },
  { lime500: "#65B500" },
  { teal300: "#99F1ED" },
  { yellow300: "#FFEC99" },
  { purple300: "#C499D1" },
  { pink300: "#F999C0" },
];


function createBoard(el, rowCount, colCount) {
  const board = document.querySelector(el);
  let activeColor = "";
  let dragStarted = false;
  board.classList.add("board");
  for (let i = 0; i < rowCount; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < colCount; j++) {
      const cell = document.createElement("div");
      cell.visited = false;
      cell.classList.add("cell");
      cell.id = i + "" + j;
      if (i !== rowCount - 1) {
        cell.style.borderBottom = "1px solid black";
      }
      if (j !== colCount - 1) {
        cell.style.borderRight = "1px solid black";
      }
      if (i === 0) {
        const color = Object.values(colorPallete200[j])[0];
        cell.style.background = color;
        cell.setAttribute("data-color", color);
        cell.addEventListener("click", function () {
          activeColor = cell.dataset.color;
        });
      } else {
        cell.addEventListener("click", () => {
            dragStarted = !dragStarted;
            if(dragStarted) {
              cell.visited = !cell.visited;
              fillColorOnClick(cell, activeColor);
            }
        });
        cell.addEventListener("mouseover", () => {
          if (dragStarted) {
            cell.visited = !cell.visited;
            fillColorOnClick(cell, activeColor);
          }
        });
      }

      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

createBoard("#grid", 200, 200);

function fillColorOnClick(cell, activeColor) {
  if (!cell.visited) {
    cell.style.background = "white";
  } else {
    if (activeColor) {
      cell.style.background = activeColor;
    }
  }
}
