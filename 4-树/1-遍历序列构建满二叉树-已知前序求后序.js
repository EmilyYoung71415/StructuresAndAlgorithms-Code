/***
 * 遍历序列构建满二叉树-已知前序求后序
 * 题源：王道考研 课后习题15
 */

/****
 * 思路：
 * way1、遍历序列->还原树->遍历树得遍历序列2 复杂度较高
 * way2、利用满二叉性质，从遍历序列直接划分重装遍历序列2
 * 核心：前序[根左右] 正确剥离出[根、左、右]从而将前序的左换为后序的 [左，右、根]上
 * 满二叉:每个节点的左右节点都要么都有节点，要么都没有节点
 * 所以 在根左右中左右的分离：左、右肯定是二二分的
 * 前序：根左右
 * 后序：左右根
 * 递归模型：s1,e1分别代表指向pre数组的头尾的指针
 *      当 e1<s1时
 *          f[pre,s1,e1,post,s2,e2], 不做任何事
 *      其他情况：
 *          f[pre,s1,e1,post,s2,e2]: post[e2]=pre[s1] // 根节点
 *              取中间位置 mid = (e1-s1)/2
 *              左子树：
 *              pre[s1+1,s1+mid] => 左 => post[s2,s2+mid-1];
 *              即 f[pre,s1+1,s1+mid,post,s2,s2+mid-1]
 *              右边依然 f[pre,s1+mid+1,e2,post,s2+mid,s2-1]
 */
//       1
//     /   \
//    2     3
//   / \   / \
//  4   5 6   7
// 前序：[1,2,4,5,3,6,7];
// 后序: [4,5,2,6,7,3,1];
function preToPost(pre, s1, e1, post, s2, e2) {
  if (e1 < s1) return;
  post[e2] = pre[s1];
  let mid = Math.floor((e1 - s1) / 2);
  preToPost(pre, s1 + 1, s1 + mid, post, s2, s2 + mid - 1); // 转换左子树
  preToPost(pre, s1 + mid + 1, e1, post, s2 + mid, e2 - 1); // 转换右子树
}

let pre = '1,2,4,5,3,6,7'.split(',');
let post = [];
preToPost(pre, 0, pre.length - 1, post, 0, pre.length - 1);
console.log(post);
