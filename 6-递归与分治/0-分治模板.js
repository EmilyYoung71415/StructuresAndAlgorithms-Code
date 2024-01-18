/********
 * 分治： Divide & Conquer
 * 核心思想： 将大问题分解成小问题,然后可能会合并小问题的计算结果绘制成大问题的结果
 * 典型代表：归并排序
 * 与递归的区别： 基于递归
 * 但是分治更好的地方是：多线程计算小问题。特别是当小问题之间互不关联的时候
 * 
 */

function Divide_Conquer(problem,param1,param2,...arguments){
    // base case
    if(problem==null){
        // 输出结果
        return ;
    }

    // 准备数据、将大问题拆分成小问题 
    let data = prepare_data(problem);
    subproblem = split_problem(problem,data);
    
    // 处理 subproblem
    subresult1 = Divide_Conquer(subproblem[0],p1,p2);
    subresult2 = Divide_Conquer(subproblem[1],p1,p2);
    subresult3 = Divide_Conquer(subproblem[2],p1,p2);
    // ...

    // 对子结果进行合并、处理 再返回
    result = process_result(subresult1,subresult2,subresult3);
}