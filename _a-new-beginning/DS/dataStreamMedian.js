// .front(), .empty(), .enqueue(), .dequeue(), .size()
// You should aim for a solution with O(logn) time for addNum(), O(1) time for findMedian(), and O(n) space, where n is the current number of elements.
class MedianFinder {
    constructor() {
        this.small = new PriorityQueue((a,b) => b-a)
        this.large = new PriorityQueue((a,b) => a-b)
    }

    /**
     * @param {number} num
     */
    addNum(num) {
       if(this.small.isEmpty() || num < this.small.front()) {
        this.small.enqueue(num)
       } else {
        this.large.enqueue(num)
       }

       if(this.small.size() > this.large.size() + 1) {
         this.large.enqueue(this.small.dequeue())
       } else if(this.small.size() + 1 > this.large.size()) {
        this.small.enqueue(this.small.dequeue())
       }
    }

    /**
     * @return {number}
     */
    findMedian() {
        if(this.small.size() > this.large.size()) {
            return this.small.front()
        } else if(this.small.size() < this.large.size()) {
            return this.large.front()
        } else {
            return (this.small.front() + this.large.front()) / 2.0
        }
    }
}