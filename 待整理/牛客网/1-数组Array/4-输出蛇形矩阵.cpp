/*
    //输出一个N行的蛇形矩阵。
    输入 4
    输出
        1 3 6 10  //2 3 4
        2 5 9//3 4
        4 8//4
        7
*/

#include <iostream>
using namespace std;
int main(void)
{
    int n;
    while(cin>>n){
        int base = 1;
        for(int i=1;i<=n;i++){
            cout<<base;
            int data = base;
            for(int j =i+1;j<=n;j++){
                data  = data + j;
                cout <<" "<<data;
            }
            cout<<endl;
            base += i;
       }
    }
    getchar();
}
