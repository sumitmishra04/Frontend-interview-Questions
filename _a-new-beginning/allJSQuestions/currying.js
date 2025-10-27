/*================================================================================================
function sum(initialVal) {
    let total = initialVal
    return function helper(nextValue) {
        if(nextValue === undefined) {
            return total
        }
        total = total + nextValue
        return helper
    }
}

console.log(sum(1)(2)(3)())
================================================================================================*/


/*================================================================================================
function sum(...args) {
    return args.reduce((acc, curr) => {
        return acc+curr
    }, 0)
}
console.log(sum(1,2))
console.log(sum(1,2,3))
================================================================================================*/


/*================================================================================================
function curry() {
    let total = 0
    function helper(...args) {
        if(args.length === 0) {
            return total
        }
        total = args.reduce((acc, curr) => {
            return acc + curr
        }, total)
        return helper
    }
    return helper
}
const sum = curry()
sum(5, 10)
sum(30)
sum(1, 10, 10)
sum(2)
console.log(sum())
================================================================================================*/


/*================================================================================================
function add(a,b,c,d) {
    return a+b+c+d
}

function curry(fn) {
    return function curried(...args) {
            if(args.length >= fn.length) {
                return fn.apply(this, args)
            } else {
                return function(...nextArgs) {
                   return curried(...args, ...nextArgs)
                }
            }

    }
}

let curriedSum = curry(add) 

console.log(curriedSum(1,2,3,4))
console.log(curriedSum(1)(2,3)(4))
console.log(curriedSum(1)(2)(3)(4))
================================================================================================*/


/*================================================================================================
function addValue(...initialArgs) {
  let sum = initialArgs.reduce((a, b) => a + b, 0);

  function inner(...args) {
    sum += args.reduce((a, b) => a + b, 0);
    return inner;
  }

  inner.value = function () {
    return sum;
  };

  // This makes addition work like addValue(1)(2) + 3
  inner.valueOf = function () {
    return sum;
  };

  inner.toString = function () {
    return sum;
  };

  return inner;
}

// Test Cases
console.log(addValue(1,2,3).value());   // 6
console.log(addValue(1,2)(3).value());  // 6
console.log(addValue(1)(2)(3).value()); // 6
console.log(addValue(1)(2) + 3);        // 6

================================================================================================*/

