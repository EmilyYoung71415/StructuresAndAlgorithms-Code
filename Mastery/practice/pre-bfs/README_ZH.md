# 树传值

> 树除root节点以外入度都为1 且恒为1，故不需要做入度统计

- [x] 树的层序遍历(102.binary-tree-level-order-traversal)

```
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```

状态值：queue: [node];
不一样的是：按层输出

画出树的结构, 先序遍历: [1,2,3,4,null,6, 7];
当按层遍历的时候，queue= [1,|2,3,|4,6,7]
那是怎么确定层的划分的？
==> before node.left push 到queue之前

<del>
以下没有实现：

然后对照树结构看到，是先序遍历下的[1,2,4]做了分割点

```
level1: [0,1)
level2: [1,3)
level3: [3,6)
```

所以就要找节点的访问顺序，而不是邻接顺序
先序\*访问顺序 -> BFS?

</del>

尝试2：在while(que.len) 内部再加了一层循环, while(queLen--) 控制当前层的push

- [x] 树的层序遍历 自下而上(107.binary-tree-level-order-traversal2)

queue.push(curLevelQ) -> stack.unshift(curLevelQ) 头插

---

- [x] [117.填充每个节点的下一个右侧节点指针 II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/)

- 难点还是在遍历过程中，需要区分出当前node是当前行末尾的节点，还是下一行的第一个节点
- 如果是`nextNode = queue[i+1]. curNode.next = nextNode`的思路就区分不出来
- 需要用的思路: `prevNode.next = curNode`。当i>0的时候开始连接

[my-solution-explanation](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/solutions/4017401/simple-answer-to-easy-understand/)

```ts
function connect(root: Node | null): Node | null {
  if (!root) return null;
  const queue: Node[] = [root];

  while (queue.length) {
    let levelSize = queue.length;
    let prevNode = queue[0]; // 引入prev节点

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (i > 0) {
        // 当i>0时候开始连接
        prevNode.next = node;
        prevNode = node;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    // 行遍历完毕
    prevNode.next = null;
  }

  return root;
}
```

---

树的最大最小深度:

- [104](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
- [111](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

```
树的最大深度
  状态: maxDepth
  递推: 每向下一层遍历，depth++
    初始值: depth = root = 1
    边界点: 当节点遍历完之后确定
  顺序: BFS层序遍历
树的最小深度
  递推不一样:
    边界点: 当遇到第一个叶子节点确定
```

- [x] [面试题 04.03. 特定深度节点链表](https://leetcode.cn/problems/list-of-depth-lcci/)

```
  每次层循环时, head头结点为linkList.head
  prevNode.next = nextNode;
```

- [x] [993.二叉树的堂兄弟节点](https://leetcode.cn/problems/cousins-in-binary-tree/)

```
  // 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点
  // 树中两个不同节点的值 x 和 y
  isCousins(root: TreeNode | null, x: number, y: number)

  思路: 层序往下遍历，当遇到节点x or y时，记录遇到当时节点的父节点， 节点的深度
  优化：遇到节点x时, 遍历当前level，是否能遇到y，如果遇到了则继续判断x.pNode !== y.pNode; ==> true
  其余情况都为false

  问题: 怎么记录节点的pNode
    if ((node.left || node.right) === x || y) ==> xpNode
```

# 图传值

## 拓扑排序DAG

## 矩阵问题: 环图->DAG

> 通过设置单调收敛的变量转换为非环图
