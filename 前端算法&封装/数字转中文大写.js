/**
 * 
 * 
 */


 // 将数字转换成中文大写的表示，处理到万级别，例如 12345 -> 一万二千三百四十五
function toLowerNum(){
    
}
console.log(toLowerNum(12345)); // 输出 一万二千三百四十五
console.log(toLowerNum(10001)); // 输出 一万零一
console.log(toLowerNum(10011)); // 输出 一万零十一
console.log(toLowerNum(10000)); // 输出 一万


function toLowerNum(num){
	var number = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // 定义中文数字
	var unit = ['', '十', '百', '千', '万'] // 定义中文基
	var resultStr = []
	var len = 0 // 数字长
	var lastNumNotZero = false
	while(num){
		let n = num % 10
		let u = len >= unit.length ? len % 5 + 1 : len % 5

		// console.log(n, u, len)
		// 添加基
		// if(n || (len >= unit.length && lastNumNotZero))
		if(
			n // 当前位存在
			|| // 或者
			( u == unit.length - 1 && // u 和 长度均为 最后一位unit
				len == unit.length - 1
			)
		)
			resultStr.unshift(unit[u])

		// 处理数
		if(
			n || lastNumNotZero // 当前位和前一位不都为零则处理
			&& 
			u !== unit.length - 1 // 且当前位不为最后一位基
		) 
        resultStr.unshift(number[n])
		lastNumNotZero = !!n
		len++
		num = Math.floor(num / 10)
	}
	return resultStr.join('')
}