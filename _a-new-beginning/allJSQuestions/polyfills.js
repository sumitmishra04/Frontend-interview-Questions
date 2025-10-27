
/*================================================================================================
Array.prototype.myMap = (cb) => {
    if(!Array.isArray(this)) {
    throw new TypeError
    }
}
================================================================================================*/


/*================================================================================================

Array.prototype.myReduce = function (cb, initialValue) {
  let computedResult = initialValue
  for (let i = 0; i < this.length; i++) {
    computedResult = cb(computedResult, this[i])
  }
  return computedResult
}

console.log(
  [1, 2, 3, 4].myReduce((acc, value) => {
    return acc + value
  }, 0)
)

================================================================================================*/


/*================================================================================================

Array.prototype.myFilter = function (cb) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    const value = cb(this[i], i, this)
    if (value) {
      result.push(this[i])
    }
  }
  return result
}

console.log(
  [1, 2, 3, 4].myFilter((value) => {
    return value > 2
  })
)
================================================================================================*/


/*================================================================================================
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
================================================================================================*/


/*================================================================================================


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
================================================================================================*/

/*================================================================================================

function isNan(number) {
  return typeof number === "number" && number != number
}

function isInt(number) {
  return number % 1 === 0
}

function isObject(obj) {
  return obj !== null && Object.getPrototypeOf(obj) === Object.prototype
}
================================================================================================*/

/*================================================================================================

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
================================================================================================*/

/*================================================================================================

================================================================================================*/

/*================================================================================================

================================================================================================*/

/*================================================================================================

================================================================================================*/

/*================================================================================================

================================================================================================*/

/*================================================================================================

================================================================================================*/

/*================================================================================================

================================================================================================*/

