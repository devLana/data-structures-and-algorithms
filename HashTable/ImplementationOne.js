/*
  HashTable implementation using literal object
  AND
  Object spread syntax to solve hash collision
**/

const { validator } = require("./utils");

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

  hashFunc(key) {
    const keyStr = `${key}`;
    let result = 0;

    for (const char of keyStr) {
      result += char.charCodeAt(0);
    }

    return result;
  }

  get size() {
    return this.length;
  }

  set(key, value) {
    if (this.bucketSize && this.size === this.bucketSize) {
      throw Error("Hash table limit reached");
    }

    if (validator[key] || validator[value]) throw Error("Invalid entry");

    const hash = this.hashFunc(key);

    if (this.bucket.hasOwnProperty(hash)) {
      this.bucket[hash] = { ...this.bucket[hash], [key]: value };
    } else {
      this.bucket[hash] = { [key]: value };
    }

    this.length++;
    return this;
  }

  get(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hashFunc(key);

    if (
      !this.bucket.hasOwnProperty(hash) ||
      !this.bucket[hash].hasOwnProperty(key)
    ) {
      return undefined;
    }

    return { key, value: this.bucket[hash][key] };
  }

  remove(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hashFunc(key);

    if (
      !this.bucket.hasOwnProperty(hash) ||
      !this.bucket[hash].hasOwnProperty(key)
    ) {
      throw Error("Key does not exist");
    }

    delete this.bucket[hash][key];

    if (HashTable.hashIsEmpty(this.bucket[hash])) delete this.bucket[hash];

    this.length--;
  }

  has(key) {
    if (validator[key]) throw Error("Invalid key");

    const hash = this.hashFunc(key);

    if (
      this.bucket.hasOwnProperty(hash) &&
      this.bucket[hash].hasOwnProperty(key)
    ) {
      return true;
    }

    return false;
  }

  get clear() {
    this.bucket = {};
  }

  static hashIsEmpty(hash) {
    for (const key in hash) {
      if (hash.hasOwnProperty(key)) return false;
    }

    return true;
  }
}
