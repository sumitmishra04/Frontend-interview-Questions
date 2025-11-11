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
