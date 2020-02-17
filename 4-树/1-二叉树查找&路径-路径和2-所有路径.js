/**
 * leetcode 113
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 *            5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1 
    sum = 22
    return:
    [
        [5,4,11,2],
        [5,8,4,5]
    ]
 */
/****
 * 思路：
 * way1： 迭代后序遍历的时候 当前元素将输出时 此时栈里的元素是所有的祖先节点 在此时判断栈之和 && 当前输出节点为叶节点
 * way2：递归后序遍历
 *          增加伴随变量：curTarget、 curRes
 */
function pathSum1(root, target) {
    let result = [],
        stack = [],
        prev = null,
        p = root;
    while(p||stack.length>0){
        if (p) {// 一直走到最左边
            stack.push(p);
            p = p.left
        }
        else {
            let topNode = stack[stack.length-1];
            if (topNode.right&&topNode.right!=prev) {
                p = topNode.right;
                stack.push(p)
                p = p.left;
            }
            else {
                let node = stack.pop();
                /* process code */
                if (!node.left && !node.right) {
                    let curRes = stack.map(item => item.val);
                    let curSum = curRes.reduce((acc, cur) => acc + cur, node.val);
                    curSum === target && result.push([...curRes, node.val]);
                }
                /* process code */
                prev = node;
                p = null;
            }
        }
    }
    return result
};

// 递归
// 递归伴随变量： curTarget、 curRes
function pathSum(root, target) {
    let result = [];
    pathSumCall(root, target, []);
    return result;

    function pathSumCall(root, curtar, curres) {
        if (!root) return;
        if (!root.left && !root.right) {
            curtar == root.val && result.push([...curres, root.val]);
        }
        root.left && pathSumCall(root.left, curtar-root.val, [...curres, root.val]);
        root.right && pathSumCall(root.right, curtar-root.val, [...curres, root.val]);
    }
}

// 递归代码优化
function pathSum(root, target) {
    let result = [];
    pathSumCall(root, target, []);
    return result;

    function pathSumCall(root, curtar, curres) {
        if (!root) return;
        curres.push(root.val); // 递归进入当层时先push进curres 假定当前数是可行的
        curtar = curtar - root.val;
        if (!root.left && !root.right && curtar==0) {
            result.push([...curres]);// 必须进行浅拷贝
        }
        root.left && pathSumCall(root.left, curtar, curres);
        root.right && pathSumCall(root.right, curtar, curres);
        curres.pop();// 回溯的时候 将假定的数取出
    }
}