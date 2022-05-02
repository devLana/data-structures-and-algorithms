class Stack {
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

  push(...elements) {
    if (this.isFull()) {
      throw new Error("Stack is full. Cannot add anymore elements");
    }

    if (this.capacity) {
      const diff = this.capacity - this.items.length;
      const items = elements.slice(0, diff);
      this.items.push(...items);
    } else {
      this.items.push(...elements);
    }
  }

  pop() {
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

const stack = new Stack(null, 11, 19, 1, 2);
