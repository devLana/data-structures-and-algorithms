/*
  HashTable implementation using array literal
  AND
  Object spread syntax to solve hash collision
**/

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
      this.bucket[hash] = { ...this.bucket[hash], [key]: value };
    } else {
      this.bucket[hash] = { [key]: value };
    }

    return this;
  }

  get(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (this.bucket[hash] && this.bucket[hash].hasOwnProperty(key)) {
      return { key, value: this.bucket[hash][key] };
    }

    return undefined;
  }

  remove(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (!this.bucket[hash] || !this.bucket[hash].hasOwnProperty(key)) {
      throw Error("Key does not exist");
    }

    delete this.bucket[hash][key];

    if (HashTable.hashIsEmpty(this.bucket[hash])) delete this.bucket[hash];
  }

  has(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hash(key);

    if (this.bucket[hash] && this.bucket[hash][key]) {
      return true;
    }

    return false;
  }

  get clear() {
    this.bucket = Array(this.bucketSize);
  }

  static hashIsEmpty(hash) {
    for (const key in hash) {
      if (hash.hasOwnProperty(key)) return false;
    }

    return true;
  }
}
