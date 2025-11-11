class MinHeap {
    constructor() {
        this.heap = []
    }

    push(val) {
        this.heap.push(val)
        this.heap.sort((a,b) => a-b)
    }

    pop() {
        return this.heap.shift()
    }

    size() {
      return this.heap.length
    }
}

function furthestBuilding(heights, bricks, ladders) {
    let minHeap = new MinHeap();

    for (let i = 0; i < heights.length - 1; i++) {
        let diff = heights[i + 1] - heights[i];

        if (diff > 0) {
            minHeap.push(diff);  // Store climb cost

            if (minHeap.size() > ladders) {
                bricks -= minHeap.pop();  // Use bricks for the smallest jumps
            }

            if (bricks < 0) return i;  // Stop if bricks are exhausted
        }
    }
    return heights.length - 1;  // If we finish the loop, we reached the last building
}

// Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
// Output: 7