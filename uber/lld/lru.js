class LRU {
    constructor(max = 5) {
        this.max = max
        this.cache = new Map()
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else if (this.cache.size === this.max) {
            this.cache.delete(this.#first())
        }
        this.cache.set(key, value)
    }

    #first() {
        return this.cache.keys().next().value;
    }

    get(key) {
        let item = this.cache.get(key)
        if (item) {
            this.cache.delete(key)
            this.cache.set(key, item)
        }
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

