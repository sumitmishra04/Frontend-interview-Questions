const Person = function (name) {
  this.name = name
  this.canTalk = true
}

Person.prototype.greet = function () {
  if (this.canTalk) {
    console.log("Hi, I am " + this.name)
  }
}

const Employee = function (name, title) {
  Person.call(this, name)
  this.title = title
}

Employee.prototype = Object.create(Person.prototype)
Employee.prototype.constructor = Employee
//If you don't set Object.prototype.constructor to Employee,
//it will take prototype.constructor of Person (parent).
//To avoid that, we set the prototype.constructor to Employee (child).

Employee.prototype.greet = function () {
  if (this.canTalk) {
    console.log("Hi, I am " + this.name + ", the " + this.title)
  }
}

const Customer = function (name) {
  Person.call(this, name)
}

Customer.prototype = Object.create(Person.prototype)
Customer.prototype.constructor = Customer
//If you don't set Object.prototype.constructor to Customer,
//it will take prototype.constructor of Person (parent).
//To avoid that, we set the prototype.constructor to Customer (child).

const Mime = function (name) {
  Person.call(this, name)
  this.canTalk = false
}

Mime.prototype = Object.create(Person.prototype)
Mime.prototype.constructor = Mime
//If you don't set Object.prototype.constructor to Mime,
//it will take prototype.constructor of Person (parent).
//To avoid that, we set the prototype.constructor to Mime (child).

const bob = new Employee("Bob", "Builder")
const joe = new Customer("Joe")
const rg = new Employee("Red Green", "Handyman")
const mike = new Customer("Mike")
const mime = new Mime("Mime")

bob.greet()
// Hi, I am Bob, the Builder

joe.greet()
// Hi, I am Joe

rg.greet()
// Hi, I am Red Green, the Handyman

mike.greet()
// Hi, I am Mike

mime.greet()

// q1
function sum(...nums) {
  console.log(nums)
}
sum(4, 5)
sum(5, 6, 7, 8)

// q2
let arr1 = [1, 2, 3, 4, 5]
let arr2 = [...arr1, 6, 7, 8]
console.log(arr1)

// q3
let arr = [1, 5, 89, 5, 900, 234, 1456]
console.log(Math.max(...arr))

// q4
const arrayValue = [1, 2, 3, 4]
const [x, ...y] = arrayValue
console.log(x)
console.log(y)

const [k, l, ...m] = arrayValue
console.log(k)
console.log(l)
console.log(m)

// q5
const r2d2 = {
  name: "R2-D2",
  height: "96",
  mass: "32",
}
const { name, ...anotherValues } = r2d2
console.log(name)
console.log(anotherValues)

// q6
const arrayValue = [1, 2, 3, 4]
const arrayValue2 = [...arrayValue, 5, 6]
console.log(arrayValue2)

// q7
let array1 = [1, 2]

let array2 = [...arr1]

console.log(array1)
console.log(array2)

array1.push(5)

console.log(array1)
console.log(array2)

// q8
const object1 = { a: 1, b: 2 }
const object2 = { c: 3 }

const object3 = { ...object1, ...object2 }

console.log(object3)

// q9
const object1 = { a: 1, b: 2 }
const object2 = { c: 3, b: 4 }
const object3 = { ...object1, ...object2 }
console.log(object3)
const object4 = { ...object2, ...object1 }
console.log(object4)
