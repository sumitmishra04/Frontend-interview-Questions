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




