/**
 * 递归版
 * 只求长度
 *  
 * 从Dp过来得易得。
 * 
 * 
 */
console.log(LCS("B1D23CA","1A2B3C"));
function LCS(str1,str2){
    if(str1===null||str2===null||str1===""||str2===""){
        return "";
    } 
    let str1Arr = str1.split("");
    let str2Arr = str2.split("");
    return LCSCall(str1Arr,str2Arr,str1Arr.length,str2Arr.length);
}

function LCSCall(arr1,arr2,row,col){
    if(row===0||col===0){
        return 0;
    }

    if(arr1[row-1]===arr2[col-1]){
        return LCSCall(arr1,arr2,row-1,col-1) + 1;
    }else{
        let a = LCSCall(arr1,arr2,row-1,col);
        let b = LCSCall(arr1,arr2,row,col-1);
        return (a>b)?a:b;
    }
}