class FirstUnique {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.freq = new Map();
    this.queue = [];       // store numbers in arrival order
    this.head = 0;         // index of current front (avoid costly shift)
    for (const n of nums) this.add(n);
  }

  /** 
   * @return {number}
   */
  showFirstUnique() {
    // Skip non-unique numbers at the front
    while (this.head < this.queue.length && this.freq.get(this.queue[this.head]) > 1) {
      this.head++;
    }
    return this.head < this.queue.length ? this.queue[this.head] : -1;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  add(value) {
    this.freq.set(value, (this.freq.get(value) || 0) + 1);
    // Only push value to queue on first arrival (still OK to push duplicates; lazy cleanup handles it).
    // We can push always as it's simpler and still correct with lazy front cleanup.
    this.queue.push(value);
  }
}
