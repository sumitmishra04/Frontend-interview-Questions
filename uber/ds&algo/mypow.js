class Solution {
    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    myPow(x, n) {
       if(n === 1) return x
       if(n<0) {
        x = 1/x
        n = -n
       }

       let result = 1
       while(n>0) {
         if(n%2 === 1) result = result*x
         x = x*x
         n=Math.floor(n/2)
       }
       return result
    }
}
