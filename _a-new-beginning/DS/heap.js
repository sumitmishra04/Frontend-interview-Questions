// for any index n the left child is at 2n + 1 and right at 2n+2. Parent will be at Math.floor(n-1/2)
// max heap has parent always greater than children.
// Insert: Add to the end and bubble up. compare child to parent if child is bigger swap
class MaxHeap {
    constructor() {
        this.values = []
    }
    insert(val){
        this.values.push(val)
        this.bubbleUp()
    }
    bubbleUp() {
        const idx = this.values.length - 1
        const element = this.values[element]
        const parentIdx = Math.floor((idx - 1) / 2)
        const parent = this.values[parentIdx]
        while(idx > 0) {
            if(parent >= element) break
            this.values[parentIdx] = element
            this.values[element] = parent
            idx = parentIdx
        }
    }
    extractMax() {
        const max = this.values[0]
        const end = this.values.pop()
        this.values[0] = end
        this.sinkDown()
        return max
    }
    sinkDown() {
        let idx = 0
        const length = this.values.length
        const element = this.values[0]
        while(true) {
            
        }
    }
}