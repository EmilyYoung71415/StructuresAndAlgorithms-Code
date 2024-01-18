/***
 * leetcode:236
 * 给定一个二叉树, 找到该树中两个指定节点p、q的最近公共祖先
 */
/***
 *      10
 *      / \
 *     6    14  
 *    / \   / \
 *   2   8 12
 * 
 * 6、14 的最近公共祖先：10
 * 6、8  的最近公共祖先：6
 */

/**
 * 思路：
 *     深度向下遍历
 *     如果当前节点 root=q || root= p 某一方先找到 ，返回即可（ q、p在同一链上的情况
 *     如果两者同时找到 那么回溯的时候 第一个root即是最近公共祖先节点
 * 时间复杂度是O(n)O(n)，空间复杂度是O(n)O(n)
 */
function lowestCommonAncestor1(root,q,p){
    if(root==null || root==q || root==p) return root;
    let left = lowestCommonAncestor(root.left,q,p)
    let right = lowestCommonAncestor(root.right,q,p)
    return (left && right) ? root: (left || right);
}

// 利用后序遍历 访问到当前节点时 此时的栈里元素元素祖先节点
/*******
 * 当非递归后序遍历时，当访问到某节点的时候，此时栈里全是该节点的祖先节点(栈顶->栈底： 父节点->祖先节点)
 * 对比 栈1、栈2. 从栈顶开始逐层向上匹配，匹配到相同的第一个元素就是最近公共祖先
 * 当遇见第一个目标节点（假设是p）的时，需要缓存当前p的stack 然后在遇见第二个节点时 进行栈的比对
 */
function lowestCommonAncestor(root,k,q){
    let stack = [],
        p = root,
        stack1 = [],
        firstMeetNode = null,//k or q
        prev = null;
    while (p||stack.length>0) {
        if(p) {
            stack.push(p)
            p = p.left;
        }
        else {
            let topNode = stack[stack.length-1];
            if (topNode.right&&topNode.right!=prev) {
                p = topNode.right;
                stack.push(p)
                p = p.left
            }
            else {
                let node = topNode; // stack.pop()
                // 不能保证k、q那个先被遇见。设定一个变量区分遇见了哪个
                if (firstMeetNode==null&&(node==q||node==k)) {
                    firstMeetNode = node;
                    stack1 = [...stack];
                }
                //node遇见了第二个节点 将两个栈一一比对 找出最近公共祖先节点
                if ((node==q||node==k)&&node!=firstMeetNode) {
                    for (let i=stack1.length-1;i>0;i--) {
                        for (let j=stack.length-1;j>0;j--) {
                            if (stack1[i]==stack[j]) {
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