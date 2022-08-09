const Queue = require("../../Queue");
const Node = require("./Node");

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(value) {
    if (typeof value !== "number") {
      throw TypeError("Value can only be a number");
    }

    if (!this.root) {
      this.root = new Node(value);
      this.size++;
    } else {
      const traverse = currentNode => {
        if (value < currentNode.data) {
          if (currentNode.left) {
            traverse(currentNode.left);
          } else {
            currentNode.left = new Node(value, currentNode);
            this.size++;
          }
        } else if (value > currentNode.data) {
          if (currentNode.right) {
            traverse(currentNode.right);
          } else {
            currentNode.right = new Node(value, currentNode);
            this.size++;
          }
        } else {
          throw Error("Value already exists in the tree");
        }
      };

      traverse(this.root);
    }
  }

  find(value) {
    if (typeof value !== "number") {
      throw TypeError("Value can only be a number");
    }

    let tempNode = this.root;

    while (tempNode) {
      if (value < tempNode.data) {
        tempNode = tempNode.left;
      } else if (value > tempNode.data) {
        tempNode = tempNode.right;
      } else {
        return tempNode;
      }
    }
  }

  has(value) {
    if (typeof value !== "number") {
      throw TypeError("Value can only be a number");
    }

    return this.find(value) ? true : false;
  }

  remove(value) {
    if (typeof value !== "number") {
      throw TypeError("Value can only be a number");
    }

    const node = this.find(value);

    if (!node) throw Error("Value does not exist");

    if (!node.left && !node.right) {
      if (node === this.root) {
        this.root = null;
      } else {
        if (node.parent.left === node) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      }
    } else if (!node.left) {
      node.data = node.right.data;
      node.right = null;
    } else if (!node.right) {
      node.data = node.left.data;
      node.left = null;
    } else {
      let tempNode = node.right;

      while (tempNode.left) {
        tempNode = tempNode.left;
      }

      node.data = tempNode.data;
      tempNode.parent.left = null;
    }

    this.size--;
  }

  get min() {
    if (!this.root) {
      return null;
    }

    if (!this.root.left) return this.root.data;

    let node = this.root;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  get max() {
    if (!this.root) {
      return null;
    }

    if (!this.root.right) return this.root.data;

    let node = this.root;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

  inOrderTraverse() {
    if (!this.root) return null;

    let result = "";

    const traverse = node => {
      if (node.left) traverse(node.left);
      result += `${node.data}, `;
      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return result.replace(/, $/, "");
  }

  postOrderTraverse() {
    if (!this.root) return null;

    let result = "";

    const traverse = node => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result += `${node.data} - `;
    };

    traverse(this.root);
    return result.replace(/ - $/, "");
  }

  preOrderTraverse() {
    if (!this.root) return null;

    let result = "";

    const traverse = node => {
      result += `${node.data} => `;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return result.replace(/ => $/, "");
  }

  levelOrderTraverse() {
    if (!this.root) return null;

    let queue = new Queue(null, this.root);
    let result = "";

    while (queue.size > 0) {
      const node = queue.dequeue();

      result += `${node.data} -> `;

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }

    return result.replace(/ -> $/, "");
  }
}
