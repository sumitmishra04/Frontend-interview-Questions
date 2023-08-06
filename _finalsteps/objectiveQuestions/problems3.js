function outer() {
  const value = 42

  const obj1 = {
    value: 100,
    innerMethod: function () {
      console.log("obj1 - Inner Method:", this.value)
      const nestedArrow = () => {
        console.log("obj1 - Nested Arrow:", this.value)
      }
      nestedArrow()
    },
    innerMethodArrow: () => {
      console.log("obj1 - Inner Arrow Method:", this.value)
      const nestedFunction = function () {
        console.log("obj1 - Nested Function:", this.value)
      }
      nestedFunction()
    },
  }

  const obj2 = {
    value: 200,
    innerMethod: obj1.innerMethod,
    innerMethodArrow: obj1.innerMethodArrow,
  }

  obj1.innerMethod() // 100 100
  obj1.innerMethodArrow() // 42 42
  obj2.innerMethod() // 20 20
  obj2.innerMethodArrow() // 42 42
}

// outer()

function foo() {
  const value = 10

  const obj1 = {
    value: 100,
    log: () => {
      console.log(this)
    },
  }

  obj1.log()
}

// foo()

const obj1 = {
  value: 100,
  log: () => {
    console.log(this)
  },
}

obj1.log()
