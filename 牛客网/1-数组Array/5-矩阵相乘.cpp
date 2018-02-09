#include <iostream>
#include <vector>
using namespace std;
/*
    原型：void matrix_multiply(int *m1,int *m2,int *r, int x, int y, int z);
    输入参数：
        int *m1：x行y列的矩阵(array1[x][y])
        int *m2：y行z列的矩阵(array2[y][z])
        int x：矩阵m1的行数
        int y：矩阵m1的列数/矩阵m2的行数
        int z：矩阵m2的列数
    输出参数：
        int *r：矩阵m1, m2相乘的结果(array3[x][z])
    返回值：
        void
    矩阵相乘复习：4,3 X 3,5 = 4,5 (矩阵相乘 中间一定相同)
        2 1         1 2         3 4
                X          =  
        4 3         1 0         7 8
        3 = 2*1+1*1
        4 = 2*2+1*0
        7 = 4*1+3*1
        8 = 4*2+3*0
*/
int main(void) {
    int x,y,z;
    while(cin >> x >> y >> z){
        vector<vector<int>> arr1(x,vector<int>(y,0));
        vector<vector<int>> arr2(y,vector<int>(z,0));
        vector<vector<int>> arr3(x,vector<int>(z,0));

        //矩阵1 x行y列
        for(int i=0;i<x;++i){
            for(int j=0;j<y;++j){
                cin >> arr1[i][j];
            }
        }

        //矩阵2 y行z列
        for(int i=0;i<y;++i){
            for(int j=0;j<z;++j){
                cin >> arr2[i][j];
            }
        }

        //矩阵3 x行z列
        for(int i=0;i<x;++i){
            for(int j=0;j<y;++j){
                for(int k =0;k<z;++k){
                    arr3[i][k] += arr1[i][j] * arr2[j][k]; 
                }
            }
        }

        //输出
        for(int i=0;i<x;++i){
            for(int j=0;j<z-1;++j){
                cout<<arr3[i][j]<<" ";
            }
            cout<<arr3[i][z-1]<<endl;//矩阵最后一行 换行符
        }
    }
}