/*
  HashTable implementation using array literal
  AND
  Using Chaining to solve hash collision with Linked Lists
**/

const LinkedList = require("../LinkedList/SinglyLinkedList");
const { validator } = require("./utils");

class HashTable {
  constructor(bucketSize) {
    if (bucketSize === null || bucketSize === undefined) {
      throw TypeError("Hash size is required");
    }

    if (typeof bucketSize !== "number") {
      throw TypeError("Hash size can only be a number");
    }

    if (bucketSize < 1) {
      throw Error("Hash size cannot be less than one");
    }

    this.bucket = Array(bucketSize);
    this.bucketSize = bucketSize;
  }

  hash(key) {
    const keyStr = `${key}`;
    let hash = 0;

    for (const char of keyStr) {
      hash += char.charCodeAt(0);
    }

    return hash % this.bucket.length;
  }

  set(key, value) {
    if (validator[key] || validator[value]) throw Error("Invalid entry");

    const hash = this.hash(key);

    if (this.bucket[hash]) {
      const node = this.bucket[hash].find(node => node.value.key === key);

      if (node) {
        node.value = value;
      } else {
        this.bucket[hash].append({ key, value });
      }
    } else {
      const node = new LinkedList();

      node.append({ key, value });
      this.bucket[hash] = node;
    }

    return this;
  }

  get(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (!this.bucket[hash]) return;

    const node = this.bucket[hash].find(node => node.value.key === key);

    return node?.value;
  }

  remove(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (!this.bucket[hash]) throw Error("Key does not exist");

    const index = this.bucket[hash].indexOf(node => node.value.key === key);

    if (index === -1) throw Error("Key does not exist");

    this.bucket[hash].remove(index);

    if (!this.bucket[hash].head) delete this.bucket[hash];
  }

  has(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (
      this.bucket[hash] &&
      this.bucket[hash].find(node => node.value.key === key)
    ) {
      return true;
    }

    return false;
  }

  get clear() {
    this.bucket = Array(this.bucketSize);
  }
}
