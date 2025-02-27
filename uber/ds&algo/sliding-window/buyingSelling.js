// go through the array 
// if price is less tha min, update min to that price
// else it means we have a profit and hence update max profit (price-minPrice)

class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let minPrice = Infinity;
        let maxProfit = 0;

        for (let price of prices) {
            if(price < minPrice) {
                minPrice = Math.min(minPrice, price)
            } else {
                maxProfit = Math.max(maxProfit, price-minPrice)
            }
        }
        return maxProfit;
    }
}

const sol = new Solution()
const prices = [7, 1, 5, 3, 6, 4];

console.log(sol.maxProfit(prices))