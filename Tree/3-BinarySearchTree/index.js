const Node = require("./Node");

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (typeof value !== "number") {
      throw TypeError("Value can only be a number");
    }

    const node = new Node(value);

    if (!this.root) {
      this.root = node;
    } else {
      const traverse = currentNode => {
        if (value < currentNode.data) {
          if (!currentNode.left) {
            currentNode.left = node;
          } else {
            traverse(currentNode.left);
          }
        } else if (value > currentNode.data) {
          if (!currentNode.right) {
            currentNode.right = node;
          } else {
            traverse(currentNode.right);
          }
        } else {
          throw Error("Value already exists in the tree");
        }
      };

      traverse(this.root);
    }
  }
}
