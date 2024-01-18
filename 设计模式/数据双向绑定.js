/**
 * 依赖收集的引入
 * 为什么需要
 *      1、监听的是data:{text1:xx;text2:xxx}整个对象
 *          如果 vue对应的模板里并没有用到text2 但是当text2变化时
 *          因为是监听的{}data对象，所以会触发setter的 视图更新 操作
 * 
 *      2、全局变量 global.gData = 1
 *          有两处实例引用了这个数据
 *          依赖收集 可以让gData知道 有两个实例需要依赖gData数据，
 *          变化的时候需要通知这两个实例
 * 
 *  getter的时 会知道哪个实例引用了这个数据，那么就将这个实例添加到 
 *              watcher的sub 即收集了依赖
 *  当setter的时 在setterRetive函数里 触发 watcher 的notify 通知sub里的依赖进行re-render
 *  所以 dep是一个更高层的抽象，
 */
const _Dep = {}
_Dep.target = null;
function Dep(){
    this.subs = [];// 存放watcer对象
}
Dep.prototype = {
    addSub:function(sub){
        this.subs.push(sub);
    },
    // 通知watcher对象更新视图
    notify:function(){
        this.subs.forEach(sub => {
            sub.update();// 调用 watcher(实例)的update
        })
    }
}

function Watcher(){
    _Dep.target = this;
}

Watcher.prototype={
    update:function(){
        console.log('更新视图操作')
    }
}

function Vue({data}){
    this._data = data;
    new Watcher();// 改变全局的dep.target 使得一个新的实例指向它
    observe(data)
    function observe(value){
        if (!value || (typeof value !== 'object')) {
            return;
        }
        Object.keys(value).forEach((key) => {
            defineReactive(value, key, value[key]);
        });
    }
    function defineReactive(obj,key,val){
        const dep = new Dep()
        Object.defineProperty(obj,key,{
            get: function reactiveGetter () {
                // console.log('getter')
                // return val;/* 实际上会依赖收集，下一小节会讲 */
                dep.addSub(_Dep.target)
                return val;
            },
            set:function reactiveSetter(newVal){
                // console.log(newVal)
                dep.notify()
            }
        })
    }
}


let o = new Vue({
    data: {
        test: "I am test."
    }
});
// 先触发 get
o._data.test
o._data.test = 1;