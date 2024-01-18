export class ThroneInheritance {
  // private _tree: MTreeNode<string>;
  private _king: string;
  private _edges: Map<string, string[]> = new Map();
  private _dead: Set<string> = new Set();

  constructor(_king: string) {
    this._king = _king;
  }

  // 表示 parentName 新拥有了一个名为 childName 的孩子
  birth(parentName: string, childName: string): void {
    // const node = this._findNode(this._tree, parentName);
    if (!this._edges.has(parentName)) {
      this._edges.set(parentName, []);
    }
    this._edges.get(parentName).push(childName);
  }

  // 表示名为 string 的人死亡。一个人的死亡不会影响 Successor 函数，也不会影响当前的继承顺序。你可以只将这个人标记为死亡状态
  death(name: string): void {
    this._dead.add(name);
  }

  // 返回 除去 死亡人员的当前继承顺序列表
  getInheritanceOrder(): string[] {
    const ans: string[] = [];

    const preorder = (name: string) => {
      if (!this._dead.has(name)) {
        ans.push(name);
      }

      if (this._edges.has(name)) {
        for (const childName of this._edges.get(name)) {
          preorder(childName);
        }
      }
    };

    preorder(this._king);

    return ans;
  }
}
