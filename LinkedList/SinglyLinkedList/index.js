const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get size() {
    return this.length;
  }

  get isEmpty() {
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

    if (!this.head) this.tail = node;
    this.head = node;
    this.length += 1;
  }

  append(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

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
    if (invalidElements.includes(element)) throw new Error("Invalid element");
    if (typeof index != "number") throw new TypeError("Index must be a number");
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.prepend(element);
    } else if (index >= this.size) {
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

    if (this.size == 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = this.head.next;
      this.length -= 1;
    }
  }

  deleteTail() {
    if (!this.tail) return;

    if (this.size == 1) {
      this.tail = null;
      this.head = null;
    } else {
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
  }

  remove(index) {
    if (typeof index != "number") throw new TypeError("Index must be a number");
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
    } else if (index > this.size - 1) {
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
      this.length -= 1;
    }
  }

  toString(separator) {
    if (!this.head) return null;

    const joiner = separator || ", ";
    let currentNode = this.head;
    let str = "";

    while (currentNode) {
      str += `${currentNode.value}${joiner}`;
      if (!currentNode.next) str = str.substring(0, str.lastIndexOf(joiner));
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
    if (!Array.isArray(arr)) throw new TypeError("Input is not an array");
    arr.forEach(item => this.append(item));
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

    if (!this.head) return;

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

  from(...items) {
    this.fromArray(items);
  }

  reverse() {
    let previousNode = null;
    let currentNode = this.head;
    let nextNode = null;
    let tempTail = this.head;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
    this.tail = tempTail;
  }
}

// const list = new SinglyLinkedList();
// list.prepend("a");
// list.append("1");
// list.append(2);
// list.prepend("b");
// list.append(false);
// list.insert("value", 9);
// list.insert("cat", 5);
// list.fromArray(["x", "y", "z"]);
// list.from(10, "truthy", true, "u", "q");
// list.deleteHead();
// list.deleteTail();
// list.remove(7);

// console.log("List to string: ", list.toString(" - "));
// console.log("List head: ", list.head);
// console.log("List tail: ", list.tail);
// console.log("List size: ", list.size);
// console.log('Find node with value equal to "value": ', list.find("value"));
// console.log("Find index of node with value equal to 10: ", list.indexOf(10));

// list.reverse();
// console.log("Reversed list to string: ", list.toString());
// console.log("Reversed list head: ", list.head);
// console.log("Reversed list tail: ", list.tail);

// list.clear();

module.exports = SinglyLinkedList;
