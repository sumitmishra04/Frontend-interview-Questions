class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number}
     */
    hammingWeight(n) {
        let count = 0
        while (n !== 0) {
            count++
            n = n & n - 1
        }
        return count
    }
}
// Time Complexity: O(k), where k is the number of 1s in n.In the worst case, O(log n).

// Let's take n = 11 (binary 1011), and apply this technique.

// Step 1: Initial Binary Representation
// plaintext
// Copy
// Edit
// n = 1011(decimal 11)
// n - 1 = 1010(decimal 10)
// Now, compute n & (n - 1):

// plaintext
// Copy
// Edit
// 1011(n)
//     & 1010(n - 1)
// ------------
//     1010(new n)
// The rightmost 1 in 1011 was removed.
//     count = 1(we counted one 1 bit so far).
//         Step 2: Next Iteration
// plaintext
// Copy
// Edit
// n = 1010(decimal 10)
// n - 1 = 1001(decimal 9)
// Now, compute n & (n - 1):

// plaintext
// Copy
// Edit
// 1010(n)
//     & 1001(n - 1)
// ------------
//     1000(new n)
// The rightmost 1 in 1010 was removed.
//     count = 2.
// Step 3: Next Iteration
// plaintext
// Copy
// Edit
// n = 1000(decimal 8)
// n - 1 = 0111(decimal 7)
// Now, compute n & (n - 1):

// plaintext
// Copy
// Edit
// 1000(n)
//     &  0111(n - 1)
// ------------
//    0000(new n)
// The last remaining 1 in 1000 was removed.
//     count = 3.
// Step 4: Stop Condition
// n is now 0, so we stop.
// The total number of 1s counted = 3.