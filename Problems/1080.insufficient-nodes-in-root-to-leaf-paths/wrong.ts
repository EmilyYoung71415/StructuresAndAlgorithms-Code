// 遍历时，计算出node->leaf的pathSum, 并缓存
// if (prevSum（-> 函数入参） + node.val + (node-> leaf) (-> 函数return 后序遍历)) > limit, 那么就可以保留（只要有一个path满足条件node则可以保留
export function sufficientSubset_wrong1(root: TreeNode | null, limit: number): TreeNode | null {
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

    // if (node.val === -99) {
    //   debugger;
    // }

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

// 问题1： return dfs则会提前终止。只遍历到最左边的路径
// 问题2： 经过该节点的路径和，在同一路线上由于7.8个节点就会计算这么多次。
// ---> 所以计算 // path->leafNode,的唯一路径
// loop1.loop 每遍历完，就将此路径上的所有node，遍历挂上： <nodeIndex, [path1, path2 ....]>
// 第二loop2，先序遍历，将不足节点删去
// 时间复杂度: loop1: N*logN
// FIXME: 主要是找到该node的所有路径缓存下来后再del，比较费时间。能不能在遍历的时候就知道呢
// ===> 「在同一路线上由于7.8个节点就会计算这么多次」每个节点到叶子节点的路径，可以缓存，这样就不用重复计算了
// 然后也解决了return返回值导致提前递归结束的问题
export function sufficientSubset_wrong2(root: TreeNode | null, limit: number): TreeNode | null {
  // <del>每个Node节点到叶节点的pathSum, index是先序preOrderIndex</del>
  // 先序遍历，从上往下, path[index] = root->node, 的pathSum
  // 而需要缓存的是: 每个node到叶节点的pathSum， [node1, node2, node3, ...., nodeN], node3.pathSum =

  // node->叶子节点的
  const nodePathSum: number[] = [];

  // 1.遍历树，填充path，先序-> 计算path -> 后序 -> 判断出不足节点并标记（如果直接删的话会影响preorderIndex导致计算错误

  // 求node到叶子节点的path
  let prevOrderIndex = 0;
  let prevPathSum = 0;
  // const pathSum = (node: TreeNode | null, prevOrderIndex: number, prevPathSum: number) => {
  // const pathSum = (node: TreeNode | null, prevPathSum: number) => {
  const pathSum = (node: TreeNode | null) => {
    prevOrderIndex++;
    prevPathSum += node.val;
    if (!node.left && !node.right) {
      nodePathSum[prevOrderIndex] = node.val; // 叶节点到叶节点path为本身
      return;
    }

    if (node.left) {
      pathSum(node.left);
      // TODO: 这个时候的prevOrder
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
  console.log(nodePathSum);

  return root;
}
