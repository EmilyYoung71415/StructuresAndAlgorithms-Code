#include <iostream>
#include <iomanip>
using namespace std;


/*
    1  2  3  4 
    5  6  7  8
    9 10 11 12
    13 14 15 16

    1 2 3 4  8 12 16 15 14 13 9 5 6 7 11 10

    思路：
        问题拆分： 大矩阵化为小矩阵，一圈一圈的循环输出。
        那么面临的问题:
            1. 解决 一圈顺时针输出矩阵
                ===> 顺时针的顺序： 从左到右 => 从上到下，从右到左，从下到上。
                     边界值：以从左到右输出为例：起点，终点。保持循环输出的条件：当前点的x轴向移动值不等于矩阵右边界
            2. 子矩阵的起点？ 矩阵的范围确定
                ===> 子矩阵的起点（矩阵左上角）即是外围矩阵起点斜向下移动一格（x，y均向下移动）
                     限定值：起点由左上角确定，很自然的想到，由右下角确定终点（或者也可以以矩阵的边长做为限定值）
                     范围：左上角+右下角坐标确定范围 （而不是由矩阵边长确定范围）

    另辟蹊径：
        上面的方法都是按照题目说的要求来的，步步为营的求解出来。
        我们也许可以跳出顺时针、循环输出这个步骤，观察输出的数的特点。
        ===> 
            1. 将矩阵首行直接输出
            2. 去除矩阵首行的剩余矩阵，逆时针旋转90°，再次输出首行

    1  2  3  4          1  2  3  4              
    5  6  7  8  ====》  8 12 16        ====》 ===》1 2 3 4  8 12 16 15 14 13 9 5 6 7 11 10
    9 10 11 12          7 11 15
    13 14 15 16         6 10 14    
                        5  9 13
*/

//顺时针打印一圈实现
void printOneCircle(int(*matrix)[4], int leftTopX, int leftTopY, int rightBottomX, int rightBottomY)  
{  
    //如果左上角与右下角的x坐标（y轴向的移动值）相等 即只有一行
    if(leftTopX == rightBottomX)  
    {  
        for(int j = leftTopY; j <= rightBottomY; j++)  
            std::cout << matrix[leftTopX][j] << " ";  
  
        endl(std::cout);  
    }  
    //如果左上角与右下角的y坐标（x轴向的移动值）相等只有一列时  
    else if(leftTopY == rightBottomY)  
    {  
        for(int i = leftTopX; i <= rightBottomX; i++)  
            std::cout << matrix[i][leftTopY] << " ";  
  
        endl(std::cout);  
    }  
    else  //既有行又有列 即完整的一圈
    {  
        int curX = leftTopX;  
        int curY = leftTopY;  
        //从左到右边 循环输出的结束标识：当前点的x轴向移动值到头 
        while(curY != rightBottomY){  
            std::cout << matrix[curX][curY] << " ";  
            curY++;  
        }  
        //从上到下：循环输出的结束标识：当前点的y轴向移动值到头 
        while(curX != rightBottomX){  
            std::cout << matrix[curX][curY] << " ";  
            curX++;  
        }  
        //从右到左：循环输出的结束标识：当前点的x轴向移动值到头 
        while(curY != leftTopY){  
            std::cout << matrix[curX][curY] << " ";  
            curY--;  
        }  
        //从下到上：循环输出的结束标识：当前点的y轴向移动值到头 
        while(curX != leftTopX){  
            std::cout << matrix[curX][curY] << " ";  
            curX--;  
        }  
    }  
}  


//变换圈(起始点)
void clockwisePrint(int(*matrix)[4], int Height, int width)  
{  
    //根据圈的左上角坐标和右下角坐标确定圈的大小//X即x不变，y变，始终保持y轴移动
    int leftTopX = 0, leftTopY = 0, rightBottomX = Height - 1, rightBottomY = width - 1;  
    while(leftTopX <= rightBottomX && leftTopY <= rightBottomY)  
        //每打印完一圈 新圈的范围： 左上角坐标斜向下移动一格（x++,y++） 右下角坐标斜向上移动一格 
        printOneCircle(matrix, leftTopX++, leftTopY++, rightBottomX--, rightBottomY--);  
}  

int main(void)  
{  
    int matrix[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};  
    //打印原始矩阵
    endl(std::cout << "Original Matrix: ");  
    for(int i = 0; i < 4; i++)  
    {  
        for(int j = 0; j < 4; j++)  
            std::cout << std::setw(2) << matrix[i][j] << " ";  
        endl(std::cout);  
    }  
    endl(std::cout << "=============");  
    endl(std::cout << "Zigzag output:");
    //处理后的  
    clockwisePrint(matrix,4,4);  
    getchar();
}  

//提交
class Printer {
public:
    vector<int> clockwisePrint(vector<vector<int> > mat, int n, int m) {
        // write code here
        vector<int>ans;
        int l=0;
        int r=m-1;
        int up=0;
        int down=n-1;
         
        while(l<=r && up<=down)
        {
            for(int i=l;i<=r;i++)
                ans.push_back(mat[up][i]);
            for(int i=up+1;i<=down;i++)
                ans.push_back(mat[i][r]);
            if(up!=down)
            {
                for(int i=r-1;i>=l;i--)
                    ans.push_back(mat[down][i]);
            }
            if(l!=r)
            {
                for(int i=down-1;i>=up+1;i--)
                    ans.push_back(mat[i][l]);
            }
            l++;
            up++;
            r--;
            down--;
        }
        return ans;
    }
};
