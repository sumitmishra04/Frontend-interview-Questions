// You should aim for a solution with O(n) time and O(n) space, where n is the size of the input array.

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const freqMap = new Map()
        for(let num of nums) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1)
        }
        const bucket = Array.from({length: nums.length+1}, () => [])

        for(let [num, freq] of freqMap) {
            bucket[freq].push(num)
        }
        const result = []
        for(let i = nums.length; i>=0; i--) {
            if(bucket[i].length > 0 && result.length < k) {
                for(let num of bucket[i]) {
                    result.push(num)
                    if(result.length >= k) break
                }
            }
        }
        return result
    }
}
