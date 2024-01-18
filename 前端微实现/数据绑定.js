// 有一个全局变量 a，有一个全局函数 b，实现一个方法bindData，执行后，a的任何赋值都会触发b的执行。
var a = 1;
function b(){
	console.log('a的值发生改变');
}
bindData();
a = 2; // 此时输出 a的值发生改变


/****
 * 闭包
 * call\apply 
 * 
 * 
 * 依赖收集
 * 
 */

function bindData(target, event){
	for(var key in target) {
		if(target.hasOwnProperty(key)) {
			(function(){
				var v = target[key];
				Object.defineProperty(target, key, {
					get: function() {
						return v;
					},
					set: function(_value) {
						v = _value;
						event.call(this)
					}
				})
			})()
		}
	}
}