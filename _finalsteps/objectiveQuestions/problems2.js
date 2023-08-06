const obj = {
  name: "Alice",
  regularFunction: function () {
    console.log(this.name)
  },
  arrowFunction: () => {
    console.log(this.name)
  },
}

const arrowCopy = obj.arrowFunction
// obj.regularFunction()
// obj.arrowFunction()
// arrowCopy()

class Counter {
  constructor() {
    this.count = 0
  }

  regularMethod() {
    console.log(this.count)
  }

  arrowMethod = () => {
    console.log(this.count)
  }
}

const counter = new Counter()
// counter.regularMethod()
// const arrowMethodCopy = counter.arrowMethod
// arrowMethodCopy()

const numbers = [1, 2, 3]

const obj2 = {
  value: 10,
  regularFunction: function () {
    numbers.forEach(function (num) {
      console.log(this.value + num)
    })
  },
  arrowFunction: function () {
    numbers.forEach((num) => {
      console.log(this.value + num)
    })
  },
}

// obj2.regularFunction()
// obj2.arrowFunction()

const person = {
  name: "Alice",
  greet: function () {
    const timeoutFunc = function () {
      console.log(this.name)
    }
    setTimeout(timeoutFunc, 10)
  },
}
const person2 = {
  name: "Alice",
  greet: function () {
    const timeoutFunc = () => {
      console.log(this.name)
    }
    setTimeout(timeoutFunc, 10)
  },
}

person.greet()
person2.greet()

function regularFunction() {
  console.log(this)
}

const arrowFunction = () => {
  console.log(this)
}

// regularFunction() // called using implicit global using window
// arrowFunction() // points to the empty this object from the lexical scope

const obj3 = {
  name: "Alice",
  regularFunction: function () {
    console.log("Regular Function this:", this.name)
    const arrowFunction = () => {
      console.log("Arrow Function this:", this.name)
    }
    arrowFunction()
  },
}

const obj4 = {
  name: "Bob",
  regularFunction: obj3.regularFunction,
}

// obj3.regularFunction()
// obj4.regularFunction()
