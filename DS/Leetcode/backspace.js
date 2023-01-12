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

function index(s, t) {
  const st1 = new Stack();
  const st2 = new Stack();
  const sArr = [...s];
  const tArr = [...t];
  for (let i = 0; i < sArr.length; i++) {
    if (sArr[i] === "#") {
      st1.pop();
    } else {
      st1.push(sArr[i]);
    }
  }
  for (let i = 0; i < tArr.length; i++) {
    if (tArr[i] === "#") {
      st2.pop();
    } else {
      st2.push(tArr[i]);
    }
  }
  if (st1.size !== st2.size) {
    return false;
  }
  while (st1.size) {
    if (st1.peek() === st2.peek()) {
      st1.pop();
      st2.pop();
    } else {
      return false;
    }
  }
  return true
}

console.log(index("c2", "##cs"));
