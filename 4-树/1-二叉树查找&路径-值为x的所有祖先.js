/****
 * 在二叉树中查找值为x的节点，打印出值为x的节点的所有祖先
 * 假设 值为x的节点最多只有一个
 *
 * 思路：
 *  后序遍历,最后访问根节点
 *  非递归后序遍历，当访问值为x的结点时，此时栈里的所有结点都为x的祖先
 */
function postSearch(root, x) {
  let stack = [],
    prev = null,
    p = root;
  while (p || stack.length > 0) {
    if (p) {
      stack.push(p);
      p = p.left;
    } else {
      let topNode = stack[stack.length - 1];
      if (topNode.right && topNode.right != prev) {
        p = topNode.right;
        stack.push(p);
        p = p.left;
      } else {
        let node = stack.pop();
        if (node.val == x) {
          // 开始倾倒栈的所有节点
          let str = '';
          while (stack.length) {
            let fNode = stack.pop();
            str = fNode.val + '——>' + str;
          }
          return str;
        }
        prev = node;
        p = null;
      }
    }
  }
  return null;
}

// 递归算法
function postorderTraversal1(root, x) {
  let result = [];
  let popRoot = false;
  postorderTraversalCall(root);
  return result; // 包含查找值结点
  function postorderTraversalCall(root) {
    if (root == null) {
      return;
    }
    if (root.val == x) {
      popRoot = true;
    }
    // 使用popRoot 为了不再继续向下递归 只要在某个结点找到了x值整个递归程序开启回溯模式 所以使用全局flag控制
    !popRoot && postorderTraversalCall(root.left);
    !popRoot && postorderTraversalCall(root.right);
    // 回溯阶段： 最根节点是最后看到的 所以使用头插
    popRoot && result.unshift(root.val);
  }
}
