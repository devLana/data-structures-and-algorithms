const Node = require("./Node");

class BaseTree {
  constructor(root) {
    if (!root) throw Error("Root value is required");

    const node = new Node(root);
    this.root = node;
  }

  find(value) {
    if (!value) throw TypeError("Invalid parent node");
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
    const parentNode = this.find(parent);

    if (!parentNode) throw Error('"Parent" node does not exist');

    parentNode.children.push(node);
  }

  postOrderTraverse() {
    let result = "";

    const traverse = node => {
      for (const child of node.children) {
        if (child.children.length > 0) {
          traverse(child);
        } else {
          result += `${child.data}, `;
        }
      }

      result += `${node.data}, `;
    };

    traverse(this.root);
    return result.replace(/, $/, "");
  }

  preOrderTraverse() {
    let result = "";

    const traverse = node => {
      result += `${node.data} -> `;

      for (const child of node.children) {
        if (child.children.length > 0) {
          traverse(child);
        } else {
          result += `${child.data} -> `;
        }
      }
    };

    traverse(this.root);
    return result.replace(/-> $/, "");
  }

  levelOrderTraverse() {
    const nodeArr = [this.root];
    let result = "";

    while (nodeArr.length > 0) {
      const node = nodeArr.shift();

      result += `${node.data} - `;
      nodeArr.push(...node.children);
    }

    return result.replace(/ - $/, "");
  }

  remove(data) {}
}

const tree = new BaseTree("Tunji");
tree.add("Dayo", "Tunji");
tree.add("Toun", "Tunji");
tree.add("Lana", "Tunji");
tree.add("Tiara", "Dayo");
tree.add("Ini", "Dayo");
tree.add("Yemi", "Dayo");
tree.add("Tunde", "Ini");
tree.add("Femi", "Ini");
tree.add("Damo", "Lana");
tree.add("James", "Toun");
tree.add("John", "Toun");
tree.add("Felix", "Toun");
tree.add("Shane", "Felix");

console.log(tree.levelOrderTraverse());
