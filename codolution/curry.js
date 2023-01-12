// generic curry

function sum(a, b, c) {
  return a + b + c;
}

function genericCurry(fn) {
  return function currify (...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...newArgs) {
         return currify( ...args, ...newArgs);
      };
    }
  };
}

const curriedSum = genericCurry(sum);
// console.log(curriedSum(1, 2, 3));
console.log(curriedSum(10)(2)(3));
console.log(curriedSum(10)(2,3,12)());
// curriedSum(1)
