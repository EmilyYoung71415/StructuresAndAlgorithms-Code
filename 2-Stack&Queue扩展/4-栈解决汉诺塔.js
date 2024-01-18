/**
 * 有三个柱子
 *      ⊥   ⊥   ⊥
 *      A   B   C
 * 初始化时A上堆满了N个盘子，大盘在下面小盘在上面 
 * 请将A柱的盘子全部移入到C盘，要求：
 *  1.可以经过辅助柱B
 *  2.全部盘子在柱子上的排列 均为上小下大
 *  3.每次只能移动一个盘子
 *  
 * 求：
 *     最少移动次数和移动方案
 * 例子：
 *  source:[3]
 *      menthod：
 *          0. A[3] B[] C[]
 *          1. A[ ] B[] C[3]
 *      count:1        
 * source:[3,2]
 *      method:
 *          0. A[3,2] B[] C[]
 *          1. A[3] B[2] C[]
 *          2. A[] B[2] C[3]
 *          3. A[] B[] C[3,2]
 *      count:3
 * 
 * 思路(总结可得 移动n个盘子):
 *    0. ⊥   ⊥   ⊥
 *       n    0   0
 *    1.将盘1~n-1从A上移动到B上
 *       ⊥            ⊥              ⊥
 *      最大的n        n以上的全部盘子  0    
 *    2.将盘n移动到C上。
 *      ⊥   ⊥                   ⊥
 *      0   n以上的全部n-1个盘子  最大的n
 *    3.将盘1~n-1从B上移动到C上  
 *      ⊥   ⊥   ⊥
 *      0   0   n+ n以上的全部盘子
 */
let from = [3,2,1];
let helper  = [];
let to  = [];
let count = 0;
let res = towerOfHanoi(from.length,from,helper,to)
console.log(res);
 function towerOfHanoi(n,A,B,C){
    if(n>0){
        towerOfHanoi(n-1,A,B,C);
        B.push(A.pop());
        count++;
        towerOfHanoi(n-1,B,C,A);
    }
    return count;
 }