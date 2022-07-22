/*
  HashTable implementation using literal object
  AND
  Using Chaining to solve hash collision with Linked Lists
**/

const { validator } = require("./utils");
const LinkedList = require("../LinkedList/SinglyLinkedList");

class HashTable {
  constructor(bucketSize) {
    if (bucketSize !== null && bucketSize !== undefined) {
      if (typeof bucketSize !== "number") {
        throw new TypeError("Invalid hash size");
      }

      if (bucketSize < 1) {
        throw new Error("Hash size cannot be less than one");
      }
    }

    this.bucket = {};
    this.bucketSize = bucketSize;
    this.length = 0;
  }

  hash(key) {
    const keyStr = `${key}`;
    let hash = "";

    for (let i = keyStr.length - 1; i >= 0; i--) {
      hash = `${hash}${keyStr.charCodeAt(i)}`;
    }

    return hash;
  }

  get size() {
    return this.length;
  }

  set(key, value) {
    if (this.bucketSize && this.size === this.bucketSize) {
      throw Error("Hash table limit reached");
    }

    if (validator[key] || validator[value]) throw Error("Invalid entry");

    const hash = this.hash(key);

    if (this.bucket.hasOwnProperty(hash)) {
      const keyNode = this.bucket[hash].find(node => node.value.key === key);

      if (keyNode) {
        keyNode.value.value = value;
      } else {
        this.bucket[hash].append({ key, value });
        this.length++;
      }
    } else {
      const node = new LinkedList();

      node.append({ key, value });
      this.bucket[hash] = node;
      this.length++;
    }

    return this;
  }

  get(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (!this.bucket.hasOwnProperty(hash)) return;

    const keyNode = this.bucket[hash].find(node => node.value.key === key);

    return keyNode?.value;
  }

  remove(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (!this.bucket.hasOwnProperty(hash)) throw Error("Key does not exist");

    const keyIndex = this.bucket[hash].indexOf(node => node.value.key === key);

    if (keyIndex === -1) throw Error("Key does not exist");

    this.bucket[hash].remove(keyIndex);

    if (!this.bucket[hash].head) delete this.bucket[hash];

    this.length--;
  }

  has(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (
      this.bucket.hasOwnProperty(hash) &&
      this.bucket[hash].find(node => node.value.key === key)
    ) {
      return true;
    }

    return false;
  }

  get clear() {
    this.bucket = {};
  }
}
