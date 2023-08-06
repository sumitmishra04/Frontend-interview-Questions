// Q1) Print numbers from 10 to 1 with delay of 1 second between each value being printed using setTimeout using pre ES6 features only
// Q2) Write a utility which prints numbers starting from an initial value and increment in steps which can be
//    started and stopped by the user, any number of times
// Q3) promise.all
// Q4) deepCopy from polyfill.js
// Q5) isNan from polyfill.js
// Q6) isInt from polyfill.js
// Q7) call, apply bind : cab: https://medium.com/developers-arena/how-to-create-a-polyfill-for-call-apply-and-bind-917ae110edc3
// Q9) find if a property is inherited from another or not
// 10) debounce and throttling

// see if obj1 is an instance of obj2
function myInstanceof(obj1, obj2) {
  let proto = Object.getPrototypeOf(obj1)
  while (proto !== null) {
    if (proto === obj2.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

Function.prototype.mycall = function (obj, ...args) {
  obj.fn = this
  obj.fn(...args)
}

Function.prototype.myapply = function (obj, args) {
  obj.fn = this
  obj.fn(...args)
}

Function.prototype.mybind = function (obj, ...args) {
  obj.fn = this
  return function (...next) {
    obj.fn(...args, ...next)
  }
}

const o = {
  name: "sumit",
  getName: function (v1, v2) {
    console.log(this.name, v1, v2)
  },
}
const o2 = {
  name: "mishra",
}

console.log(o.getName.mybind(o2, 1, 2)())
console.log(o.getName.mycall(o2, 1, 2))
console.log(o.getName.myapply(o2, [1, 2]))

function isNan(number) {
  return typeof number === "number" && number != number
}

function isInt(number) {
  return number % 1 === 0
}

function deepCopy(source) {
  const destination = {}
  Object.keys(source).forEach((property) => {
    if (Array.isArray(source[property])) {
      destination[property] = source[property].map((value) => deepCopy(value))
    } else if (typeof source[property] === "object") {
      destination[property] = deepCopy(source[property])
    } else {
      destination[property] = source[property]
    }
  })

  return destination
}

const obj1 = {
  name: "sumit",
  name1: "null",
  age: 30,
  address: {
    city: "konnagar",
    district: {
      name: "hooghly",
      pin: 712246,
    },
  },
  phones: [
    {
      number: "102",
    },
    {
      number: "11",
    },
  ],
}

const obj2 = deepCopy(obj1)

// console.log(obj2)
// obj1.phones[0].number = "1"
// obj1.age = "1"
// console.log(obj1)
// console.log(obj2)

function All(promises) {
  return new Promise((resolve, reject) => {
    const result = []
    let resolvedPromise = 0

    promises.forEach((promise, i) => {
      promise
        .then((data) => {
          resolvedPromise = resolvedPromise + 1
          result[i] = data
          if (resolvedPromise.length === promises.length) {
            resolve(result)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

function print() {
  for (let i = 10; i > 0; i--) {
    setTimeout(() => {
      console.log(i)
    }, (10 - i) * 1000)
  }
}
// print()

function increment(num) {
  this.num = num
  this.timer
  this.start = function (num) {
    this.timer = setTimeout(() => {
      console.log(num)
      this.start(num + 1)
    }, 1000)
  }
  this.stop = function (num) {
    clearTimeout(this.timer)
  }
}

const timer = new increment()
// timer.start(1)
setTimeout(() => {
  //   timer.stop()
}, 5000)
