/***
 * leetcode: 103
 * 锯齿形层次遍历
 *     3
      / \
      9  20
        /  \
       15   7
    return:
    [
        [3],
        [20,9],
        [15,7]
    ]
 */


/***
 * 思路:
 *      层次遍历多个约束
 * 偶数行 从左到右遍历（从0计数
 * 奇数行 从右到左遍历
 */

function zigzagLevelOrder(root) {
    if(!root) return [];
    let queue = [root];
    let result = [];

    while (queue.length) {
        let prevLevelLen = queue.length;
        let curRes = [];
        let isReverse = result.length%2 === 1; //奇数行 
        while (prevLevelLen--) {
            let node = queue.shift();
            if (!node) break;
            isReverse ? curRes.unshift(node.val) : curRes.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        result.push(curRes);
    }

    return result;
}