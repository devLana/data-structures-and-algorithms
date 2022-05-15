const Item = require("./item");

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  get size() {
    return this.queue.length;
  }

  get isEmpty() {
    return this.queue.length == 0;
  }

  enqueue(value, priority) {
    const element = new Item(value, priority);

    if (this.queue.length == 0) {
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
    if (this.queue.length == 0) return null;
    return this.queue.shift();
  }

  peek() {
    if (this.queue.length == 0) return null;
    return this.queue[0];
  }
}

const pq = new PriorityQueue();

pq.enqueue("a", 4);
pq.enqueue("b", 2);
pq.enqueue("c", 4);
pq.enqueue("d", 1);
pq.enqueue("e", 1);
pq.enqueue("f", 6);
pq.enqueue("g", 5);
pq.enqueue("h", 6);
pq.dequeue();
pq.dequeue();

console.log(pq.isEmpty);
