class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.size = capacity
        this.cache = new Map()
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if(!this.cache.has(key)) return -1
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.put(key, value)
        return value
    }

    #oldestItem() {
        return this.cache.keys().next().value
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if(this.cache.has(key)) {
            this.cache.delete(key)
        }
        else if(this.cache.size === this.size) {
            this.cache.delete(this.#oldestItem())
        }
        this.cache.set(key, value)
    }
}
