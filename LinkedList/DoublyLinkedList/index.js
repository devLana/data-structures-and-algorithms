const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class DoublyLinkedList {
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
    this.tail = null;
    this.length = 0;
  }

  prepend(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    const node = new Node(element, this.head);

    if (!this.head) {
      this.tail = node;
    } else {
      this.head.previous = node;
    }

    this.head = node;
    this.length += 1;
  }

  append(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    if (!this.head) {
      this.prepend(element);
    } else {
      const node = new Node(element, null, this.tail);
      this.tail.next = node;
      this.tail = node;
      this.length += 1;
    }
  }

  insert(element, index) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

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

      const node = new Node(element, currentNode, previousNode);
      previousNode.next = node;
      currentNode.previous = node;
      this.length += 1;
    }
  }

  deleteHead() {
    if (!this.head) return;

    this.head = this.head.next;
    this.head.previous = null;
    this.length -= 1;
  }

  deleteTail() {
    if (!this.tail) return;

    this.tail = this.tail.previous;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    this.length -= 1;
  }

  remove(index) {
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
    } else if (index >= this.size() - 1) {
      this.deleteTail();
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

      previousNode.next = currentNode.next;
      currentNode.next.previous = previousNode;
      this.length -= 1;
    }
  }

  toString(separator) {
    const joiner = separator || ", ";
    const regex = new RegExp(`${joiner}$`);
    let currentNode = this.head;
    let str = "";

    while (currentNode) {
      str += `${currentNode.value}${joiner}`;
      if (!currentNode.next) str = str.replace(regex, "");
      currentNode = currentNode.next;
    }

    return str;
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

  from(...items) {
    this.fromArray(items);
  }

  find(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    if (!this.head) return;

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === element) return currentNode;
      currentNode = currentNode.next;
    }
  }

  indexOf(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    let index = -1;
    let currentNode = this.head;

    while (currentNode) {
      index += 1;

      if (currentNode.value === element) {
        return index;
      }

      currentNode = currentNode.next;
    }

    return -1;
  }

  reverse() {
    let previousNode = null;
    let currentNode = this.head;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.previous = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
  }
}

const list = new DoublyLinkedList();
list.append("c");
list.prepend("a");
list.prepend("b");
list.append("1");
list.insert("test", 2);
list.from(false, "truthy", "hello");
list.fromArray(["falsy", true, "world"]);
list.deleteHead();
list.deleteTail();
list.remove(1);

console.log("List to string: ", list.toString(" - "));
console.log("List size: ", list.size());
console.log("List head: ", list.head);
console.log('Find node with value equal to "hello": ', list.find("hello"));
console.log(
  'Find index of node with value equal to "hello": ',
  list.indexOf("hello")
);

list.reverse();
console.log("Reversed Link list: ", list.toString());

// list.clear();
