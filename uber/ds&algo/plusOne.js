class Solution {
    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    plusOne(digits) {
        let digit = 0
        let count  = 1
        for(let i = digits.length-1; i>=0;i--) {
            digit += digits[i] * count
            count *= 10 
        }
        digit = digit + 1
        const arr = []
        while(digit > 0) {
            const mod = digit%10
            digit = Math.floor(digit/10)
            arr.unshift(mod)
        }
        return arr
    }
}
