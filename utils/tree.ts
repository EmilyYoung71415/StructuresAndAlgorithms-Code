export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export class TreeUtil {
  // 从先序遍历还原二叉树: leetcode:1028
  // ref: https://www.geeksforgeeks.org/construct-a-perfect-binary-tree-from-preorder-traversal/
  static buildByPre(preOrder: number[]): TreeNode | null {
    function buildPerfectBT_helper(preStart: number, preEnd: number, pre: number[]) {
      // If preStart > preEnd return NULL
      if (preStart > preEnd) return null;

      // Initialize root as pre[preStart]
      const root = new TreeNode(pre[preStart]);

      // If the only node is left,
      // then return node
      if (preStart == preEnd) return root;

      // Parameters for further recursion
      let leftPreStart = preStart + 1;
      let rightPreStart = leftPreStart + Math.floor((preEnd - leftPreStart + 1) / 2);
      let leftPreEnd = rightPreStart - 1;
      let rightPreEnd = preEnd;

      // Recursive Call to build the
      // subtree of root node
      root.left = buildPerfectBT_helper(leftPreStart, leftPreEnd, pre);

      root.right = buildPerfectBT_helper(rightPreStart, rightPreEnd, pre);

      // Return the created root
      return root;
    }

    return buildPerfectBT_helper(0, preOrder.length - 1, preOrder);
  }

  static traversalOrder(root: TreeNode, order: 'pre' | 'in' | 'post' = 'pre'): TreeNodeVal[] {
    const output: TreeNodeVal[] = [];

    function helper(root: TreeNode) {
      if (!root) return;

      if (order === 'pre') {
        output.push(root.val);
      }

      if (root.left) {
        helper(root.left);
      }

      if (order === 'in') {
        output.push(root.val);
      }

      if (root.right) {
        helper(root.right);
      }

      if (order === 'post') {
        output.push(root.val);
      }
    }

    helper(root);

    return output;
  }

  // 一定是满二叉
  // 有问题
  static buildByLevel(levelOrder: TreeNodeVal[]): TreeNode {
    if (!levelOrder.length) {
      return null;
    }

    const buildTree = (index: number): TreeNode | null => {
      if (index >= levelOrder.length || levelOrder[index] === null) {
        return null;
      }

      const node = new TreeNode(levelOrder[index] as number);
      node.left = buildTree(2 * index + 1);
      node.right = buildTree(2 * index + 2);
      return node;
    };

    const root = buildTree(0);
    return root;
  }

  // 可能有问题
  static traversalLevelOrder(root: TreeNode): TreeNodeVal[] {
    const dp: TreeNodeVal[] = [];
    const queue: TreeNode[] = [root];

    while (queue.length) {
      const node = queue.shift();
      dp.push(node.val);

      node.left !== null && queue.push(node.left);
      node.right !== null && queue.push(node.right);
    }

    return dp;
  }
}
