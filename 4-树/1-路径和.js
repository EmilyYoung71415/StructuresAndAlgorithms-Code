/*****
 * leetcode:112
 * 
 * 给定一个二叉树和一个目标和，
 * 判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和
 * 【叶子节点是指没有子节点的节点。】
 *            5     sum = 22
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
 * ==> true
 * 因为: 5->4->11->2
 * 
 * 思路1：
 *      和值为x的祖先差不多思路，后序遍历每个节点
 *      当 节点弹出栈的时候 里面全是他的祖先节点，那么可以判断当前sum是否符合
 * ==> 纠正：弹栈的时候判断是否是叶子节点
 * 思路2：
 *      当节点=8 这时curSum>sum 其实可以放弃他下面的所有子树节点了
 *      改造先序遍历
 */

/*****
 * 出错过的测试用例
 *    1   sum=1
 *   /
 *  2
 * return =>false
 * 
 *    1  sum =1
 * return => true
 *      
 * ❗突然明白理解错题的意思了。。。
 *  不是到树上的任意节点。是叶节点!!
 */

// ❗ 逻辑错误
function hasPathSum(root,sum){
    if(!root) return false;
    let stack = [],
        prev = null,
        p = root;
    
    while(p||stack.length){
        if(p){
            stack.push(p);
            p = p.left;
        }
        else{
            let topNode = stack[stack.length-1];
            if(topNode.right&&topNode.right!=prev){
                p = topNode.right;
                stack.push(p)
                p = p.left
            }
            else{// 要打印节点了 此时栈里的元素就是节点本身、及其祖先
                let curSum = 0;
                // for(let i=0;i<stack.length;i++){
                //     curSum += stack[i].val;
                //     if(curSum==sum&&i>=1){
                //         return true;
                //     }
                // }
                // 一直遍历求加
                stack.forEach(item=>{
                    curSum += item.val
                })
                if(curSum==sum) return true

                prev = topNode;
                p = null;
                stack.pop()
            }
        }
    }
    return false;
}

// ✅
// 但是太复杂了，既然不关心中间节点的计算值 那完全可以递归呐
// 怎么设计可以实现递归过程中叶子节点的计数呢
function hasPathSum(root,sum){
    if(!root) return false;
    let stack = [],
        prev = null,
        p = root;
    
    while(p||stack.length){
        if(p){
            stack.push(p);
            p = p.left;
        }
        else{
            let topNode = stack[stack.length-1];
            if(topNode.right&&topNode.right!=prev){
                p = topNode.right;
                stack.push(p)
                p = p.left
            }
            else{// 要打印节点了 此时栈里的元素就是节点本身、及其祖先
                // for(let i=0;i<stack.length;i++){
                //     curSum += stack[i].val;
                //     if(curSum==sum&&i>=1){
                //         return true;
                //     }
                // }
                // 一直遍历求加
                // stack.forEach(item=>{
                //     curSum += item.val
                // })
                // if(curSum==sum) return true
                let node = stack.pop();
                // 当前节点是 叶子节点
                if(!node.left&&!node.right){
                    let curSum = node.val;
                    stack.forEach(item=>{
                        curSum += item.val
                    })
                    if(curSum==sum) return true;
                }
                prev = node;  
                // prev = topNode;
                p = null;
                // stack.pop()
            }
        }
    }
    return false;
}


/****
 * 将每个叶子节点的路径和都push到全局变量数组里，主函数判断arr是否有目标sum
 * 而递归函数负责:计算整个树的每个叶子节点的路径和 
 * 所以递归函数设计：root,sum// sum是在 叶子节点的时候arr.push(sum)
 * // 在途中经历其他节点递归的时候 sum + root.val 负责累加
 */
function hasPathSum(root,sum){
    let arr = [];// 存放所有叶子节点的路径和
    hasPathSumCall(root,0);
    for(let i=0;i<arr.length;i++){
        if(arr[i]==sum){
            return true;
        }
    }
    return false;

    function hasPathSumCall(root,curSum){
        if(!root) return 0;
        //遇到了叶子节点
        if(!root.left&&!root.right){
            arr.push(curSum + root.val)// arr是全局变量
        }
        root.left&&hasPathSumCall(root.left,curSum + root.val);
        root.right&&hasPathSumCall(root.right,curSum + root.val);
    }
}

/*****
 * 递归优化:
 * 可不可以
 * 即知道当前叶子的路径curSum之后 就判断是否符合sum呢
 * 那么是不是函数参数就是和原函数传参入口很相似了呢?
 * 但是 原函数的sum是总sum 不是从0开始叠加的
 * ===>
 * 转变思路： 到了叶子节点，就是sum -  之前祖先节点的所有节点(类似于过路费的感觉hh)
 * 
 */

function hasPathSum(root,sum){
    if(!root) return 0;
    if(!root.left&&!root.right){
        return root.val == sum;
    }
    
    let left = hasPathSum(root.left,sum-root.val);
    let right = hasPathSum(root.right,sum-root.val);
    // left 或者 right 任意一个为真或者全是真 都返回真，全是false 则是false
    // 并联 或门
    return (left||right);
}



// 再次优化
function hasPathSum(root,sum){
    if(!root) return false;
    return (!root.left&&!root.right&&root.val==sum)
        ||(
            hasPathSum(root.left,sum-root.val) ||
            hasPathSum(root.right,sum-root.val)
          )
}