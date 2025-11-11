// Palindrome Partitioning
// Given a string s, split s into substrings where every substring is a palindrome. Return all possible lists of palindromic substrings.

// You may return the solution in any order.

// Example 1:

// Input: s = "aab"

// Output: [["a","a","b"],["aa","b"]]

class Solution {
    /**
     * @param {string} s
     * @return {string[][]}
     */
    partition(s) {
        const result = []
        function isPallindrome(s, l, r) {
            while (l <= r) {
                if (s[l] !== s[r]) return false
                l++;
                r--;
            }
            return true
        }
        function backtrack(start, path) {
            if (start === s.length) {
                result.push([...path])
                return
            }
            for (let end = start; end < s.length; end++) {
                if (isPallindrome(s, start, end)) {
                    path.push(s.substring(start, end + 1))
                    backtrack(end + 1, path)
                    path.pop()
                }
            }
        }
        backtrack(0, [])
        return result
    }
}

// Time Complexity: O(N * 2^N)
// We have 2^N partitions.
// Checking for a palindrome takes O(N).
// Space Complexity: O(N)
// Used for recursion stack.