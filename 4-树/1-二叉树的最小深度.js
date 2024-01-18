/***
 * leetcode:111
 * 给定一个二叉树，找出其最小深度
 * 如下树最小深度 是2
 *  3
   / \
  9  20
    /  \
   15   7
 * 
 *思路：
 * 关键:最小深度的出现 是根据叶子节点来的
 *    即判断每个叶子节点的所在深度 取最小的就是最小深度
 * 
 * 而最大深度 是只要下层还有节点 就会level++
 */

/****
 *      1 
 *     /
 *    1  
 * 最小深度是2
 * 
 **/ 



function minDepth(root){
  if(!root) return 0;
  if(!root.left&&!root.right) return 1;
  if(!root.left&&root.right) return 1+minDepth(root.right);
  if(!root.right&&root.left) return 1+minDepth(root.left);

  // 左右子节点都有
  return 1+ Math.min(minDepth(root.left),minDepth(root.right));
}

// 优化
function minDepth(root){
    // 遇到叶子节点 返回
    if(!root) return 0;
    let lDepth = minDepth(root.left);
    let rDepth = minDepth(root.right);
    // 如果有一者为空 则不用取最小 直接将两个加起来即可:一个比较巧妙的合并处理
    return (lDepth==0 || rDepth==0)?lDepth+rDepth+1:Math.min(lDepth,rDepth)+1;
}