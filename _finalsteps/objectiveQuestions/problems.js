function printThis() {
  console.log(this)
}

// printThis()

const person = {
  name: "John",
  greet: function () {
    console.log("Hello, my name is " + this.name)
  },
}

const greetFunction = person.greet
// greetFunction()

function printName() {
  console.log(this.name)
}

const person1 = { name: "Alice" }
const person2 = { name: "Bob" }

// printName.call(person1)
// printName.apply(person2)

const boundFunction = printName.bind({ name: "Charlie" })
// boundFunction()

const obj = {
  value: 42,
  getValue: function () {
    return function () {
      console.log(this.value)
    }
  },
}

const getValueArrow = obj.getValue()
// getValueArrow()
// Now, with the regular function, the behavior of this is different.
// Unlike arrow functions, regular functions do not have their own this context;
// instead, the value of this inside a regular function depends on how the function is called.

const obj2 = {
  value: 42,
  getValue: function () {
    return () => {
      console.log(this.value)
    }
  },
}

const getValueArrow2 = obj2.getValue()
// getValueArrow2()
// When the arrow function is called with getValueArrow(), it prints the value of this.value.
// However, the arrow function's this context is lexically bound to the surrounding scope where
// it was defined, which is the getValue method. Therefore, the arrow function captures the value of this from the surrounding context.

const obj1 = {
  name: "Alice",
  printName: function () {
    console.log(this.name)
  },
  printNameArrow: () => {
    console.log(this.name)
  },
}

// obj1.printName()
// obj1.printNameArrow()

const person3 = {
  name: "John",
  greet: function () {
    setTimeout(
      function (self) {
        console.log("Hello, my name is " + self.name)
      },
      1000,
      this
    )
  },
  greetArrow: function () {
    setTimeout(() => {
      console.log("Hello, my name is " + this.name)
    }, 1000)
  },
}

// person3.greet()
// person3.greetArrow()

function outerFunction() {
  return function () {
    console.log(this)
  }
}

const innerArrow = () => {
  console.log(this)
}

const innerRegular = outerFunction()

innerArrow()
// innerRegular()
