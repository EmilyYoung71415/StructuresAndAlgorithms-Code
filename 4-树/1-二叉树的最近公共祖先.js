/***
 * leetcode:236
 * 给定一个二叉树, 找到该树中两个指定节点p、q的最近公共祖先
 * 思路：
 * way1: 
 *    找p、q，同时保存住他们的路径。可以看成两条有公共节点的链表
 *    当不断往下的时候，直到他们分叉，即是最近一个公共节点
 *    复杂度：O(3*n)
 * way2:
 *    递归。找p或q
 *    如果在左边找到了 就返回左边的，如果左右都有 则是root(当前层的root)
 */
const {BinarySearchTree} = require('../index');
const arr = [10,6,14,2,8,12];
let tree = new BinarySearchTree();
arr.forEach(item=>tree.insert(item));
let node = lowestCommonAncestor(tree.root,new TreeNode(2),new TreeNode(8));
console.log(node)
/***
 *      10
 *      / \
 *     6    14  
 *    / \   / \
 *   2   8 12
 * 
 * arr = 10,6,14,2,8,12
 */
function TreeNode(x){
    this.val = x;
    this.left = this.right = null;
}
 // 递归
function lowestCommonAncestor1(root,q,p){
    if(root==null || root==q || root==p) return root;
    // 现在左边找p、q 如果当前root的左右子树都分为返回了值，那么此root就是最近公共祖先
    // 如果左边没有p也没有q，那么就q、p就在右子树里，结果由右子树决定
    let left = lowestCommonAncestor(root.left,q,p)
    let right = lowestCommonAncestor(root.right,q,p)
    // return left==null?right:(right==null?left:root);
    return (left&&right)?root:(left||right);
}

//后序遍历 ❗ 有点问题
/*******
 * 后序遍历最后访问根节点。根节点在栈底
 * 当非递归后序遍历时，当访问到某节点的时候，此时栈里全是该节点的祖先节点
 * 设p在q的左边，那么后序遍历时候 一定会先访问到p，此时栈里全是p的节点
 * 此时保存栈副本 栈1
 * 然后继续依靠原栈 访问得到q。此时的栈假设为 栈2
 * 然后对比 栈1、栈2. 从栈顶开始逐层向上匹配，匹配到相同的第一个元素就是最近公共祖先
 */
function lowestCommonAncestor(root,k,q){
    let stack = [],
        p = root,
        stack1 = [],
        firstMeetNode = null,//k or q
        prev = null;
    while(p||stack.length>0){
        if(p){
            stack.push(p)
            p = p.left;
        }
        else{
            let topNode = stack[stack.length-1];
            if(topNode.right&&topNode.right!=prev){
                p = topNode.right;
                stack.push(p)
                p = p.left
            }
            else{
                let node = stack.pop()
                // 不能保证k、q那个先被遇见。设定一个变量区分遇见了哪个
                // 弹栈 判断
                if(firstMeetNode==null&&(node==q||node==k)){
                    firstMeetNode = node;
                    stack1 = stack;// stack1存放p or q的全部祖先节点
                }
                // 将两个栈一一比对  确定node遇见了第二个节点
                if((node==q||node==k)&&node!=firstMeetNode){
                    for(let i=stack1.length-1;i>0;i--){
                        for(let j=stack.length-1;j>0;j--){
                            if(stack1[i]==stack[j]){
                                return stack1[i];
                            }
                        }
                    }
                }
                // 打印根节点
                prev = node;
                p = null;
            }
        }
    }
    return root;
}