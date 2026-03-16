// function spiralOrder(matrix) {
//     const res = [];

//     let top = 0;
//     let bottom = matrix.length - 1;
//     let left = 0;
//     let right = matrix[0].length - 1;

//     while (top <= bottom && left <= right) {

//         // left → right
//         for (let i = left; i <= right; i++) {
//             res.push(matrix[top][i]);
//         }
//         top++;

//         // top → bottom
//         for (let i = top; i <= bottom; i++) {
//             res.push(matrix[i][right]);
//         }
//         right--;

//         if (top <= bottom) {
//             // right → left
//             for (let i = right; i >= left; i--) {
//                 res.push(matrix[bottom][i]);
//             }
//             bottom--;
//         }

//         if (left <= right) {
//             // bottom → top
//             for (let i = bottom; i >= top; i--) {
//                 res.push(matrix[i][left]);
//             }
//             left++;
//         }
//     }

//     return res;
// }

function spiralOrder(matrix) {
  const result = []
  let left = 0
  let top = 0
  let right = matrix[0].length - 1
  let bottom = matrix.length - 1
  while(top <= bottom && left <= right) {
    for(let i = left; i <= right; i++) {
      result.push(matrix[top][i])
    }
    top++
    for(let i = top; i <= bottom; i++) {
      result.push(matrix[i][right])
    }
    right--
    if(top <= bottom) {
    for(let i = right; i >= left; i--) {
      result.push(matrix[bottom][i])
    }
    bottom--
    }
    if(left <= right) {
    for(let i = bottom; i >= top; i--) {
      result.push(matrix[i][left])
    }
    left++
    }
  }
  return result
}

const input = [
 [1,2,3],
 [4,5,6],
 [7,8,9]
]
// [1,2,3,6,9,8,7,4,5]
console.log('>>>', spiralOrder(input))

// Object(m x n)