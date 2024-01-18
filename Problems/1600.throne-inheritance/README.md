# 皇位继承顺序

## Details

- Your ThroneInheritance object will be instantiated and called as such:
- var obj = new ThroneInheritance(kingstring)
- obj.birth(parentstring,childstring)
- obj.death(string)
- var param_3 = obj.getInheritanceOrder()

## 输入输出

```text

// 输入：
// const t= new ThroneInheritance("king"); // 继承顺序：king
// t.birth("king", "andy"); // 继承顺序：king > andy
// t.birth("king", "bob"); // 继承顺序：king > andy > bob
// t.birth("king", "catherine"); // 继承顺序：king > andy > bob > catherine
// t.birth("andy", "matthew"); // 继承顺序：king > andy > matthew > bob > catherine
// t.birth("bob", "alex"); // 继承顺序：king > andy > matthew > bob > alex > catherine
// t.birth("bob", "asha"); // 继承顺序：king > andy > matthew > bob > alex > asha > catherine
// t.getInheritanceOrder(); // 返回 ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
// t.death("bob"); // 继承顺序：king > andy > matthew > bob（已经去世）> alex > asha > catherine
// t.getInheritanceOrder(); // 返回 ["king", "andy", "matthew", "alex", "asha", "catherine"]

```

## Think out loud

- 问题2： 如何存储这棵树? 使得可以p得到继承人
  - way1: 存逻辑树来维护继承关系? ===> 那根据p找继承关系会比较麻烦 树的遍历 O(N)
  - way2: 使用哈希映射
    - 记哈希映射为 edges，那么对于 edges 中的每一个键值对 (k,v)键 k 表示一个人，值 v 以列表的形式存放了这个人所有的孩子，
    - 时间复杂度: O(1)

## Complexity

- 时间复杂度
  - `getInheritanceOrder()` // O(n), 对树进行前序遍历
- 空间复杂度
  - n个节点的树包含n-1边，需要O(n)哈希空
  - 我们需要 `O(n)` 的空间（即哈希集合）存储所有的死亡人员
  - 在 `getInheritanceOrder()` 中前序遍历的过程中，我们使用的是递归，需要一定的栈空间，栈空间的大小与树的高度成正比。由于树的高度不会超过树中的节点个数，因此栈空间最多为`O(n)`
