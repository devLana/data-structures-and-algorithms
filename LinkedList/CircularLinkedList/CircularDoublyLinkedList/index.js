const CircularSinglyLinkedList = require("../CircularSinglyLinkedList");
const Node = require("./Node");

const invalidElements = [null, undefined, ""];

class CircularDoublyLinkedList extends CircularSinglyLinkedList {
  prepend(element) {
    if (invalidElements.includes(element)) throw new Error("Invalid element");

    const node = new Node(element, this.head, this.tail);

    if (!this.head) {
      node.next = node;
      node.previous = node;
      this.tail = node;
    } else {
      this.head.previous = node;
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
      const node = new Node(element, this.head, this.tail);
      this.tail.next = node;
      this.head.previous = node;
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

      const node = new Node(element, currentNode, previousNode);
      previousNode.next = node;
      currentNode.previous = node;
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
      this.head.previous = this.tail;
      this.tail.next = this.head;
    }

    this.length--;
  }

  deleteTail() {
    if (!this.tail) return;

    if (this.size == 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = this.tail.previous;
      this.tail.next = this.head;
      this.head.previous = this.tail;
    }

    this.length--;
  }

  remove(index) {
    if (index < 0) throw new RangeError("Invalid index number");

    if (index == 0) {
      this.deleteHead();
    } else if (index >= this.size - 1) {
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
      currentNode.next.previous = previousNode;
      this.length--;
    }
  }

  reverse() {
    let previousNode = this.tail;
    let currentNode = this.head;
    let nextNode = null;
    let tempTail = this.head;

    do {
      nextNode = currentNode.next;
      currentNode.previous = nextNode;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;

      if (currentNode === this.head) break;
    } while (currentNode);

    this.head = previousNode;
    this.tail = tempTail;
  }
}

// const list = new CircularDoublyLinkedList();

// list.append(1);
// list.prepend(2);
// list.insert(3, 1);
// list.prepend("a");
// list.remove(1);

// console.log("To string: ", list.toString(" - "));
// console.log("To array: ", list.toArray());
// console.log("List head: ", list.head);
// console.log("\n");

// list.reverse();
// console.log("Reversed to string: ", list.toString("..."));
