/**
 * @func 打印字符串全部子序列包括空
 *  "abc"
 * ==> a    b   c
 *     ab   ac  bc
 *      abc
 *      ""
 * 思路：2^3
 *      每个字符串就两个状态:0  1
 *      子函数：从在i之前的集合中，当前已经选择的字符pre
 */
//printallsub('abc');
 function printallsub(str){
    let strArr = str.split("");
    //console.log(strArr)
    printallsubCall(strArr,0,"");//从0开始，当前已选中的是"" 
    function printallsubCall(arr,i,pre){
        if(i===arr.length){
            console.log(pre);
            return ;
        }

        printallsubCall(arr,i+1,pre);// 不选择
        printallsubCall(arr,i+1,pre+arr[i]);// 选择
    }

 }


/****
 * @func 打印字符串全排列
 * 
 * abc
 * ===》每个字母有3个位置可待 3*2
 *      abc acb
 *      bac bca
 *      cab cba
 * 思路：
 *      每个开头：a\b\c
 *      当a时候留下bc，bc交换
 *      即每个字符试所有可能性
 *      怎么体现划分过程的& 第一轮与第二轮衔接的？
 *          
 *      printAllCal(arr,0)
 *      printAllCal(arr,i){
 *          let j=i;
 *          swap(arr,i,j)
 *              
 *      }
 * 
 * @func step1:----全排列要求不要出现重复的排列
 *      比如
 *      acc acc ==> acc
 */
//printAll('abc');
 function printAll(str){
    printAllCall(str.split(""),0);
    function printAllCall(arr,i){
        if(i===arr.length){
            console.log(arr.join(""));
            return;
        }

        for(let j=i;j<arr.length;j++){
            //swap(arr,i,j);// 将当前扫描的数排到最前面，剩下的自己排重复去吧
            [arr[i],arr[j]] = [arr[j],arr[i]];
            printAllCall(arr,i+1);
        }
    }
 }


 // 去重？
 // 一个set，存不重复的元素，如果已经有了arr[j]则无需再交换以j开分界的排列
 // 比如：accb 遇到第二个c时，无需再进行cc交换排列
 //         将从第二个c遇到的b开始继续交换

