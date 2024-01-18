/**
 * https://leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
 * 
 * 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。
 * 从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。
 */

//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \    / \
// 7    2  5   1
// sum = 22;
// return [
//     [5,4,11,2],
//     [5,8,4,5]
// ]

/********************************
 * 思路：
 *      根左右
 *      递归的时候 进行push
 *      回溯的时候 pop
 * 伴随变量：curTargetSum = sum - node.val
 */
function pathSum(root, sum) {
    let result = [];
    pathSumCall(root, sum, []);
    return result;

    function pathSumCall(root, curSum, pathArr) {
        if (!root) return;
        pathArr.push(root.val);

        if (!root.left && !root.right && root.val === curSum) {
            result.push(pathArr);
            pathArr.pop();
        }
        curSum = curSum - root.val;
        root.left && pathSumCall(root.left, curSum, pathArr);
        root.right && pathSumCall(root.right, curSum, pathArr);
        pathArr.pop();
    }
}


// 修改
function pathSum(root, sum) {
    let result = [];
    pathSumCall(root, sum, []);
    return result;

    function pathSumCall(root, curSum, pathArr) {
        if (!root) return;
        pathArr.push(root.val);
        if (!root.left && !root.right && curSum==root.val) {
            result.push([...pathArr]);
            // pathArr.pop();
        }
        curSum = curSum - root.val;
        root.left && pathSumCall(root.left, curSum, pathArr);
        root.right && pathSumCall(root.right, curSum, pathArr);
        pathArr.pop();
    }
}