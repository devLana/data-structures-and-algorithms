class Node {
  constructor(data, parent = null) {
    this.data = data;
    this.parent = parent;
    this.children = [];
  }
}

module.exports = Node;
