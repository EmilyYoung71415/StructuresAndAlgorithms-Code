<style>
  r {color: red}
</style>

```ts
const dfs = function (node: TreeNode | null, prevPathSum: number): boolean {
  if (!node) return false; // if (node.left)

  if (!node.left && !node.right) {
    // 等于很重要
    return node.val + prevPathSum >= limit;
  }

  const LNodeHasSufficient = dfs(node.left, prevPathSum + node.val);
  const RNodeHasSufficient = dfs(node.right, prevPathSum + node.val);

  if (!LNodeHasSufficient) {
    node.left = null;
  }

  if (!RNodeHasSufficient) {
    node.right = null;
  }

  return LNodeHasSufficient || RNodeHasSufficient;
};
```

从这个解法学到了啥?

- if(node.left), if(node.right) 可以放在下一层处理，变为 if(!node) return;递归的上一层无脑传node.left即可

- if(node.left) { return dfs(xx)} 不能在if里写return，这样后边node.right就遍历不到了，只能在dfs(node.left) dfs(node.right)之后写return

- 传参上:
  - 入参(本层传下去的入参)：dfs(prev+node.val) 对于下层来说，每次被调用拿到prevPathSum
  - return(下层传上来的返回值): node.val+prevPath，（本层node基于上层的数据进行加工
  - dfs函数本身代表的意思:
    - 入参:prevPath: root->node的pathSum, 不含node本身
    - 含本身: prePath + node.val
- dfs返回什么的学问上:
  - 函数拆分成了 node.result = node.left.result || node.right.result
  - 这个result表示: node是否足 取决于 子树任意一个足就行。子树都不足那我也不足，子树任意一个足，我就足 （——————> 来源于题目题意的推导
  - 所以dfs: base case有了，分治的推导也有了:pnode 与 (node.left, node.right)的关系

那么可以总结dfs的含义是: node是否足节点
那么main函数的return: dfs(root) ? root : null;

---

是否可以将dfs融合到main里呢，就不拆分子函数dfs了？
==> dfs return: 是否保留当前节点, 保留return root, 不保留return null

```ts
function sufficientSubset(root: TreeNode | null, limit: number) {
  if (root == null) return null;

  // 到叶节点了
  if (root.left === null && root.right === null) {
    // 这个limit会随着递归深入， limit - node.val；每遍历一个节点分担了一点val
    return root.val > limit ? root : null;
  }

  root.left = sufficientSubset(root.left, limit - root.val);
  root.right = sufficientSubset(root.right, limit - root.val);

  // 首先两个子结点（如果存在的话）要清楚自己是不是需要被删除，明显使用 “后序遍历”。
  // 左右子树都为空，意味着这个子树上没有被保留的路径，那么这个结点也没有保留的必要了
  if (root.left == null && root.right == null) {
    return null;
  }

  return root;
}
```

- limit作为dfs入参的变化，不一定是prevSum+xxx，以先序往下遍历，path+node.val的形式, 也可以从target来反向看, 每走一个node.val
  剩余目标值-node.val.好处是：利用了原函数的入参。无需再引入其他的变量辅助

---

<b><r>我的写法的问题</r></b>:

- 把经过node的path，看成了以node为中心，分成了node-> root, node->leaf（两段
- 为了避免重复计算引入了dp

  - 但是实际上要的不是dp，而是在进入每层中dp可以辅助计算出path

- 还陷入了一个大问题：
  - 需要node-leaf的值，这个值很明显是return dfs来的
  - 但是不知道怎么：
    - 何时return 不影响dfs完整迭代
    - 如何解构return，return的是什么值，该值怎么与当前层的node反应接着return，得到当前层node的
  - 用什么样的传值姿态？
    - 全局变量，+ 回溯
      - 回溯的时候，dfs(node.left) 之后，prevOrder作为全局变量到底是什么
      - preorderIndex如果用函数参数 和全局变量，有什么差别?
      - 如何利用preSum的回溯+加减，得到node -> leaf的path?
    - or 函数入参参数

修改这个函数，统计出需要删除的delIndex, 用函数传参的方式来做值传递

```ts
export function sufficientSubset1(root: TreeNode | null, limit: number): TreeNode | null {
  // let prevPathSum = 0;

  // curPathSum: root节点到当前节点node的路径和: prevPathSum+node.val
  // return: 当前节点node到叶节点的路径和
  // 返回node节点出发到叶子节点的路径和

  const toDelIndex = new Set(); //number[] = [];
  let prevOrderIndex = -1;

  // 问题1： return dfs则会提前终止。只遍历到最左边的路径
  // 问题2： 经过该节点的路径和，在同一路线上由于7.8个节点就会计算这么多次。
  // ---> 所以计算 // path->leafNode,的唯一路径
  // loop1.loop 每遍历完，就将此路径上的所有node，遍历挂上： <nodeIndex, [path1, path2 ....]>
  // 第二loop2，先序遍历，将不足节点删去
  // 时间复杂度: loop1: N*logN
  const dfs = (node: TreeNode | null, prevPathSum: number): number => {
    // if (!node) return 0;
    if (!node.left && !node.right) return node.val;

    prevOrderIndex++;

    if (node.left) {
      const leftNodeSubPathSum = dfs(node.left, prevPathSum + node.val);
      if (prevPathSum + node.val + leftNodeSubPathSum < limit) {
        toDelIndex.add(prevOrderIndex);
      }
      return leftNodeSubPathSum + node.val;
    }

    if (node.right) {
      const rightNodeSubPathSum = dfs(node.left, prevPathSum + node.val);
      if (prevPathSum + node.val + rightNodeSubPathSum < limit) {
        toDelIndex.add(prevOrderIndex);
      }
      return rightNodeSubPathSum + node.val;
    }

    // leaf节点
    return node.val;
  };

  dfs(root, 0);
  console.log([...toDelIndex]);

  return root;
}
```

修正这个函数， 弄明白全局变量在每次dfs()之后的值是多少

```ts
export function sufficientSubset(root: TreeNode | null, limit: number): TreeNode | null {
  // node->叶子节点的
  const nodePathSum: number[] = [];

  // 1.遍历树，填充path，先序-> 计算path -> 后序 -> 判断出不足节点并标记（如果直接删的话会影响preorderIndex导致计算错误

  let prevOrderIndex = 0;
  let prevPathSum = 0;

  const pathSum = (node: TreeNode | null) => {
    prevOrderIndex++;
    prevPathSum += node.val;

    if (!node.left && !node.right) {
      nodePathSum[prevOrderIndex] = node.val; // 叶节点到叶节点path为本身
      return;
    }

    if (node.left) {
      pathSum(node.left);
      // TODO: 这个时候的prevOrder是什么能通过prevOrder加工得到node->leaf的距离吗
      // prevOrderIndex--;
      // prevPathSum -= node.left.val;
    }

    if (node.right) {
      pathSum(node.right);
      // prevOrderIndex--;
      // prevPathSum -= node.right.val;
      // nodePathSum[prevOrderIndex] = prevPathSum;
    }

    prevOrderIndex--;
    prevPathSum -= node.val;
  };

  pathSum(root);

  return root;
}
```
