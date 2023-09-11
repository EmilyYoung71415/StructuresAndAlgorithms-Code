// https://leetcode.cn/problems/longest-zigzag-path-in-a-binary-tree/

// base Case 居然是0， [1] => 0;
function longestZigZag(root: TreeNode | null): number {
  if (!root) return 0;
  let maxZigCount = 0;

  const dfs = (node: TreeNode | null, preDir: 'r' | 'l', pathCount: number) => {
    maxZigCount = Math.max(maxZigCount, pathCount);

    // 优化2， 根据prevDir来if else 而不是 nextDir来区分
    // if (node.left) {
    // 得出来的经验：
    // 当if里嵌套if判断的时候, 如果第一层的if不能区分是互斥状态，那很有可能第二层if会有重复逻辑
    // 所以优先将能区分成互斥状态的条件判断，提升到第一层 这样if里面能尽量做到逻辑不冗余

    if (preDir === 'r') {
      node.left && dfs(node.left, 'l', pathCount + 1);
      node.right && dfs(node.right, 'r', 1); // preDir ==nextDir
    } else {
      node.left && dfs(node.left, 'l', 1);
      node.right && dfs(node.right, 'r', pathCount + 1);
    }
  };

  // 这里开始调用的时候，就分配了 dir
  dfs(root, 'l', 0);
  dfs(root, 'r', 0);

  return maxZigCount;
}

function longestZigZag_wrong(root: TreeNode | null): number {
  let maxZigCount = 0;
  if (!root) return 0;

  const dfs = (node: TreeNode | null, pathCount: number, preDir?: 'r' | 'l') => {
    if (!node.left && !node.right) {
      maxZigCount = Math.max(pathCount, maxZigCount);
      return;
    }

    let isZig = preDir === undefined || pathCount === 1; // 重新reset的时候 无论沿哪个方向都是对的

    if (node.left) {
      if (!isZig) {
        isZig = preDir != 'l';
      }
      // FIXME: 这个的问题，不应该是直接重置了，
      // 这条路径上的pathMaxCount，
      // 从根节点开始0, next开始++
      // 而reset的时候，也持保留意见，dfs(pathMaxCount, curPathCount) // pathMaxCount也就是maxZigCount
      const nextPathCount = isZig ? pathCount + 1 : 1; // 从当前新节点开始reset;
      dfs(node.left, nextPathCount, 'l');
    }

    if (node.right) {
      if (!isZig) {
        isZig = preDir != 'r';
      }
      const nextPathCount = isZig ? pathCount + 1 : 1;
      dfs(node.right, nextPathCount, 'r');
    }
  };

  dfs(root, 0);

  return maxZigCount;
}

// NOTE： 容易出错的地方在于
// - 只有root的时候，0（一个点算0
// - 有一个子节点的时候，算1，（即点与点的直线，算1
// 从子节点变向reset的时候，pathCount的更改, 是将prevCount重置为0，下一个节点++.（重置和是isZag的情况都 path++
function longestZigZag1(root: TreeNode | null): number {
  let maxZigCount = 0;
  if (!root) return 0;

  const dfs = (node: TreeNode | null, pathCount: number, preDir?: 'r' | 'l') => {
    if (!node.left && !node.right) {
      return;
    }

    let isZig = preDir === undefined; // root开始任意走均可

    if (node.left) {
      isZig = preDir != 'l';

      const prevPath = isZig ? pathCount : 0;
      const nextPathCount = prevPath + 1; // 从上一个节点开始reset, 此时1开始
      maxZigCount = Math.max(nextPathCount, maxZigCount);
      dfs(node.left, nextPathCount, 'l');
    }

    if (node.right) {
      isZig = preDir != 'r';
      const prevPath = isZig ? pathCount : 0;
      const nextPathCount = prevPath + 1;
      maxZigCount = Math.max(nextPathCount, maxZigCount);
      dfs(node.right, nextPathCount, 'r');
    }
  };

  dfs(root, 0);

  return maxZigCount;
}
