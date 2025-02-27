function curry() {
    let currentSum = 0
    return function(...args) {
        currentSum = args.reduce((acc, curr)=>{
            return curr + acc
        }, currentSum)
        return currentSum
    }
}

// const sum = curry()
// sum(5, 10)
// sum(30)
// sum(1, 10, 10)
// sum(2)
// console.log(sum())


function sum (initialVal) {
    let result = initialVal || 0
    function calculate(val) {
        if(val === undefined) {
            return result
        }
        result += val;
        return calculate
    }
    return calculate
}

// const total = sum(10)(20)(30)(90)();
// console.log(total)

function add(a,b,c,d) {
    return a+b+c+d
}

function curry2 (fn) {
    return function curried (...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...nextArgs) {
                return curried(...args, ...nextArgs)
            }
        }
    }
}

let curriedSum = curry2(add) 
// console.log(curriedSum(1,2,3,4))
// console.log(curriedSum(1)(2,3)(4))
// console.log(curriedSum(1)(2)(3)(4))

const addValue = function (...args) {
    let result = args.reduce((acc, curr) => {
        return acc + curr
    }, 0)

    function calculate(...nextArgs) {
        result = nextArgs.reduce((acc, curr) => {
            return acc + curr
        }, result)
     return calculate
    }

    calculate.value = function() {
        return result
    }

    calculate.toString = calculate.value = () => result;

    return calculate
}

addValue.prototype.value = function() {
    return this.result
}

console.log(addValue(1,2,3).value())
console.log(addValue(1,2)(3).value())
console.log(addValue(1)(2)(3).value())
console.log(addValue(1)(2) + 3)
// console.log(addValue(1,2)(3))