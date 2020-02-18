/**
 * leetcode:257
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 */
//    1
//  /   \
// 2     3
//  \
//   5
// 输出: ["1->2->5", "1->3"]

/***
 * 思路：
 *      前序遍历，遍历的时候携带伴随变量[1->2]记录访问过的节点
 */

function binaryTreePaths(root) {
    let result = [];
    binaryTreePathsCall (root,[]);
    return result;

    function binaryTreePathsCall(node, pathArr) {
        if (!node) return;

        pathArr.push(node.val);
        if (!node.left && !node.right) {
            result.push(pathArr.join('->'));
            pathArr.pop();
            return;
        }

        node.left && binaryTreePathsCall(node.left, pathArr);
        node.right && binaryTreePathsCall(node.right, pathArr);
        pathArr.pop();
    }
}

// 代码改进
function binaryTreePaths(root) {
    let result = [];
    if (!root) return result;
    binaryTreePathsCall (root,'');
    return result;

    function binaryTreePathsCall(node, path) {
        if (!node) return;

        if (!node.left && !node.right) {
            result.push(path + node.val);
        }
        path += node.val + '->';
        node.left && binaryTreePathsCall(node.left, path);
        node.right && binaryTreePathsCall(node.right, path);
    }
}


/***
 * leetcode：129 与leetcode:257 同类题
 * 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
 * 计算从根到叶子节点生成的所有数字之和。
 *  1
   / \
  2   3
 * return 25 ( 12 + 13 = 25)
 */


/***
 * 思路：
 * 找出到叶子节点的路径
 * 从根节点到叶节点的数字累加： 10*prev+cur
 */

function sumNumbers(root) {
    let sum = 0;
    sumNumbersCall(root,0);
    return sum;

    function sumNumbersCall(node,curSum) {
        if (!node) return;
        curSum = curSum*10 + Number(node.val);
        if (!node.left && !node.right) {
            sum += curSum;
        }
        node.left && sumNumbersCall(node.left, curSum);
        node.right && sumNumbersCall(node.right, curSum);
    }
}

// 综上 求 树上根到所有叶子的路径 可以总结出模板
function pathFromRootToLeaves(root, path) {
    if (!root) return;
    // 到达叶子节点 
    if (!root.left&& !root.right) {
        // path =  path + root.val // 根到叶的全部节点
        /* process code */
    }

    path += root.val;
    node.left && pathFromRootToLeaves(node.left, path);
    node.right && pathFromRootToLeaves(node.right, path);
}