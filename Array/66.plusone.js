/*
* [0] ==> [1] 
* [5, 0] ==> [5, 1] 
* [1, 0, 9] ==> [1, 1, 0] 
* [1, 9, 9] ==> [2, 0, 0] 
* [3, 0, 7, 9] ==> [3, 0, 8, 0]
*/

//给定一个数组存储的大数，计算其加一之后的值
//AC1
var plusOne = function(digits) {
    for (var i = digits.length - 1; i >= 0; i--) {
        if (digits[i] == 9) {
            digits[i] = 0;
            if (!digits[0]) {
                digits.unshift(1);
                return digits;
            }
        }
        else {
            digits[i] += 1;
            return digits;
        }
        
    }
};

//AC2 递归
 function plusOne(digits) {
    var len = digits.length;
    endPlus(len-1);
    return digits;

    function endPlus (k){
        if(digits[k]==9){
            digits[k]=0;
            if(k===0){
                digits.unshift(1);
            }else{
                endPlus(k-1);
            }
        }else{
            digits[k]++;
        }
    }

};

console.log(plusOne([9, 0, 9]));