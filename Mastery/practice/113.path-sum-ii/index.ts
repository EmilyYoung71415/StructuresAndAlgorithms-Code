export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const targetPaths: number[][] = [];
  if (!root) return [];

  let pathSum = 0;
  const prePath: number[] = [];

  const dfs = (node: TreeNode | null) => {
    if (!node) return;

    // 对每进入的节点都视为加入了path
    prePath.push(node.val);
    pathSum += node.val;

    if (!node.left && !node.right) {
      if (pathSum === targetSum) {
        targetPaths.push([...prePath]);
      }
    }

    // 递归
    node.left && dfs(node.left);
    node.right && dfs(node.right);

    // 回溯 reset变量
    prePath.pop();
    pathSum -= node.val;
  };

  dfs(root);

  return targetPaths;
}

// 内存占用大，因为每一层一次克隆
export function pathSum0(root: TreeNode | null, targetSum: number): number[][] {
  const targetPaths: number[][] = [];
  if (!root) return [];

  const dfs = (node: TreeNode | null, path: number[], sum: number) => {
    if (!node.left && !node.right) {
      if (sum === targetSum) {
        targetPaths.push(path);
      }

      return;
    }

    node.left && dfs(node.left, [...path, node.left.val], sum + node.left.val);
    node.right && dfs(node.right, [...path, node.right.val], sum + node.right.val);
  };

  dfs(root, [root.val], root.val);

  return targetPaths;
}

// 有没有办法优化空间？
// dfs.path 每层都要deepClone，sum的传值也要伴随节点。能不能所有路径公用一个pathSum？叶节点回退 sum-=node.val的方式?
// FIXME: 为什么这个回溯的不对？===> 见line:73
// prePath = 最后等于[], 但其实中间是有targetPaths正确过的
export function pathSum1(root: TreeNode | null, targetSum: number): number[][] {
  const targetPaths: number[][] = [];
  if (!root) return [];

  let pathSum = 0;
  const prePath: number[] = [];
  const dfs = (node: TreeNode | null) => {
    if (!node.left && !node.right) {
      if (pathSum === targetSum) {
        // 因为targetPath push的是这个数组，数组的引用. 所以之后关于prePath的更改，他都会更改
        // NOTE: 重要：push进去的一定得是克隆的，不然有引用导致的数据篡改问题
        targetPaths.push([...prePath]);
      }

      return;
    }

    // TODO: 这块代码怎么优化下？==> 见最终的pathSum函数
    if (node.left) {
      pathSum += node.left.val;
      prePath.push(node.left.val);
      dfs(node.left);
      pathSum -= node.left.val;
      prePath.pop();
    }

    if (node.right) {
      pathSum += node.right.val;
      prePath.push(node.right.val);
      dfs(node.right);
      pathSum -= node.right.val;
      prePath.pop();
    }
  };

  pathSum += root.val;
  prePath.push(root.val);
  dfs(root);

  return targetPaths;
}
