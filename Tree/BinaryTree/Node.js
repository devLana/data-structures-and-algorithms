class Node {
  constructor(data, parent = null) {
    this.data = data;
    this.parent = parent;
    this.right = null;
    this.left = null;
  }
}

module.exports = Node;
