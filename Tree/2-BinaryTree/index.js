const Node = require("./Node");
const Queue = require("../../Queue");

class BinaryTree {
  constructor(data) {
    if (!data) throw Error("Root value is required");

    const node = new Node(data);
    this.root = node;
  }

  find(value) {
    if (!value) throw TypeError("Invalid parent node");

    const queue = new Queue(null, this.root);

    while (queue.size > 0) {
      const node = queue.dequeue();

      if (node.data === value) return node;

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }
  }

  add(value, parent, side) {
    if (!value) throw TypeError('Enter a valid "value"');

    if (side !== "left" && side !== "right") {
      throw TypeError('"Side" can only be left or right');
    }

    const parentNode = this.find(parent);

    if (!parentNode) throw Error('"Parent" node does not exist');

    if (parentNode.left && parentNode.right) {
      throw Error("Parent node already has left and right child nodes");
    }

    if (parentNode[side]) throw Error(`Parent node already has a ${side} node`);

    const node = new Node(value, parentNode);

    parentNode[side] = node;
  }

  inOrderTraverse() {
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
    let result = "";

    const traverse = node => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result += `${node.data} => `;
    };

    traverse(this.root);
    return result.replace(/ => $/, "");
  }

  preOrderTraverse() {
    let result = "";

    const traverse = node => {
      result += `${node.data} - `;

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return result.replace(/ - $/, "");
  }

  levelOrderTraverse() {
    const queue = new Queue(null, this.root);
    let result = "";

    while (queue.size > 0) {
      const node = queue.dequeue();

      result += `${node.data} `;

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }

    return result.replace(/ $/, "");
  }

  remove(value) {
    if (!value) throw TypeError('Enter a valid "value"');

    const node = this.find(value);

    if (!node) throw Error("Value does not exist");
    if (node === this.root && !node.left && !node.right) {
      throw Error("Cannot remove root node");
    }

    if (!node.left && !node.right) {
      const { parent } = node;

      if (parent.left === node) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!node.left) {
      node.data = node.right.data;
      node.right = null;
    } else if (!node.right) {
      node.data = node.left.data;
      node.left = null;
    } else {
      let tempNode = node;

      while (tempNode.right) {
        tempNode = tempNode.right;
      }

      node.data = tempNode.data;
      tempNode.parent.right = null;
    }
  }
}
