// Array.prototype.flattenWithReduce = function () {
//   return this.reduce((acc, item) => {
//     if (Array.isArray(item)) {
//       return [...acc, ...item.flattenWithReduce()];
//     } else {
//       return [...acc, item];
//     }
//   }, []);
// };




Array.prototype.flattenWithReduce = function (depth = 1) {
  return this.reduce((acc, curr) => {
    if(Array.isArray(curr) && depth > 0) {
      return [...acc, ...curr.flattenWithReduce(depth -1) ]
    } else {
      return [...acc, curr]
    }
  }, [])
}

const input = [
  1,
  2,
  3,
  [4],
  [5, 6, [7], [8, [9, [10]]]],
  11,
  12,
  13,
  [14, [[[[[15, [16]]]]]]],
  17,
  18,
  [19, [20, [21, [22, [23, [24, [[[[[25]]]]]]]]]]],
];

console.log(input.flattenWithReduce(11));