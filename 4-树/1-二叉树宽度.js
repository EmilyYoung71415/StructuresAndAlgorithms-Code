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

// ❗ 有点问题
function widthOfBinaryTree(root){
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
}

/*****
 * 
 * 换个思路
 * 既然和满二叉一致的
 * 那么可以利用 每个节点的左右子树索引可以表示为 2*index+1 ,2*index+2 (index从0开始)
 *         1            i=0;
 *     /      \         
 *     1       1        2*i+1=1, 2*i+2=2
 *   /   \    / \       
 *   1   #   #   1      2*(2*i)=3, 2*(2*i+1)=4, 2*(2*i+1)=5, 2*(2*i+1)+1=6
 *  / \ / \ / \ / \
 * 1  # # 1
 * 
 * 本层索引标记树。 将 2*i+1 全局索引转换为每层索引 就可以根据本层索引计算宽度
 *         0                     
     0           1
  0     1     2      3
 0 1   2 3   4 5    6 7 

 *  
 */
function widthOfBinaryTree(root){
    // 存放每层的
    const mins = [0];// 第一层之后一个，所以本层全局索引结尾是0
    let max = 0;
    DFS(root,0,0);
    return max+1;

    function DFS(root,depth,posi){
        if(!root) return ;
        if(depth == mins.length){
            mins[depth] = posi;//mins数组存放的是每一层最后一个节点的 索引
        }
        let index = posi - mins[depth];// 当前节点在本层的索引
        max = Math.max(max,index);
        DFS(root.left,depth+1,index*2);
        DFS(root.right,depth+1,index*2+1);
    }
}