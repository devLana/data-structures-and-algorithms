const SinglyLinkedList = require("../SinglyLinkedList");
const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class DoublyLinkedList extends SinglyLinkedList {
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
    const previousTailNode = this.tail;
    super.append(element);
    this.tail.previous = previousTailNode;
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

      const node = new Node(element, currentNode, previousNode);
      previousNode.next = node;
      currentNode.previous = node;
      this.length += 1;
    }
  }

  deleteHead() {
    super.deleteHead();
    this.head.previous = null;
  }

  deleteTail() {
    if (!this.tail) return;

    if (this.size == 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }

    this.length -= 1;
  }

  remove(index) {
    if (typeof index != "number") throw new TypeError("Index must be a number");
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
    } else if (index >= this.size - 1) {
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

  reverse() {
    let previousNode = null;
    let currentNode = this.head;
    let nextNode = null;
    let tempTail = this.head;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.previous = nextNode;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
    this.tail = tempTail;
  }
}
