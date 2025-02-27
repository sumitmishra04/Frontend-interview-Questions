class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const stack = []
        const result = Array(temperatures.length).fill(0)

        for (let i = 0; i < temperatures.length; i++) {
            while(stack.length > 0 && stack.at(-1).temp <  temperatures[i]) {
                const pop = stack.pop()
                result[pop.index] = i - pop.index 
            }
            stack.push({temp: temperatures[i], index: i})
        }

        for(let i = result.length; i<temperatures.length; i++) {
            result.push(0)
        }
        return result
    }
}
