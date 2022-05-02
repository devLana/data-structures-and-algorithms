class Queue {
  constructor(capacity, ...items) {
    if (capacity !== null && typeof capacity !== "number") {
      throw new TypeError("Invalid capacity type");
    }

    if (typeof capacity === "number") {
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

  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }

    this.items.unshift(element);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isFull() {
    if (!this.capacity) return false;
    if (this.capacity && this.capacity > this.items.length) {
      return false;
    }
    return true;
  }
}
