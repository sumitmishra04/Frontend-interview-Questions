class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    getSum(a, b) {
        while (b != 0) {
            const carry = (a & b) << 1
            a = a ^ b
            b = carry
        }
        return a
    }
}

// Step 1:
// a = 101(5)
// b =  011(3)
// carry = (a & b) << 1 = (101 & 011) << 1 = 001 << 1 = 010(2)
// sum = a ^ b = 101 ^ 011 = 110(6)
// Now, a = 6, b = 2

// Step 2:
// a = 110(6)
// b = 010(2)
// carry = (a & b) << 1 = (110 & 010) << 1 = 010 << 1 = 100(4)
// sum = a ^ b = 110 ^ 010 = 100(4)
// Now, a = 4, b = 4

// Step 3:
// a = 100(4)
// b = 100(4)
// carry = (a & b) << 1 = (100 & 100) << 1 = 100 << 1 = 1000(8)
// sum = a ^ b = 100 ^ 100 = 000(0)
// Now, a = 0, b = 8

// Step 4:
// a = 000(0)
// b = 1000(8)
// carry = (a & b) << 1 = (000 & 1000) << 1 = 0000 << 1 = 0000(0)
// sum = a ^ b = 000 ^ 1000 = 1000(8)
// Now, a = 8, b = 0

// Final sum = 8 ✅
