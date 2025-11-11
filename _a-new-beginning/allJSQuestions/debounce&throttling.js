// Debounce:
// Don't execute the function until after a specific amount of time has passed since the last time the event occurred.
function add(num) {
    console.log(num)
    return num + 10
}

function debounce(fn, delay) {
    let timerId
    const self = this
    return function(...args) {
        if(timerId) {
            clearTimeout(timerId)
        }
        console.log('args =>', args, fn)
        timerId = setTimeout(fn.apply(self, args), delay)
    }
}

const debouncedLog = debounce(add, 500);
console.log(debouncedLog(10))


// Throttle:
// While Debounce says, "Wait until the events stop," Throttle has a different goal:
// Throttle says, "Execute this function at most once every N milliseconds."
// The throttle algorithm also uses a timer and a closure, but instead of resetting the timer, it blocks subsequent calls until the active timer has finished.
function throttle(fn, delay) {
    let called = false
    return function(...args) {
        const self = this
        if(!called) {
            fn.apply(self, args)
            called= true
            setTimeout(() => {
               called = false
            }, delay)
        }
    }
}




