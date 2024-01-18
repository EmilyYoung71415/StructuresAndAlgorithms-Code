/**
 * https://zhuanlan.zhihu.com/p/37468694
 * @desc  递归
 * 递归和分支很像，和动态规划也像（像即有联系
 * 
 * 递归：
 *     把问题转化为规模缩小了的同类问题的子问题 
 *     有明确的不需要继续进行递归的条件(base case)
 *     有当得到了子问题的结果之后的决策过程 
 *     不记录每一个子问题的解
 * 递归应用：
 *      求一个数的乘方
 *      背包问题
 *      组合：选择一支队伍
 * 消除递归：
 *      递归的使用在方法的调用和返回都会有额外的开销
 *      用递归能实现的，用循环都可以实现\且效率更高，将递归转换为非递归，通常用栈
 * ===> 递归和栈
 * 
 *      尾调用优化？
 * 
 * @desc 分治
 * 分治：
 *      把它分解成几个子问题，
 *      找到求出这几个子问题的解法后，再找到合适的方法，
 *      把它们组合成求整个问题的解法
 *  如：  
 *      递归的二分查找：分为两个对自身的递归调用，分别对应问题的两个部分
 *      将查找范围分成比查找值大的一部分和比查找值小的一部分,
 *      每次递归调用只会有一个部分执行
 * 分治问题：
 *      汉诺塔(当然也可以栈解决)
 *  ===> 分成三步：
 *          从初始塔座A上移动包含n-1个盘子到中介塔座B上、
 *          将初始塔座A上剩余的一个盘子（最大的一个盘子）放到目标塔座C上
 *          将中介塔座B上n-1个盘子移动到目标塔座C上
 *      归并排序
 * 
 * 
 * @desc DP动态规划
 * DP:
 *      从暴力递归中来 
 *      将每一个子问题的解记录下来，避免重复计算 
 *      把暴力递归的过程，抽象成了状态表达 
 *      并且存在化简状态表达，使其更加简洁的可能
 * 
 * 分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，
 * 而动态规划则是将问题分解成相互依赖的子问题
 * 
 * 
 * 
 * @desc 递归&Dp题反思：
 *     以背包、数组目标元素查找、二维数组最小路径和为例
 * 0、辅助函数
 *      一般需要遍历原数组
 *      辅助函数即是： 前i个数 + 已有的结果 + some辅助条件
 * 1、分析特殊元素，控制可变量
 *      如 二维数组的最短路径之和分为 第一行和第一列的只能走一个方向的特殊判断
 * 
 * 2、找到base-case
 *      确定最终到达点的终点条件
 * 
 * 3、分析题中普通元素的一般规律：
 *      先找状态：
 *          如数组里的目标元素，在数组中的元素对应两个状态：选中与不选中
 *          如背包：这一件物品被选中与不被选中
 *          如二维路径的 向下 / 向右走
 *      确定表达式
 *          选中了怎样？ 加了之后的表达式
 *      依据题意确定最优解
 *          往往是 Math.min(方案1、方案2)
 */