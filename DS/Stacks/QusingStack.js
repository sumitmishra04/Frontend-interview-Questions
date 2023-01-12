class Node {
    constructor(element) {
      this.element = element;
      this.next = null;
    }
  }
  
  export class Stack {
    constructor() {
      this.top = null;
      this.size = 0;
    }
    push = function (value) {
      const node = new Node(value);
      if (!this.top) {
        this.top = node;
      } else {
        node.next = this.top;
        this.top = node;
      }
      this.size++;
    };
    peek = function () {
      if (this.top) {
        return this.top.element;
      }
    };
    pop = function () {
      if (!this.top) {
        return;
      }
      const elem = this.peek;
      this.top = this.top.next;
      this.size--;
      return elem;
    };
    display = function () {
      let current = this.top;
      while (current) {
        console.log(current.element);
        current = current.next;
      }
    };
  }

function Queue() {
    const st1 = new Stack()
    const st2 = new Stack()
    return {
        enqueue: function (val) {
            while(st2.top !== null) {
                st2.push(st1.peek())
                st1.pop()
            }
            st1.push(val)
        },
        dequeue: function () {
            return st1.pop()
        },
        display: function() {
            st1.display()
        }
    }
}

const q = new Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
q.enqueue(4)
q.display()
q.dequeue()
console.log('--------')
q.display()


  