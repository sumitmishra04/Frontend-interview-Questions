// const p = new Promise((resolve) => {
//   console.log(1)
//   setTimeout(() => {
//     resolve()
//   })
// })

// Promise.resolve().then(() => console.log(2))
// setTimeout(() => console.log(3))
// p.then(() => console.log(4))
// setTimeout(() => console.log(5))

// function doSomething() {
//   return new Promise(function (resolve, reject) {
//     reject()
//     resolve()
//   })
// }

// let promise = doSomething()

// promise
//   .then(function () {
//     console.log("Success 1")
//   })
//   .then(function () {
//     console.log("Success 2")
//   })
//   .catch(function () {
//     console.log("Error 1")
//   })
//   .then(function () {
//     console.log("Success 3")
//     return doSomething()
//   })
//   .finally(function () {
//     console.log("Finally")
//   })

// function add(a, b) {
//   return a + b
// }

// function sub(a, b) {
//   return a - b
// }

// function opFunc(operation) {
//   switch (operation) {
//     case "ADD":
//       return add
//     case "SUB":
//       return sub
//     default:
//       return null
//   }
// }

// console.log(opFunc("ADD")(5, 3), opFunc("SUB")(5, 3))

// const s = "phonepe"
// s[6] = "a"
// s[7] = "y"
// console.log(s[7])

// let person1 = {
//   name: "sunil chaudhary",
//   address: {
//     linel: "kanpur",
//     line2: "Uttar Pradesh",
//   },
// }

// let person2 = {
//   ...person1,
// }

// person1.name = "anil chaudhary"
// person1.address.linel = "Bangalore"
// console.log(person1) // ac, b, u
// console.log(person2) // sc, k, u
