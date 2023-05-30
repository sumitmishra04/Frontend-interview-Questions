const array = [
  [4, 5, 3],
  [2, 3, 2],
  [3, 6, 2],
  [1, 5, 4],
  [2, 4, 1],
  [1, 2, 2],
]

function lisBox(array) {
  const length = 0
  const width = 1
  const height = 2
  const maxStackableHeightAtEachIndex = []
  const lastIndex = array.length - 1
  maxStackableHeightAtEachIndex[lastIndex] = array[lastIndex][height]

  for (let i = array.length - 2; i >= 0; i--) {
    if (
      array[i][length] > array[i + 1][length] &&
      array[i][width] > array[i + 1][width]
    ) {
      maxStackableHeightAtEachIndex[i] =
        array[i][height] + maxStackableHeightAtEachIndex[i + 1]
    } else {
      maxStackableHeightAtEachIndex[i] = array[i][height]
    }
  }
  return 0
}

console.log(lisBox(array))
