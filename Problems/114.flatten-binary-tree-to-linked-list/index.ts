/*
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
import { TreeNode } from '@utils';
/**
   Do not return anything, modify root in-place instead.
  修改left节点为空
 */

// 这个优化的版本使用了一个prev变量来保存上一个遍历的节点，
// 然后在遍历过程中修改节点的指向。这样可以避免使用额外的数据结构，空间复杂度仍然是O(1)
export function flatten(root: TreeNode | null): void {
  if (!root) return;

  let prev: TreeNode | null = null;
  // 先序访问顺序，使用prev节点不断指向先序访问的节点
  const dfs = (node: TreeNode | null) => {
    if (!node) return;

    // queue.push(node);
    // 当节点>1时开始调用指向链接
    // 下一步递归传递的时候要传改变之后的, 所以申明新变量
    const leftNode = node.left;
    const rightNode = node.right;

    if (prev !== null) {
      prev.right = node;
      prev.left = null;
    }

    prev = node;

    leftNode && dfs(leftNode);
    rightNode && dfs(rightNode);
  };

  dfs(root);
}

// 通过递归先序遍历把所有的节点放在数组里，然后在一个for循环修改他们的指向。 时间复杂度O(n) 空间复杂度O(n)
export function flatten1(root: TreeNode | null): void {
  if (!root) return;

  const queue: TreeNode[] = [root];

  const dfs = (node: TreeNode | null) => {
    if (!node) return;

    queue.push(node);

    node.left && dfs(node.left);
    node.right && dfs(node.right);
  };

  dfs(root);

  while (queue.length) {
    const node = queue.shift();
    const nextNode = queue[0];
    node.left = null;
    node.right = nextNode || null;
  }
}

// 可以优化吗，不用queue存全部的节点， 用滚动数组的形式代替？
// 用栈保存了右孩子，所以不需要担心右孩子丢失了。用一个 pre 变量保存上次遍历的节点
export function flatten3(root: TreeNode | null): void {
  if (!root) return;
  const stack: TreeNode[] = [root];
  let prev: TreeNode | null = null;
  // 树的先序遍历的迭代写法修改的
  while (!stack.length) {
    const tempNode = stack.pop(); // 保存
    // 根
    if (prev !== null) {
      prev.right = tempNode;
      prev.left = null;
    }
    if (tempNode.right != null) {
      stack.push(tempNode.right);
    }
    if (tempNode.left != null) {
      stack.push(tempNode.left);
    }
    prev = tempNode;
  }
}
