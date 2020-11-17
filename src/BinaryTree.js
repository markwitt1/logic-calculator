import { throws } from "assert";
import symbols from "./symbols.json";

const operators = {
  and: (a, b) => a && b,
  or: (a, b) => a || b,
};

export default class BinaryTree {
  constructor() {
    this.operator = undefined;
    this.val1 = undefined;
    this.val2 = undefined;
  }

  add(val) {
    console.log(`add ${val}`);
    if (val != "1" && val != "0" && typeof val === "string") {
      if (this.operator === undefined) {
        this.operator = val;
      } else {
        const superTree = new BinaryTree();
        superTree.add(val);
        superTree.add(this.copy());
        this.operator = superTree.operator;
        this.val1 = superTree.val1;
        this.val2 = superTree.val2;
      }
    } else {
      if (this.val1 === undefined) {
        this.val1 = val;
      } else if (this.val === undefined) {
        this.val2 = val;
      } else {
        console.error("ALARRRM");
      }
    }
  }

  toString() {
    return `${symbols[this.val1]}${symbols[this.operator]}${
      symbols[this.val2]
    }`;
  }

  evaluate() {
    return operators[this.operator](
      this.val1.evaluate ? this.val1.evaluate() : this.val1 === "1",
      this.val2.evaluate ? this.val2.evaluate() : this.val2 === "1"
    );
  }

  copy() {
    const newTree = new BinaryTree();
    newTree.operator = this.operator;
    newTree.val1 = this.val1;
    newTree.val2 = this.val2;
    return newTree;
  }
}
