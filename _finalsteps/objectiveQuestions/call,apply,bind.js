Function.prototype.mybind = function (obj, ...args) {
  const self = this

  return function (...nextArgs) {
    return self.apply(obj, [...nextArgs, ...args])
  }
}

const obj = {
  name: "sumit",
  getName: function (value) {
    console.log(value)
    return this.name
  },
}

const obj2 = {
  name: "mishra",
}

console.log(obj.getName.mybind(obj2, obj.name)(1, 2))
