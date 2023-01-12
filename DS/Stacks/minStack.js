class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
    this.min = Infinity;
  }
  push = function (value) {
    const node = new Node();
    if (!this.top) {
      node.value = value;
      this.top = node;
      this.min = value;
    } else {
      if (value < this.min) {
        node.value = 2 * value - this.min;
        this.min = value;
      } else {
          node.value = value
      }
      node.next = this.top;
      this.top = node;
    }
    this.size++;
  };
  peek = function () {
    if (this.top) {
        if(this.top.value > this.min) {
            return this.top.value;
        } else {
            return this.min
        }
    }
  };
  pop = function () {
    if (!this.top) {
      return;
    }
    const elemPopped = this.peek()
    if(this.top.value < this.min ) {
        this.min = 2*this.min - this.top.value
    }
    this.top = this.top.next;
    this.size--;
    return elemPopped;
  };
  display = function () {
    let current = this.top;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  };
  getMin = function () {
    if (this.size !== 0) {
      console.log(this.min);
      return this.min;
    }
  };
}

const st = new Stack();

st.push(4);
st.push(0);
st.push(3);
// st.getMin();
st.push(1);
st.push(5);
// st.getMin();
// st.display();
st.pop();
st.pop();
st.getMin();
// st.display();
// console.log(st.peek());
