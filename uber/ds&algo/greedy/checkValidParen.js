class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    checkValidString(s) {
        let minOpen = 0, maxOpen = 0
        for (let char of s) {
            if (char === '(') {
                minOpen++
                maxOpen++
            } else if (char === ')') {
                minOpen = Math.max(0, minOpen - 1);
                maxOpen--
                if (maxOpen < 0) return false
            } else if (char === '*') {
                minOpen = Math.max(0, minOpen - 1);
                maxOpen++
            }
            if (maxOpen < 0) return false; // Too many `)`
        }
        return minOpen === 0;
    }
}
