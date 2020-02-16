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
 */

/***
 * 审题：和查找x的所有祖先元素类似,需要知道从根到该结点路径上访问的所有结点
 * 不同的地方：
 *      1、目标结点不是树上的任意结点，必须得是叶子节点
 * 
 * 思路：
 *      计算出每个叶子节点的路径和 确定是否有匹配目标值的
 *      后序遍历，对每个弹栈的叶子节点，进行路径和匹配
 */
// way1
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
                let node = stack.pop();
                // 后序遍历 对每个弹栈的叶子结点进行路径和判断
                if(!node.left&&!node.right){
                    let curSum = node.val;
                    stack.forEach(item=>{
                        curSum += item.val
                    })
                    if(curSum==sum) return true;
                }
                prev = node;  
                p = null;
            }
        }
    }
    return false;
}


/**
 * 后序遍历-递归
 * 递归函数：实现每个叶子节点的路径和
 * 全局arr：记录树的每个叶子的路径和，遍历arr判断得到结果值
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

        root.left && hasPathSumCall(root.left,curSum + root.val);
        root.right && hasPathSumCall(root.right,curSum + root.val);
    }
}

/*****
 * 递归代码优化:
 * 可不可以不使用全局数组，转为已知当前叶子的路径curSum之后 就判断是否符合sum呢
 * 但是 原函数的sum是总sum 不是从0开始叠加的
 * ===>
 * 转变思路： 到了叶子节点，就是sum -  之前祖先节点的所有节点(类似于过路费的感觉hh)
 * 
 */

function hasPathSum(root,sum){
    if(!root) return true;
    if(!root.left&&!root.right){
        return root.val == sum;// sum - root.val=0
    }
    
    let left = hasPathSum(root.left,sum-root.val);
    let right = hasPathSum(root.right,sum-root.val);
    // left 或者 right 任意一个为真或者全是真 都返回真，全是false 则是false
    // 并联 或门
    return (left || right);
}



// 递归代码再次优化
function hasPathSum(root,sum){
    if(!root) return false;
    return (!root.left&&!root.right&&root.val==sum)||hasPathSum(root.left,sum-root.val) || hasPathSum(root.right,sum-root.val);
}