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

  remove(value) {}
}

const tree = new BinaryTree("ab");
tree.add("cd", "ab", "left");
tree.add("de", "ab", "right");
tree.add("bc", "cd", "left");
tree.add("df", "cd", "right");
tree.add("ac", "df", "left");
tree.add("ae", "df", "right");
tree.add("ay", "ac", "left");
tree.add("aj", "ay", "left");
tree.add("kl", "aj", "left");
tree.add("fo", "ay", "right");
tree.add("am", "fo", "right");
tree.add("op", "ae", "left");
tree.add("qr", "ae", "right");
tree.add("mo", "de", "right");
tree.add("ca", "mo", "right");
tree.add("zx", "mo", "left");
tree.add("ij", "zx", "right");
tree.add("ef", "ij", "left");
tree.add("xy", "de", "left");
tree.add("cx", "zx", "left");
tree.add("gh", "cx", "right");

console.log("Tree - ", tree);
console.log("In Order Traverse - ", tree.inOrderTraverse());
console.log("Pre Order Traverse - ", tree.preOrderTraverse());
console.log("Post Order Traverse - ", tree.postOrderTraverse());
console.log("Level Order Traverse - ", tree.levelOrderTraverse());
