/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} k
     * @return {number}
     */
    inOrder(root, result) {
        if(!root) return root
        this.inOrder(root.left, result)
        result.push(root.val)
        this.inOrder(root.right, result)
        return result
    }
    kthSmallest(root, k) {
        const data = this.inOrder(root, [])
        return data[k-1]
    }
}
