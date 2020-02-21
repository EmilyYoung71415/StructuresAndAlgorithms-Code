/***
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/
 * 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
 * 层序遍历 需要区分每一层
 */

/***
 * 怎么区分每一行
 * 申请curRes，找到queue里上一层的节点与下一层之间的分割线即可
 * 在分割线左边的 都是当前层的
 */

function levelOrder(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    
    while (queue.length) {
        let prevLevelLen = queue.length;
        let curRes = [];
        while (prevLevelLen--) {
            let node = queue.shift();
            curRes.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        result.push(curRes);
    }
    return result;
}