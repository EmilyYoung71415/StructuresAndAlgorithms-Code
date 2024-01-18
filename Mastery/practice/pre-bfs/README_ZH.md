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

- [x] [993.二叉树的堂兄弟节点](../993.cousins-in-binary-tree/index.ts)

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

- [x] [310.最小高度树](../310.minimum-height-trees/index.ts)

  - way1:
    - 最直接的解法是，枚举以每个节点为根构成的树，然后求出该树的高度，所有树的最小高度即为答案，需要的时间复杂度为 O(n^2)
    - **复杂度是O(N^2)**
  - way2: 越靠近里面的节点(有尽可能多连接的点)越有可能是最小高度树节点

    - 从边缘开始，先找到所有出度为1的节点，然后把所有出度为1的节点进队列，然后不断地bfs，最后找到的就是两边同时向中间靠近的节点，那么这个中间节点就相当于把整个距离二分了，即到两边距离最小的点，也是到其他叶子节点最近的节点
    - 也就是需要得到bfs时最后一层的叶子结点集合，即拓扑排序的思路.
      - 每层内while(levelSize--)的时候需要 维护levelList
    - 时空复杂度:O(N)

<del>
  
 节点与节点的关系方式，是通过无向边表示: edges[i] = [ai, bi]
 题意是从树上任意一个节点出发，能得到当前树的maxDepth，找到所有节点出发的树里的最小树节点 min([tree1.maxDepth, tree2.maxDepth])

挨个从每个节点出发，遍历树出发的maxDepth, 求maxDepth 可以用DFS
如果判断从当前节点向下的扩展逻辑? [1,0] 表示1->0, 0->1, 所以先构建入度inDeg

</del>

# 图传值

> 以下题目代码对BFS的核心代码完全无需修改，仅改动递推公式以及建图即可

## 拓扑排序DAG

- [ ] [207.课程表](https://leetcode.cn/problems/course-schedule/)
- numCourses = 2, prerequisites = [[1,0]] // prerequisites表示学习课程 1 之前，你需要完成课程 0，判断是否可能完成所有课程的学习
- clarify: 这道题讲的是:

- [ ] [210.课程表2](https://leetcode.cn/problems/course-schedule-ii/)
- [ ] [851. 喧闹和富有](https://leetcode.cn/problems/loud-and-rich/)
- [ ] [802. 找到最终的安全状态](https://leetcode.cn/problems/find-eventual-safe-states/)
- [ ] [2192. 有向无环图中一个节点的所有祖先](https://leetcode.cn/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/)
- [ ] [1857. 有向图中最大颜色值](https://leetcode.cn/problems/largest-color-value-in-a-directed-graph/)

## 矩阵问题: 环图->DAG

> 通过设置单调收敛的变量转换为非环图

- [ ] [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)
- [ ] [695. 岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)
