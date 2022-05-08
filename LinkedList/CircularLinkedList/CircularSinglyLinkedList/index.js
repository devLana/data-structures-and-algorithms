const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class CircularSinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get isEmpty() {
    return this.length == 0;
  }

  get size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  prepend(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    const node = new Node(element, this.head);

    if (!this.head) {
      node.next = node;
      this.tail = node;
    } else {
      this.tail.next = node;
    }

    this.head = node;
    this.length++;
  }

  append(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    if (!this.head) {
      this.prepend(element);
    } else {
      const node = new Node(element, this.head);
      this.tail.next = node;
      this.tail = node;
      this.length++;
    }
  }

  insert(element, index) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.prepend(element);
    } else if (index >= this.size) {
      this.append(element);
    } else {
      let previousNode = null;
      let currentNode = this.head;
      let idx = 0;

      do {
        idx++;
        previousNode = currentNode;
        currentNode = currentNode.next;

        if (index == idx) break;
      } while (currentNode);

      const node = new Node(element, currentNode);
      previousNode.next = node;
      this.length++;
    }
  }

  deleteHead() {
    if (!this.head) return;

    if (this.size == 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail.next = this.head;
    }

    this.length--;
  }

  deleteTail() {
    if (!this.tail) return;

    if (this.size == 1) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;

      do {
        if (currentNode.next === this.tail) {
          currentNode.next = this.head;
          this.tail = currentNode;
          break;
        }

        currentNode = currentNode.next;
      } while (currentNode);
    }

    this.length--;
  }

  remove(index) {
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
    } else if (index > this.size - 1) {
      this.deleteTail();
    } else {
      let previousNode = null;
      let currentNode = this.head;
      let idx = 0;

      do {
        idx++;
        previousNode = currentNode;
        currentNode = currentNode.next;

        if (index == idx) break;
      } while (currentNode);

      previousNode.next = currentNode.next;
      this.length--;
    }
  }

  toString(separator) {
    if (!this.head) return null;

    const joiner = separator || ", ";
    let currentNode = this.head;
    let str = "";

    do {
      str += `${currentNode.value}${joiner}`;

      if (currentNode === this.tail) {
        str = str.substring(0, str.lastIndexOf(joiner));
        break;
      }

      currentNode = currentNode.next;
    } while (currentNode);

    return str;
  }

  toArray() {
    const result = [];

    if (!this.head) return result;

    let currentNode = this.head;

    do {
      result.push(currentNode.value);

      if (currentNode === this.tail) break;

      currentNode = currentNode.next;
    } while (currentNode);

    return result;
  }

  fromArray(arr) {
    arr.forEach(item => this.append(item));
  }

  from(...items) {
    this.fromArray(items);
  }

  find(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    if (!this.head) return;

    let currentNode = this.head;

    do {
      if (currentNode.value === element) return currentNode;
      if (currentNode === this.tail) return;

      currentNode = currentNode.next;
    } while (currentNode);
  }

  indexOf(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    if (!this.head) return;

    let currentNode = this.head;
    let index = -1;

    do {
      index++;

      if (currentNode.value === element) return index;
      if (currentNode === this.tail) return -1;

      currentNode = currentNode.next;
    } while (currentNode);

    return -1;
  }

  reverse() {
    let previousNode = this.tail;
    let currentNode = this.head;
    let nextNode = null;
    let tempTail = this.head;

    do {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;

      if (currentNode === this.head) break;
    } while (currentNode);

    this.head = previousNode;
    this.tail = tempTail;
  }
}

// const list = new CircularSinglyLinkedList();

// list.append("quart");
// list.prepend("1234");
// list.append(true);
// list.prepend("dumb");
// list.insert("testing", 2);

// console.log(list.head);
// console.log("To String: ", list.toString());
// console.log("\n");

// list.reverse();
// list.remove(3);
// console.log(list.head);
// console.log("To Array: ", list.toArray());
// console.log("To String: ", list.toString());
