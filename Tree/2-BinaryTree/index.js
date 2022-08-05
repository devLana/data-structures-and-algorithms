const Node = require("./Node");

class BinaryTree {
  constructor(data) {
    if (!root) throw Error("Root value is required");

    const node = new Node(data);
    this.root = node;
  }

  find(value) {
    if (!value) throw TypeError("Invalid parent node");

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node.data === value) return node;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}
