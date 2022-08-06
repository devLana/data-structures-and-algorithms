class Queue {
  constructor(capacity, ...items) {
    if (capacity !== null) {
      if (typeof capacity != "number") {
        throw new TypeError("Invalid capacity type");
      }

      if (capacity < 1) {
        throw new Error("Stack capacity cannot be less than one");
      }

      if (capacity < items.length) {
        throw new Error("Stack capacity reached");
      }
    }

    this.capacity = capacity;
    this.items = items;
  }

  get size() {
    return this.items.length;
  }

  get isEmpty() {
    return this.size == 0;
  }

  get isFull() {
    if (!this.capacity) return false;
    if (this.capacity > this.size) return false;
    return true;
  }

  enqueue(...elements) {
    if (this.isFull) throw new Error("Queue is full");

    if (this.capacity) {
      const diff = this.capacity - this.size;
      const items = elements.slice(0, diff);
      this.items.unshift(...items);
    } else {
      this.items.unshift(...elements);
    }
  }

  dequeue() {
    if (this.isEmpty) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty) return null;
    return this.items[this.items.length - 1];
  }
}

module.exports = Queue;
