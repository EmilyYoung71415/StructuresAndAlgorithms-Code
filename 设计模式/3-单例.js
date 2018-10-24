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
console.log(president.name1);
console.log(president.data1);
president.getName();

