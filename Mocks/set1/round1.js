let a = {},
    b = { key: 'b' },
    c = { key: 'c' };
a[b] = 123;
a[c] = 456;
console.log(a[b]);

Array.prototype.myMap = function (cb) {
    const array = this

    const result = []
    for (let i = 0; i < array.length; i++) {
        result.push(cb(array[i], i, array))
    }
    return result
}

// Promise.all => waits for all promises to fulfill; rejects if any reject
// Promise.any => resolves with the first fulfilled value; rejects only if all fail (AggregateError)
// Promise.race => returns the first settled promise (fulfilled OR rejected)


const obj = {
    a: 1,
    b: {
        c: 2,
        d: [1, 2, 3, { e: 9 }]
    },
    f: null
}


const deepClone = function (obj, seen = new WeakMap()) {
    let result = {}
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            return obj[key].map(el => typeof el === 'object' && el !== null ? deepClone(el) : el)
        }
        else if (typeof obj[key] === 'object' && obj[key] !== null) {
            result = { ...result, [key]: deepClone(obj[key]) }
        } else {
            result[key] = obj[key]
        }
    }
    return result
}

console.log(JSON.stringify(deepClone(obj)))

{
    function foo() {
        console.log(this.bar);
    }

    const bar = 'global';
    const obj = {
        bar: 'object',
        foo: foo
    };

    const baz = obj.foo;
    baz();
}


function log() {
    console.log('hello')
}

myTimoeut(log, 2000)

function myTimoeut(fn, delay) {
    const timer = setInterval(() => {
        fn()
        clearInterval(timer)
    }, delay)
}

{
    const input = {
        a: {
            b: {
                c: 1,
                d: 2
            },
            f: {
                w: 2
            }
        },
        d: 2
    }


    function flattenObject(input) {
        let result = {}
        function helper(obj, prefix) {
            for (let key in obj) {
                const newKey = prefix ? `${prefix}.${key}` : key
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    helper(obj[key], newKey)
                } else {
                    result[newKey] = obj[key]
                }
            }
        }
        helper(input, '')
        return result
    }

    console.log(flattenObject(input))
}

{
    function dateNextFriday() {
        const today = new Date()
        const dayNum = today.getDay()
        let dayToAdd = 7
        if (dayNum < 5) {
            dayToAdd = 5 - dayNum
        } else if (dayNum > 5) {
            dayToAdd = 12 - dayNum
        }
        return new Date(today.setDate((new Date()).getDate() + dayToAdd))
    }
}