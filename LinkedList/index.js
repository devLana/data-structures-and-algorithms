const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length == 0;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  prepend(element) {
    if (invalidElements.includes(element)) return;

    const node = new Node(element, this.head);

    if (!this.head) this.tail = node;
    this.head = node;
    this.length += 1;
  }

  append(element) {
    if (invalidElements.includes(element)) return;

    if (!this.head) {
      this.prepend(element);
    } else {
      const node = new Node(element);
      this.tail.next = node;
      this.tail = node;
      this.length += 1;
    }
  }

  insert(element, index) {
    if (invalidElements.includes(element)) return;

    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.prepend(element);
    } else if (index >= this.size()) {
      this.append(element);
    } else {
      let previousNode = null;
      let currentNode = this.head;
      let idx = 0;

      while (currentNode) {
        idx += 1;
        previousNode = currentNode;
        currentNode = currentNode.next;

        if (index == idx) break;
      }

      const node = new Node(element, currentNode);
      previousNode.next = node;
      this.length += 1;
    }
  }

  deleteHead() {
    if (!this.head) return;

    this.head = this.head.next;
    this.length -= 1;
  }

  deleteTail() {
    if (!this.tail) return;

    let currentNode = this.head;

    while (currentNode) {
      if (!currentNode.next.next) {
        currentNode.next = null;
        this.tail = currentNode;
        this.length -= 1;
        break;
      }

      currentNode = currentNode.next;
    }
  }

  remove(index) {
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
      return;
    }

    if (index > this.size()) {
      this.deleteTail();
      return;
    }

    let previousNode = null;
    let currentNode = this.head;
    let idx = 0;

    while (currentNode) {
      idx += 1;
      previousNode = currentNode;
      currentNode = currentNode.next;

      if (index == idx) break;
    }

    previousNode.next = currentNode.next;
    this.length -= 1;
  }

  display(separator) {
    return this.toArray().join(separator);
  }

  toArray() {
    const result = [];

    if (!this.head) return result;

    let currentNode = this.head;

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }

  fromArray(arr) {
    arr.forEach(item => this.append(item));
  }

  find(element) {
    if (invalidElements.includes(element)) return;

    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === element) return currentNode;
      currentNode = currentNode.next;
    }
  }

  indexOf(element) {
    if (invalidElements.includes(element)) return;

    let index = -1;
    let currentNode = this.head;
    let isFound = false;

    while (currentNode) {
      index += 1;

      if (currentNode.value === element) {
        isFound = true;
        break;
      }

      currentNode = currentNode.next;
    }

    return isFound ? index : -1;
  }
}

const list = new LinkedList();
list.prepend("a");
list.append("1");
list.append(2);
list.prepend("b");
list.append(false);
list.append(50);
list.insert("value", 9);
list.insert("valuesaa", 6);
list.fromArray(["x", "y", "z"]);
// list.clear();
// list.deleteHead();
// list.deleteHead();
// list.deleteTail();
// list.remove(2);
console.log(list.find(false));
console.log(list.indexOf(false));

console.log({
  size: list.size(),
  list: list.head,
  tail: list.tail,
  display: list.display(", "),
});
