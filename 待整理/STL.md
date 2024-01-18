+ [stl 快速入门](https://www.cnblogs.com/skyfsm/p/6934246.html)
+ [C++中STL用法总结](http://blog.csdn.net/piaoxuezhong/article/details/54348787)


## string
+ C++ 标准库中的string表示可变长的字符串，它在头文件string里面。`#include <string>`

初始化对象：
```
string s3 = "I am Yasuo"; //直接初始化，s3存了字符串
//与上等价
string s3(I am Yasuo);
string s4(10, 'a'); //s4存的字符串是aaaaaaaaaa
string s5(s4); //拷贝初始化，深拷贝字符串
```
string操作：
```
getline(is,s)//从is中读取一行赋给s，返回is
s.empty()
s.size()
s[n]
```


## vector
> C++ STL中的verctor好比是C语言中的数组，但是vector又具有数组没有的一些高级功能。与数组相比，vector就是一个可以不用再初始化就必须制定大小的边长数组 `#include <vector>`

初始化对象：
```

vector<int> v1;//vector的元素类型是int，默认初始化为0
vector<int> v5 = { 1,2,3,4,5 }; //列表初始化,注意使用的是花括号
vector<vector<int> >;  //注意空格。这里相当于二维数组int a[n][n];
vector<string> v6 = { "hi","my","name","is","lee" };
```


操作：
```
v.empty()
v.size()
v[n]

v.push_back(t)//尾添加
v.pop_back(t)//尾删除


v.erase("t")//删除t字符串
v.clear()
v.insert(index,obj)//指定插入位置的迭代器、插入的对象
```
副作用：但凡使用了迭代器的循环体，都不要向迭代器所属的容器添加元素

访问和操作vector中的每个元素:

```
for (int i = 0; i < v1.size(); i++)
{
    cout << v1[i] << endl;
    v1[i] = 100;
    cout << v1[i] << endl;
}

//或者使用迭代器来访问元素
vector<string> v6 = { "hi","my","name","is","lee" };
for (vector<string>::iterator iter = v6.begin(); iter != v6.end(); iter++)
{
    cout << *iter << endl;
    //下面两种方法都行
    cout << (*iter).empty() << endl;
    cout << iter->empty() << endl; 
}


//从后往前迭代
for (vector<string>::reverse_iterator iter = v6.rbegin(); iter != v6.rend(); iter++)
{
    cout << *iter << endl;

}
```



## set(集合)
> set跟vector差不多，它跟vector的唯一区别就是，set里面的元素是有序的且唯一的，只要你往set里添加元素，它就会自动排序，而且，如果你添加的元素set里面本来就存在，那么这次添加操作就不执行。要想用set先加个头文件set `#include <set>`



## list(链表)
> list是一个双向链表，而单链表对应的容器则是foward_list.list即双向链表的优点是插入和删除元素都比较快捷，缺点是不能随机访问元素`#include <list>`

```c++
#include <iostream>
#include <list>
#include <string>

using namespace std;
template <typename T>
void showlist(list<T> v)
{
    for (list<T>::iterator it = v.begin(); it != v.end(); it++)
    {
        cout << *it;
    }
    cout << endl;
}


int main()
{
    list<int> l1{ 1,2,3,4,5,5,6,7,7 };
    showlist(l1);
    /*//=>123455677*/
    system("pause");
    return 0;
} 
```

## map
> map运用了哈希表地址映射的思想，也就是key-value的思想，来实现的。`#include <map>`


用迭代器来访问元素
```c++
for (map<string, int>::iterator it = m1.begin(); it != m1.end(); it++)
{
    cout << it->first<<"  "<<it->second << endl;  //注意用法，不是用*it来访问了。first表示的是key，second存的是value
}
```