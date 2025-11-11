class Solution {
    /**
     * @param {string} digits
     * @return {string[]}
     */
    letterCombinations(digits) {
        if (!digits.length) return [];

        // Mapping of digits to corresponding letters
        const phoneMap = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz"
        };

        const result = [];

        // Backtracking function
        function backtrack(index, path) {
            // If the path length equals the digits length, add to result
            if (path.length === digits.length) {
                result.push(path.join(""));
                return;
            }

            // Get the current digit and its corresponding letters
            const letters = phoneMap[digits[index]];
            for (const letter of letters) {
                path.push(letter);      // Choose a letter
                backtrack(index + 1, path);  // Move to the next digit
                path.pop();             // Undo choice (Backtrack)
            }
        }

        backtrack(0, []);
        return result;
    }
}

// Time Complexity: O(4^N), where N is the number of digits (each digit can have up to 4 choices).
// Space Complexity: O(N), due to recursion depth.