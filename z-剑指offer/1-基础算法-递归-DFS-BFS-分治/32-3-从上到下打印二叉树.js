/***
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
 * 
 * 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，
 * 第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
 */

//     3
//    / \
//   9  20
//     /  \
//    15   7
// return  [
//     [3],
//     [20,9],
//     [15,7]
// ]

/**
 * 思路：
 *      层序遍历，奇数行反向
 *      flag控制
 */
function levelOrder(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    let index = 0;
    while (queue.length) {
        let prevLevelLen = queue.length;
        let curRes = [];
        while (prevLevelLen--) {
            let node = queue.shift();
            index%2==0 ? curRes.push(node.val) : curRes.unshift(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        index++;
        result.push(curRes);
    }
    return result;
}