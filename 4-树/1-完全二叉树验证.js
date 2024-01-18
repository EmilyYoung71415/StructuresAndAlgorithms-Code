/*****
 * 958
 * 判断二叉树是否为完全二叉树
 * 
 * 完全二叉重要性质: 具有n个节点的完全二叉与满二叉的节点的编号一致
 * 
 * 思路：   
 *  使用层序遍历。将所有节点都加入队列中(包括空节点)
 *  当遇到空括号的时候，查看队列的后继元素是否有非空节点
 *      1
 *     / \ 
 *    2   #
 *   / \
 *  4   5
 * 当遍历到1 的时候 队列此时 [2,#]
 * 当遍历到2 的时候 会往队列里加入2的 子节点 [2,#,4,5]
 * 按完全二叉的说法只要出现了空节点，(树的)下面应该不能有节点的
 * 即完全二叉不会出现中间层节点为空但是 下面层还有节点的情况
 */

function isCompleteTree(root){
    let queue = [root];
    while(queue.length){
        // 不需要区分当前层与上层关系
        let node = queue.shift();
        if(node){
            queue.push(node.left)
            queue.push(node.right)
        }
        else{// 一旦出现了空节点 就经历一场生死考验 赢者为王败者为寇
            while(queue.length){
                let nextNode = queue.shift();
                if(!nextNode){
                    return false;
                }
            }
        }
    }
    return true;
}