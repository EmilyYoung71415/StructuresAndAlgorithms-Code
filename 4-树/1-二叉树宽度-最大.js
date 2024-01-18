/****
 * leetcode:662
 * 求二叉树宽度
 * 【这个二叉树与满二叉树（full binary tree）结构相同，但一些节点为空。】
 * exp：
 * 输入: 

           1
         /   \
        3     2
       / \     \  
      5   3     9 

    输出: 4
    解释: 最大值出现在树的第 3 层，宽度为 4 (5,3,null,9)。
 * 每一层的宽度被定义为两个端点（该层最左和最右的非空节点，
 *          两端点间的null节点也计入长度）之间的长度
 * 
 * 思路：
 *      层序遍历
 *      还是需要遍历到最后一层才能确定最宽的一层宽度
 * 
/***
 * [1,1,1,1,null,null,1,1,null,null,1]
 * 为啥是8 而不是4？
 *         1
 *     /      \
 *     1       1
 *   /   \    / \
 *   1   #   #   1
 *  / \ / \ / \ / \
 * 1  # # 1
 * 讨论解释的是最后一排是 1 #..6个..# 1 
 * 
 */
// BFS
// ❗ 有点问题
function widthOfBinaryTree1(root){
    let queue = [root];
    let max = 1;
    while(queue.length){
        let len = queue.length;// 上一层节点个数
        let res = [];
        while(len--){
            let node = queue.shift();
            node.left&&queue.push(node.left);
            node.right&&queue.push(node.right);
            res.push(node.left||null)// 是空节点也push进去
            res.push(node.right||null)
        }
        let newLen = getLen(res);
        max = Math.max(newLen,max);
    }
    return max;

    // 从两头往中间扫描
    function getLen(arr){
        if(!arr) return 0;
        let i = 0,j=arr.length-1;
        // 找到两端第一个不是null的节点
        while(i<arr.length&&!arr[i]){
            i++;
        }
        while(j>0&&!arr[j]){
            j--;
        }
        return j-i+1;
    }
}
// BFS 改进版 计算宽度 同样是利用 结点当前索引-当前层的第一个结点的索引
// 针对同层里  # 1 # # 3 这样的情况，将push空节点之后再从两头扫描算宽度，这里改进为记录结点索引值 和 开头和结尾的索引
function widthOfBinaryTree(root){
    // 因为需要当前结点的索引值（伴随变量） 所以将队列扩建为二维队列
    let queue = [[root,1]];// [root]
    let max = 0;
    while(queue.length){
        let len = queue.length;// 上一层节点个数
        let left =  queue[0][1];
        while(len--){
            const [node, posi] = queue.shift();
            node.left && queue.push([node.left,posi * 2]);
            node.right && queue.push([node.right, posi * 2 + 1]);
            let curWidth = posi - left + 1;
            if (curWidth > max) {
                max = curWidth;
            }
        }
    }
    return max;
}

/*****
 * 换个思路
 * 记录每一层的第一个非#结点索引，每次向后遍历，pos-index+1更新该层的宽度
 * posi使用的索引是树里的全局索引，完全二叉树的 2*posi+1, 2*posi
 */

// 深度优先
function widthOfBinaryTree(root){
    let left = [];// 记录每一层的第一个非#结点索引，每次向后遍历，pos-index+1更新该层的宽度
    let max = 0;
    DFS(root,0,1);
    return max;

    function DFS(root,depth,posi){
        if(!root) return;
        // 存放每层第一个非#结点，该层以后的结点遍历不更新left
        if(!left[depth]) left[depth] = posi;
        let curWidth = posi - left[depth] + 1;// curWidth 可能为 NaN , Math.max(1,NaN)=>NaN
        if (curWidth > max) {
            max = curWidth;
        }
        DFS(root.left, depth+1, posi*2);
        DFS(root.right, depth+1, posi*2+1);
    }
}