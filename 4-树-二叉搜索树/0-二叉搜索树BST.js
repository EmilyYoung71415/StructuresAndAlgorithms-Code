/*****
 * 二叉搜索树 BST
 *      定义：左子树结点值 < 根结点值 < 右子树结点值
 *      特点：对二叉搜索树进行中序遍历 可以得到递增的有序序列
 * [查找search]
 *      target > root.val 那么就递归查找右子树 反之 左子树 直到target === root.val
 * [插入insert]
 * [删除remove]
 *      删除逻辑：
 * 1、先找到删除的那个节点，代码结构是 通过函数返回值更新this.root
 * 2、根据删除的节点的情况决定删除难度：
 *      2.1： 删除的节点无子节点为叶子节点 ==> node = null
 *      2.2:  删除的节点只有一个子节点 => 让父节点指向该节点的子节点， 代替该节点
 *      2.3:  删除的节点有两个左右子节点，左、中、右
 *          此时的逻辑是：以该点结点为根的整颗树里 找到 最接近他数值的数
 *                      即大小最接近它的节点(叫做继承者点吧)
 *          2.3.1：继承者点：右子树的最小值 or 左子树的最大值
 *          2.3.2: 让继承者点与删除点交换，从而问题转变为删除继承者点
 *                 (因为继承者点 只会属于2.1、2.2两种情况 从而问题简化)
 *                  怎么交换删除的呢？===->
 *                  让当前删除点的值==继承者的值,然后删除继承者点
 *
 *  二叉搜索树性质：
 *  根>=左 && 根<右 且是左子树的所有数 < 根
 *  二叉搜索树的中序遍历 就是将其节点有序输出
 *
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(x) {
    let newNode = new TreeNode(x);
    this.root = insertCall(this.root, newNode); // 将newNode插入到This.root这棵树下
    function insertCall(root, node) {
      if (!root) {
        root = node;
        return root;
      }
      if (node.val < root.val) {
        root.left = insertCall(root.left, node);
      } else {
        root.right = insertCall(root.right, node);
      }
      return root;
    }
  }
  // 递归查找
  search_R(key) {
    return searchNode(this.root, key);
    function searchNode(node, key) {
      if (node === null) return null;
      if (node.val === key) return node;
      if (key < node.val) {
        return searchNode(node.left, key);
      } else {
        return searchNode(node.right, key);
      }
    }
  }
  // 非递归查找
  search(key) {
    let node = this.root;
    while (node && node.val != key) {
      node = key < node.val ? node.left : node.right;
    }
    return node;
  }
  remove(x) {
    this.root = removeCall(this.root, x);
    function removeCall(node, key) {
      if (node == null) return null;
      if (key < node.val) {
        // 要删除的节点在node左侧
        node.left = removeCall(node.left, key);
        return node;
      } else if (key > node.val) {
        node.right = removeCall(node.right, key);
        return node;
      }
      // 找到节点
      else {
        if (node.left == null && node.right == null) {
          node = null;
          return node;
        }
        // 只有一个节点
        else if (node.left == null || node.right == null) {
          node = node.left || node.right;
          return node;
        }
        // 两个节点 决定继承者为 右子树的最小值
        let nextRootKey = getMin(node.right);
        node.val = nextRootKey;
        node.right = removeCall(node.right, nextRootKey);
      }
    }
    // 找到当前搜索树的最小节点：最左边的
    function getMin(root) {
      while (root && root.left) {
        root = root.left;
      }
      return root.val;
    }
  }
}

let arr = [-10, -3, 0, 5, 9];
let tree = new BinarySearchTree();
arr.forEach(item => tree.insert(item));
console.log(tree.root);
console.log(tree.search_R(5));
// tree.remove(9)
// console.log(tree.search(-3))

// module.exports =  BinarySearchTree
