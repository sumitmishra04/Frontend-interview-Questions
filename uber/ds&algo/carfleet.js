class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        const pairs = []
        const stack = []
        for(let i =0;i< position.length; i++) {
            pairs.push([position[i],speed[i] ])
        }
        pairs.sort((a,b) => b[0] -a[0])

        for(let i =0;i<pairs.length; i++) {
            const [pos, spd] = pairs[i]
            const time = (target - pos) / spd
           if (stack.length === 0 || time > stack.at(-1)) {
                stack.push(time)
            }
        }
        return stack.length;
    }
}

const sol = new Solution()
sol.carFleet(10, [9,4,7,1,0], [2,5,1,8,4]  )
