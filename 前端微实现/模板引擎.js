// 2.实现一个最简单的模板引擎
render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
	name:'姓名',
	age:18
})

// 结果： 我是姓名，年龄18，性别undefined。

// 正则、 replace 的第二个参数
var render = function(tpl,data){
	return tpl.replace(/\{\{(.+?)\}\}/g,function(m,m1){
		return data[m1]
	})
}