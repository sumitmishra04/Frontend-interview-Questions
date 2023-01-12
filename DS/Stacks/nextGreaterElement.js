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
    return null;
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
  empty = function () {
    return this.top === null;
  };
}

function index(arr) {
  const st = new Stack();
  st.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (st.empty()) {
      st.push(arr[i]);
      continue;
    }
    while (st.empty() === false && st.peek() < arr[i]) {
      console.log(st.peek(), " --> ", arr[i]);
      st.pop();
    }
    st.push(arr[i]);
  }
  while (!st.empty()) {
    console.log(st.peek(), " --> ", -1);
    st.pop()
  }
}
// index([13, 7, 6, 12, 10]);
index([1,2,3,4,5]);
