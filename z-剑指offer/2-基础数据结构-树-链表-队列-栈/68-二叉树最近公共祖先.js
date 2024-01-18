/***
 * https://leetcode-cn.com/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/
 *
 */

/*****************
 * 思路：
 *      后序 左右根 迭代时 此时的栈全是祖先元素
 */
function lowestCommonAncestor(root, k, q) {
  let stack = [],
    p = root,
    stack1 = [],
    firstMeetNode = null,
    prev = null;
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
        let node = topNode;
        if (firstMeetNode == null && (node == q || node == k)) {
          firstMeetNode = node;
          stack1 = [...stack];
        }
        // 将两个栈一一比对  确定node遇见了第二个节点
        if ((node == q || node == k) && node != firstMeetNode) {
          for (let i = stack1.length - 1; i > 0; i--) {
            for (let j = stack.length - 1; j > 0; j--) {
              if (stack1[i] == stack[j]) {
                return stack1[i];
              }
            }
          }
        }
        prev = node;
        p = null;
        stack.pop();
      }
    }
  }
  return root;
}

/***
 *  递归
 */
function lowestCommonAncestor(root, q, p) {
  if (root == null || root == q || root == p) return root;
  let left = lowestCommonAncestor(root.left, q, p);
  let right = lowestCommonAncestor(root.right, q, p);
  return left && right ? root : left || right;
}
