const globalThis = this
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis
  const uniqueKey = Symbol()
  context[uniqueKey] = this
  const result = context[uniqueKey](...args)
  delete context[uniqueKey]
  return result
}

Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis
  const uniqueKey = Symbol()
  context[uniqueKey] = this
  const result = context[uniqueKey](...args)
  delete context[uniqueKey]
  return result
}

Function.prototype.myBind = function(context, ...args) {
  const fn = this
  return function(...laterArgs) {
      return fn.apply(context, ...args, ...laterArgs)
  }
}

const obj = {
  name: 'John',
  age: 50,
  city: 'London'
}

function getName(title) {
  return this.name + title
}

function ageMultiple(num) {
  return this.age * num
}
const callResult = getName.call(obj, 'Cena')
console.log('>>>>>',callResult)

function getName(title) {
  return this.name + title
}
const applyResult = ageMultiple.apply(obj, [2])
console.log('>>>>>',applyResult)
