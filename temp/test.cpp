#include <iostream>
#include <vector>
using namespace std;


/*

有一个二维数组(n*n),写程序实现从右上角到左下角沿主对角线方向打印。
测试样例    [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],4
    1   2   3   4
    5   6   7   8
    9   10  11  12
    13  14  15  16
    即以 右上角到左下角的对角线 对称打印
    输出：[4,3,8,2,7,12,1,6,11,16,5,10,15,9,14,13]

边界处理：
    思路1：
        1.沿着对角线打印，每次打印之后，x、y都要+1，直至x或者y超出边界。
        2.每轮遍历的起始点，是遵循(0,n-1)...（0,0）...（n-1,0）。
            y先减小到0，然后x增加到n-1
            所以遍历的终止条件是startX >=n
    思路2：
        梳理：平行于左对角线打印，每次的数为上个数斜向下移动一格，即x+1、y+1
            向下移动的边界值：i、j 小于n
        难点：
            每次输出的起点值判断
            ===》 起点：
                    右上角打印：
                        均为第一行，每轮遍历，起点的值从最右上角逐渐向左移动到最左边。col--
                    左下角打印：
                        第一列，每轮遍历，起点值从第一列最上面移动到最下面。row++

*/

int main(void)
{
    int matrix[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}}; 
    int n =4;
    vector<int> vec; 
    int index = 0;
    int startX = 0;
    int startY = n -1;
    while(startX<n){
        int i = startX;
        int j = startY;
        while(i<n&&j<n){
            vec.push_back(matrix[i++][j++]);
        }
        if(startY>0){
            startY--;
        }else{
            startX++;
        }
    }
    //return vec;
    int len = vec.size();
    for(int i =0;i<len;i++){
        cout<<vec[i]<<" ";
    }
    getchar();
}