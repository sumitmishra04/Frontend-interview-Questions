class Node {
    constructor(value, left= null, right=null) {
        this.value = value;
        this.left=left;
        this.right=right;
    }
}

class BST {
    constructor() {
        this.root = null
    }
    
    insert(value) {
        const newNode = new Node(value)
        if(this.root === null) {
            this.root = newNode
            return this
        } else {
            let currNode = this.root
            while(true) {
                if(value < currNode.value) {
                    if(currNode.left === null) {
                        currNode.left = newNode
                        return this
                    }
                    currNode = currNode.left
                } else {
                    if( value > currNode.value) {
                        if(currNode.right === null) {
                            currNode.right = newNode
                            return this
                        }
                        currNode = currNode.right
                    }
                }
            }
        }
    }
    
    inOrder(node=this.root, result=[]) {
        if (!node) return result;
        this.inOrder(node.left, result)
        result.push(node.value)
        this.inOrder(node.right, result)
        return result
    }
    levelOrder() {
        const queue = [this.root]
        const result = []
        while(queue.length) {
            const node = queue.shift()
            result.push(node.value)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        return result
    }
    
    invert(node = this.root) {
        node = node || this.root;
        if (!node) return null;        
        [node.left, node.right] = [node.right, node.left]
        if (node.left)  this.invert(node.left)
        if (node.right)  this.invert(node.right)
        return node
    }
}

const tree = new BST();
tree.insert(10).insert(12).insert(3).insert(7).insert(11).insert(6).insert(15);

console.log("Original in-order:", tree.inOrder());
console.log("Original level-order:", tree.levelOrder());

tree.invert(); // invert in place

console.log("Inverted in-order:", tree.inOrder());
console.log("Inverted level-order:", tree.levelOrder());