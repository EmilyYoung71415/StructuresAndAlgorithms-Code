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

# 图传值

## 拓扑排序DAG

## 矩阵问题: 环图->DAG

> 通过设置单调收敛的变量转换为非环图
