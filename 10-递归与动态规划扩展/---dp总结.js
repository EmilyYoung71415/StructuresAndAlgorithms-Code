/**
 * 1、编号dp
 *      ep:最长递增子序列 [2,1,5,3,6,4,8,9,7] ==-> [1,3,4,8,9]
 *      本类动态规划是基础，一般来说有两种编号的状态：
 *          1、状态i表示前i个元素决策组成的一个状态。
            2、状态i表示用到了第i个状态，和某些在1到i-1之间的元素，
               决策组成了一个状态。
        F[i]：表示前i个元素XXXX
        F[i]:以第i个元素结尾的XXXX
        F[i][j]:前i个元素中恰好有j个XXXX

 * 2、前缀dp
 *      ep:最长公共子序列 str1="1A2B3C",str2="B1D23CA" LCS="123C"
 *      特点是：
 *      f(i)可以由f(i-1)得到，或者
 *      f(i,j)可以由f(i-1,j-1),f(i-1,j),f(i,j-1)得到
 * 
 * 3、划分(区间)dp
 *      f(i,j)={f(i,k)+f(k+1,j)+cost(k)} i<k<j
 * 
 *      例题: 矩阵连乘、石子合并
 * 
 * http://luoshaochuan.com/2017/07/12/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E6%80%BB%E7%BB%93(%E4%B8%89)/
 * https://blog.csdn.net/trochiluses/article/details/37966729
 * https://blog.csdn.net/zichen_ziqi/article/details/82184495
 */