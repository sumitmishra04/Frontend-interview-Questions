// There are n gas stations along a circular route. You are given two integer arrays gas and cost where:

// gas[i] is the amount of gas at the ith station.
// cost[i] is the amount of gas needed to travel from the ith station to the (i + 1)th station. (The last station is connected to the first station)
// You have a car that can store an unlimited amount of gas, but you begin the journey with an empty tank at one of the gas stations.

// Return the starting gas station's index such that you can travel around the circuit once in the clockwise direction. If it's impossible, then return -1.

// It's guaranteed that at most one solution exists.

// Example 1:

// Input: gas = [1,2,3,4], cost = [2,2,4,1]

// Output: 3

class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    // gas:   [1,  2,  3,  4,  5]
    // cost:  [3,  4,  5,  1,  2]
    // net:   [-2, -2, -2, +3, +3]

    canCompleteCircuit(gas, cost) {
        const gasTotal = gas.reduce((a,c) => a+c)
        const costTotal = cost.reduce((a,c) => a+c)

        if(gasTotal<costTotal) return -1

        let startIndex = 0, lastGas= 0
        
        for(let i =0;i<gas.length;i++) {
            lastGas += gas[i] - cost[i]
            if(lastGas<0) {
               startIndex = i+1
               lastGas= 0
            }
        }
        return startIndex
    }
}
