class LRU {
  constructor(max = 5) {
    this.max = max
    this.cache = new Map()
  }

  getOldest() {
    return this.cache.keys().next().value
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size === this.max) {
      this.cache.delete(this.getOldest())
    }
    this.cache.set(key, value)
  }

  get(key) {
    if (!this.cache.has(key)) return undefined
    const item = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, item)
    return item
  }
}


const lru = new LRU(3)
lru.set("name", "sumit")
lru.set("dep", "engg")
lru.set("city", "bengaluru")
lru.set("name", "mishra")

console.log(lru.cache)
console.log(lru.get("dep"))
console.log(lru.cache)

