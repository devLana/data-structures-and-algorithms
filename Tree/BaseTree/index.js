const Node = require("./Node");

class BaseTree {
  constructor() {
    this.root = null;
  }

  find(value) {
    if (!value) throw TypeError("Invalid parent node");
    if (!this.root) return undefined;
    if (this.root.data === value) return this.root;

    const nodeArr = [...this.root.children];

    while (nodeArr.length > 0) {
      const node = nodeArr.shift();

      if (node.data === value) return node;

      nodeArr.push(...node.children);
    }
  }

  add(value, parent) {
    if (!value) throw TypeError('Enter a valid "value"');

    const node = new Node(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    const parentNode = this.find(parent);

    if (!parentNode) throw Error('"Parent" node does not exist');

    parentNode.children.push(node);
  }

  inOrderTraverse() {}

  postOrderTraverse() {}

  preOrderTraverse() {}

  bfsTraversal() {}

  remove(data) {}
}

const tree = new BaseTree();
tree.add("Tunji");
tree.add("Dayo", "Tunji");
tree.add("Toun", "Tunji");
tree.add("Lana", "Tunji");
tree.add("Tiara", "Dayo");
tree.add("Ini", "Dayo");

console.log(tree);
console.log(tree.find("Toun"));
