var TimeLimitedCache = function () {
  this.obj = {}
}

TimeLimitedCache.prototype.set = function (key, value, duration) {
  const isKeyPresent = key in this.obj

  this.obj[key] = value
  setTimeout(() => {
    delete this.obj[key]
  }, duration)

  return isKeyPresent
}

TimeLimitedCache.prototype.get = function (key) {
  if (key in this.obj) {
    return this.obj[key]
  }
  return -1
}

TimeLimitedCache.prototype.count = function () {
  return Object.keys(this.obj).length
}

var obj = new TimeLimitedCache()
console.log(obj.set(1, 42, 1000)) // false
console.log(obj.get(1)) // 42
console.log(obj.count()) // 1
