class HitCounter {
    constructor() {
        this.times = new Array(300).fill(0);
        this.hits = new Array(300).fill(0);
    }

    /** Record a hit.
     * @param {number} timestamp - The current timestamp (in seconds granularity). */
    hit(timestamp) {
        let idx = timestamp % 300;
        if (this.times[idx] !== timestamp) {
            this.times[idx] = timestamp;
            this.hits[idx] = 1;
        } else {
            this.hits[idx]++;
        }
    }

    /** Return the number of hits in the past 5 minutes.
     * @param {number} timestamp - The current timestamp (in seconds granularity). */
    getHits(timestamp) {
        let res = 0;
        for (let i = 0; i < 300; i++) {
            if (timestamp - this.times[i] < 300) {
                res += this.hits[i];
            }
        }
        return res;
    }
}
