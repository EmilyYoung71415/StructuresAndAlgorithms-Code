/**
 * 保证一个类只有一个实例
 * 
 * 运用闭包实现，私有变量
 * 
 * 再次证明 ，闭包是有数据的行为；  即类的设计模式中单例，可以使用闭包来实现其只能被“实例化”一次；
 */


 const president = (function(){
    const data1 = '私有的';
    const name1 = '可特定访问';

    const getName = ()=>{
        console.log(name1)
        return name1;
    };
    return {
        getName
    }
 }())
// console.log(president.name1);
// console.log(president.data1);
// president.getName();
/*****
 * 例子：
 *      网页版qq,点击登录，实例化显示登陆框
 *      但是 全局只能有一个登陆框。所以 该实例化 必须是单例
 *      
 * 单例：
 *     创建单例
 *     管理单例
 * 
 * 
 */


 // 设置 传入 创建单例的函数 ， 单例负责单例。
 // 返回一个函数
 function getSingle(fn){
    var result;
    // 如果 result 则return result 
    // 否则 命令result = fn.apply(this,xxx);
    return function(){
        return result||(result = fn.apply(this,arguments));
    }
 }


 var createLoginLayer = function(){  
    var div = document.createElement( 'div' ); 
    div.innerHTML = '我是登录浮窗'; 
    div.style.display = 'none'; 
    document.body.appendChild( div ); 
    return div; 
}; 


var createSingleLoginLayer = getSingle( createLoginLayer ); 

document.getElementById( 'loginBtn' ).onclick = function(){ 
    var loginLayer = createSingleLoginLayer(); 
    loginLayer.style.display = 'block'; 
}; 