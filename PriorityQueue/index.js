const Item = require("./item");

const valueMapper = {
  null: true,
  undefined: true,
  "": true,
};

class PriorityQueue {
  constructor(capacity = null) {
    if (capacity !== null) {
      if (typeof capacity !== "number") {
        throw new TypeError("Invalid capacity type");
      }

      if (capacity < 1) {
        throw new Error("Queue capacity cannot be less than one");
      }
    }

    this.queue = [];
    this.capacity = capacity;
  }

  get size() {
    return this.queue.length;
  }

  get isEmpty() {
    return this.size == 0;
  }

  get isFull() {
    if (!this.capacity) return false;
    if (this.capacity > this.size) return false;
    return true;
  }

  enqueue(value, priority) {
    if (typeof priority != "number") throw new TypeError("Invalid priority");
    if (priority < 1) throw new Error("Priority cannot be less than one");
    if (valueMapper[value]) throw new Error("Invalid value");

    if (this.isFull) throw new Error("Queue is full");

    const element = new Item(value, priority);

    if (this.isEmpty) {
      this.queue.push(element);
    } else {
      const queue = this.queue;
      let addedToQueue = false;

      for (let i = queue.length - 1; i >= 0; i--) {
        if (queue[i].priority >= priority) {
          queue.splice(i + 1, 0, element);
          addedToQueue = true;
          break;
        }
      }

      if (!addedToQueue) queue.unshift(element);
    }
  }

  dequeue() {
    if (this.isEmpty) return null;
    return this.queue.shift();
  }

  peek() {
    if (this.isEmpty) return null;
    return this.queue[0];
  }
}
