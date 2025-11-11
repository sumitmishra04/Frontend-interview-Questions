class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isHappy(n) {
        const set = new Set()
        function helper(n) {
          const sum = n.toString().split('').reduce((acc, curr)=> {
            return acc + parseInt(curr)*parseInt(curr)
          }, 0)
            if(sum === 1) {
                return true
            } else if(set.has(sum)) {
                return false
            } else {
                set.add(sum)
                return helper(sum)
            }
        }
        return helper(n)
    }
}
