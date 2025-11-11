class Solution {
    /**
     * @param {string} S
     * @return {number[]}
     */
    partitionLabels(s) {
    let lastIndex = {};  // Store the last occurrence of each character
    
    // Step 1: Record last occurrence of each character
    for (let i = 0; i < s.length; i++) {
        lastIndex[s[i]] = i;
    }
    console.log(lastIndex)
        let partitions = [];
        let start = 0, end = 0;
    
    // Step 2: Traverse and form partitions
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex[s[i]]); // Expand the partition
        if (i === end) { // If current index reaches the last occurrence, partition here
            partitions.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return partitions;
    }
}
