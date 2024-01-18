/***
 * leetcode: 429
 * 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
 * 
 */
function levelOrder(root) {
    if (!root) return [];
    let queue = [root];
    let result = [];
    while (queue.length) {
        let prevLevelLen = queue.length;
        let curRes = [];
        while (prevLevelLen--) {
            let node = queue.shift();
            node && curRes.push(node.val);
            node && queue.push(...node.children);
        }
        result.push(curRes);
    }
    return result;
}