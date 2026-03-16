//k stops means k + 1 edges to traverse
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    // O(E.k)
    findCheapestPrice(n, flights, src, dst, k) {
        let prices = Array.from({length: n}, () => Infinity)// prices[x] = cheapest price to reach city x
        prices[src]=0 // Start city has cost 0
        // Why k+1?
        // With 0 stops → 1 flight
        // With k stops → k+1 flights
        // You need exactly k+1 edge relaxations
        // This limits the number of edges in any path you consider.
        for(let i = 0; i<k+1; i++) {
            // This is critical.
            // prices = previous iteration’s results
            // tempPrices = new results for this iteration
            // If you update prices directly, you accidentally allow unlimited stops.
            // Using tempPrices prevents chaining more than one flight per iteration.
            const tempPrices = [...prices]
            for(let [s, d, p] of flights) {
                if(prices[s] === Infinity) continue
                if(prices[s] + p < tempPrices[d]) {
                    tempPrices[d] = prices[s] + p
                }
            }
            prices = tempPrices
        }
        return prices[dst] === Infinity ? -1 : prices[dst]
    }
}

// Time: O(k * E)
// k+1 iterations × all flights
// Space: O(n)
