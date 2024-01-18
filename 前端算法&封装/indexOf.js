/**
 * 字符串查找
 * 实现一个函数，可以判断 a 字符串是否被包含在 b 字符串中
 * 
 * 算法题遇见过
 * horborse好像
 * 
 * 字符串匹配  kmp算法
 * https://blog.csdn.net/buaa_shang/article/details/9907183
 * Boyer-Moore算法:
 *      比kmp更容易、运行效率更高、
 */


var b='abcabcdef'
var a='cde'
var j = 0;
var m=0;
var result = false;
for(var i=0;i<a.length;i++){
    while(j<b.length&&a[i] != b[j]){
         j++;
    }
    j++;
    if(a[i]!=b[j]) m++
    else m=0
}
if(m==a.length) result = true





function indexOf(str, val){
    var strLen = str.length, valLen = val.length
    for(var i = 0; i < strLen; i++){
        var matchLen = i + valLen
        var matchStr = str.slice(i, matchLen)
        if(matchLen > strLen){
            return -1
        }
        if(matchStr === val){
            return i
        }
    }
    return -1
}
