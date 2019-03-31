/****
 * 在二叉树中查找值为x的节点，打印出值为x的节点的所有祖先
 * 假设 值为x的节点最多只有一个
 * 
 * 思路：
 *  后序遍历
 *  最后访问根节点
 */
const {BinarySearchTree} = require('../index');
const arr = [10,6,14,2,8,12];
let tree = new BinarySearchTree();
arr.forEach(item=>tree.insert(item));
console.log(postSearch(tree.root,12))// 10->6
/***
 *      10
 *      / \
 *     6    14  
 *    / \   / \
 *   2   8 12
 * 
 * arr = 10,6,14,2,8,12
 */


function postSearch(root,x){
    let stack = [],
        prev = null,
        p = root;
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
                p = p.left;
            }
            else{
                let node = stack.pop()
                if(node.val==x){
                    // 开始倾倒栈的所有节点
                    let str = ''
                    while(stack.length){
                        let fNode = stack.pop()
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
