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

export class MTreeNode<K> {
  val: K | null;
  children: MTreeNode<K>[] | null;

  constructor(val?: K, children?: MTreeNode<K>[] | null) {
    this.val = val === undefined ? null : val;
    this.children = children === undefined ? null : [];
  }
}

// 二叉树工具集
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
      const nextLevelQueue: TreeNode[] = [];
      let levelSize = queue.length;
      let nullNodeCount = 0;

      while (levelSize--) {
        const node = queue.shift();
        const isEmpty = node === null;
        dp.push(isEmpty ? null : node.val);

        const leftSubNode = isEmpty ? null : node.left;
        const rightSubNode = isEmpty ? null : node.right;
        nextLevelQueue.push(leftSubNode);
        nextLevelQueue.push(rightSubNode);

        leftSubNode === null && (nullNodeCount += 1);
        rightSubNode === null && (nullNodeCount += 1);
      }

      // const isAllNull = nextLevelQueue.every(node => node === null);
      if (nullNodeCount === nextLevelQueue.length) return dp;
      queue.push(...nextLevelQueue);
    }

    return dp;
  }
}

export class MTreeUtil {
  static findNode<K>(root: MTreeNode<K>, val: K): MTreeNode<K> | null {
    if (!root) return null;
    if (root.val === val) return root;

    if (root.children) {
      for (let subNode of root.children) {
        const node = this.findNode(subNode, val);
        if (node) {
          // 找到了才返回结束递归，没找到继续for循环
          return node;
        }
        // 这样不对: 不然child右边的节点永远返回null
        // return _findNode(subNode, name);
      }
    }

    return null;
  }
}
