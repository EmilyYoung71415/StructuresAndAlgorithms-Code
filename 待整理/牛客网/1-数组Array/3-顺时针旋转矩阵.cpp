#include <iostream>  
using namespace std;  
  
#define ROW 3  
#define COL 4  

/*
    1  2  3  4 
    5  6  7  8
    9 10 11 12



    9   5   1
    10  6   2 
    11  7   3
    12  8   4


*/

//矩阵顺时针旋转90度  
void Rotation(int arr[ROW][COL])  
{  
    int tmp[COL][ROW];//局部变量，函数调用完后会自动释放  
    int dst=ROW-1;    //这里我们从目标矩阵的最后一列开始存放数据  
  
    //顺时针旋转矩阵90度  
    
    for(int i=0;i<ROW;i++,dst--)  
        for(int j=0;j<COL;j++)  
        //dst 是列 从右到左 。
        //外层循环 行不变，j++ 列改变，tmp[j][dst] 即守着最右层的列，一直向下增加。
        //当行变换的时候，dit--，即第二行的数据对应第二列。
            //tmp[j][dst]=arr[i][j];
              printf("%3d ",arr[i][j]);  
    


    //将旋转后的矩阵保存回原来的矩阵  
    for(int i=0;i<COL;i++)  
        for(int j=0;j<ROW;j++)  
            arr[i][j]=tmp[i][j];  
}  
  
  
int main(void)  
{  
    int arr[ROW][COL]={ {1,2,3,4},{5,6,7,8},{9,10,11,12}};  
    cout<<"矩阵顺时针旋转前\n";  
    for(int i=0;i<ROW;i++)  
    {  
        for(int j=0;j<COL;j++)  
            printf("%3d ",arr[i][j]);  
        cout<<endl;  
    }  
  
    Rotation(arr);  
  
    cout<<"\n矩阵顺时针旋转90度后\n";  
    for(int i=0;i<COL;i++)  
    {  
        for(int j=0;j<ROW;j++)  
            printf("%3d ",arr[i][j]);  
        cout<<endl;  
    }  
  
    getchar();  
}  