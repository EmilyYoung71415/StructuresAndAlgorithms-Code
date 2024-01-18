// 3.将一个任意长的数字变成逗号分割的格式
// 1234.56 => "1,234.56" , 123456789 => "123,456,789"
parseToMoney(1234.56) // return "1,234.56"

function parseToMoney(num){
    //return num.()
}

/*****
 * 1\正则
 *      '1234567891'.replace(/(\d+?)(?=(\d{3})+$)/g, '$1,')
 *      向前匹配
 * 2、以.分割
 * 3、
 * 
 * 
 */


var string = "我的账户余额：2,235,467.20";
console.log();
// 请用js计算出我到底有多少钱（输出Number类型数字，代码尽量简洁，考虑通用情况）
// new Number(string.replace(/[^0-9.]/g,''))



// 56789123.45
// 56,789,123.45
function transform(number){
    var num = number.toString()
    var numArr = num.split('.')
    var [num, dotNum] = numArr
 
 
    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for(var i = 0; i< len; i++){
         result.push(operateNum[i])
         if(((i+1) % 3 === 0) && (i !== len-1)){
              result.push(',')
        }
    }
 
    if(dotNum){
         result.reverse().push('.'， ...dotNum)
         return result.join('')
    }else{
         return result.reverse().join('')
    }
 
}