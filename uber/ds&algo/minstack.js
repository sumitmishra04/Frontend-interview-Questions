class MinStack {
    constructor() {
        this.stack = []
        this.minStack = []
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val)
        if(this.minStack.length === 0 || val < this.minStack.at(-1)) {
          this.minStack.push(val)
        }
    }

    /**
     * @return {void}
     */
    pop() {
        if (this.stack.length === 0) return
        if (this.stack.at(-1) === this.minStack.at(-1)) {
            this.minStack.pop()
        }
        this.stack.pop()
    }

    /**
     * @return {number}
     */
    top() {
       return this.stack.at(-1)
    }

    /**
     * @return {number}
     */
    getMin() {
       return this.minStack.at(-1)
    }
}
