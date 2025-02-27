class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        const map = {}
        for(let i = 0; i< numbers.length; i++) {
            const compliment = target - numbers[i]
            if(compliment in map){
                return [map[compliment], i+1]
            }
            map[numbers[i]] = i+1
        }
    }
}
