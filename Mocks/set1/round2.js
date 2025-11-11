function debounce(cb, delay, options = {}) {
    const { trailing = true, leading = false } = options;
    let timer
    let called = false
    return function (...args) {
        if (!timer && leading) {
            cb(...args)
            called = true
        }

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            if (trailing && (!leading || called)) {
                cb(...args)
            }
            called = false
            timer = null;
        }, delay)
    }
}



Function.prototype.mybind = function (context, ...args) {
    const self = this
    return function (...nextArgs) {
        self.apply(context, [...args, ...nextArgs])
    }
}

let x = 10;
function closureExample() {
    let x = 20;
    return function () {
        console.log(x);
    };
}
closureExample()();


const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2;
console.log(obj.a);

function memioze(fn) {
    const cache = new Map()
    return function (...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) {
            return cache.get(key)
        } else {
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
        }
    }
}

function sum(a, b) {
    console.log('computing', a, b)
    return a + b
}
const s = memioze(sum)
console.log(s(1, 2))
console.log(s(1, 2))
console.log(s(2, 2))
console.log(s(2, 2))