#include <iostream>
#include <iomanip>
using namespace std;
/*
    1  2  3  4 
    5  6  7  8
    9 10 11 12
    13 14 15 16

    输出：
        1 2 5 9 6 3 4 7 10 13 14 11 8 12 15 16

*/

void zigzagPrintLine(int (*matrix)[4], int leftX, int leftY, int rightX, int rightY, bool isFromBottom)  
{  
    if(isFromBottom)  
        while(leftX >= rightX)  
            std::cout << matrix[leftX--][leftY++] << " ";  
    else  
        while(rightX <= leftX)  
            std::cout << matrix[rightX++][rightY--] << " ";  
}  

void zigzagPrintMatrix(int (*matrix)[4], int height, int width)  
{  
    int leftX = 0, leftY = 0, rightX = 0, rightY = 0;  
    int endX = height - 1, endY = width - 1;  
    bool isFromBottom = true;  
    while(leftY <= endY && rightX <= endX)  
    {  
        zigzagPrintLine(matrix,leftX,leftY,rightX,rightY,isFromBottom);  
        if(++leftX > endX)  
        {  
            leftX = endX;  
            leftY++;  
        }  
        if(++rightY > endY)  
        {  
            rightY = endY;  
            rightX++;  
        }  
        isFromBottom = !isFromBottom;  
    }  
}  
void printMatrix(int (*matrix)[4], int height, int width)  
{  
    for(int i = 0; i < height; i++)  
    {  
        for(int j = 0; j < width; j++)  
            std::cout << std::setw(2) << matrix[i][j] << " ";  
        endl(std::cout);  
    }  
}  
  
int main(void)  
{  
    int matrix[4][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};  
    endl(std::cout << "Original Matrix: ");  
    printMatrix(matrix,4,4);  
    endl(std::cout << "=============");  
    endl(std::cout << "Zigzag output:");  
    zigzagPrintMatrix(matrix,4,4);  
    getchar();
    return 0;  
}  
 

