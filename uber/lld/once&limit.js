function limit(fn, times) {
    let called = times 
    return function (...args) {
        if(called === 0) return
        called--
        return fn(...args)
    }
}

const getSquare = (a) =>{
    return a*a
}

const limitedSquare = limit(getSquare, 8)
console.log(limitedSquare(1))
console.log(limitedSquare(2))
console.log(limitedSquare(3))
console.log(limitedSquare(4))
console.log(limitedSquare(5))
console.log(limitedSquare(6))