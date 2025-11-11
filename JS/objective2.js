// 1. make api call of an array of urls with maxApiCall cap such that nt more than maxApiCall(eg: 2) will be fired.
// 2. merge objects from falconX
// 3. once
// 4. memoisedSquare
// 5. genericCurry
// 6. logger
// 8. prachi's questions

async function fetcher(id) {
  return new Promise((res) => {
    setTimeout(() => {
      res("User " + id)
    }, Math.floor(Math.random() * 2000))
  })
}
function fetchRecords(ids) {}

const data = fetchRecords([1, 2, 3, 4, 5])
console.log(data) // ["User 1", "User 2", "User 3", "User 4", "User 5"]

async function fetcher(id) {
  return new Promise((res) => {
    const timer = Math.floor(Math.random() * 2000)

    setTimeout(() => {
      res("User " + id)
    }, timer)
  })
}

// ["User 1", "User 2", "User 3", "User 4", "User 5"]
async function fetchRecords(ids) {
  const result = []
  for (let i = 0; i < ids.length; i++) {
    const promise = fetcher(ids[i])
    const res = await promise
    result[i] = res
  }
  return result
}

const data = fetchRecords([1, 2, 3, 4, 5])
data.then(console.log)

// in the order of Fetcher response
async function fetchRecords2(ids) {
  const promises = ids.map((id) => fetcher(id))
  const values = []

  const promise = new Promise((res) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]

      promise.then((value) => {
        values.push(value)
        if (values.length === 5) {
          res(values)
        }
      })
    }
  })

  const value = await promise
  return value
}

const data2 = fetchRecords2([1, 2, 3, 4, 5])
data2.then(console.log)

// in the order of Fetcher response
async function fetchRecords3(ids) {
  const promises = ids.map((id) => fetcher(id))
  const values = []

  const promise = new Promise((res) => {
    function helper(promises) {
      const promise = promises.shift()
      if (!promise) {
        res(values)
        return
      }
      promise.then((value) => {
        values.push(value)
        helper(promises)
      })
    }

    helper(promises)
  })

  const value = await promise
  return value
}

const data3 = fetchRecords3([1, 2, 3, 4, 5])
data3.then(console.log)

function logger(prefix) {
  return function (message) {
    return prefix + message
  }
}

const loggerInfo = logger("[INFO]")

console.log(loggerInfo("This is an information message."))
console.log(loggerInfo("Welcome."))
console.log(loggerInfo("Home."))

function add(a, b, c, d) {
  return a + b + c + d
}

function genericCurry(cb) {
  return function currify(...args) {
    if (args.length >= cb.length) {
      return cb(...args)
    } else {
      return function (...next) {
        return currify(...args, ...next)
      }
    }
  }
}
const curriedSum = genericCurry(add)
console.log(curriedSum(1, 2, 3))
console.log(curriedSum(10)(2)(3))
console.log(curriedSum(10)(2, 3, 12))

function once(cb) {
  let calledOnce = false
  let result

  return function (...args) {
    if (calledOnce) {
      return result
    }
    result = cb(...args)
    calledOnce = true
    return result
  }
}
const onceAdd = once(add)
// console.log(onceAdd(1, 2, 3))
// console.log(onceAdd(1, 2, 1))
// console.log(onceAdd(1, 2, 2))

function isObject(obj) {
  return obj !== null && Object.getPrototypeOf(obj) === Object.prototype
}

function merge(src, dest) {
  for (let key in src) {
    if (!isObject(src[key])) {
      dest = { [key]: src[key], ...dest }
    } else {
      if (dest[key]) {
        dest[key] = { ...src[key], ...dest[key] }
      } else {
        dest[key] = merge(src[key], dest[key])
      }
    }
  }
  return dest
}

const catBro = {
  name: "hopper",
  color: "white",
  body: {
    legs: 30,
    eyes: 10,
  },
  food: "fish",
}

const doggo = {
  name: "pirate",
  color: "gray",
  body: {
    limbs: {
      hands: 2,
      legs: 1,
    },
    eyes: 1,
  },
}

const res = merge(catBro, doggo)
// console.log(res)
