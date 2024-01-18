/**
 * 理解的发布订阅模式 比 观察者多了一个dep即依赖收集的中间项
 * 
 */

 /****
 * 响应式原理
 * 抛开 1-vue-databind的客户端 调用 
 * 直接考虑输入数值的响应式管理 
 * 
 *  obj: 目标对象
    prop: 需要操作的目标对象的属性名
    descriptor: 描述符
    return value 传入对象
 * Object.defineProperty(obj, prop, descriptor)
 */

function Vue({data}){
    this._data = data
    observe(data)


    function observe(value){
        // value data:{}接收一个对象
        if (!value || (typeof value !== 'object')) {
            return;
        }
        Object.keys(value).forEach((key) => {
            defineReactive(value, key, value[key]);
        });
    }
    /**
     * 
     * @param {*} obj 一个需要绑定的对象  data:{test:1;test2:2}
     * @param {*} key test2
     * @param {*} val 2
     * 
     * 作用，将对象包裹起来，自此以后对对象的读、写操作都会收到监控
     * 即 读触发reactiveGetter 方法 写 触发 reactiveSetter方法
     */
    function defineReactive(obj,key,val){
        Object.defineProperty(obj,key,{
            get: function reactiveGetter () {
                console.log('getter')
                return val;/* 实际上会依赖收集，下一小节会讲 */
            },
            set:function reactiveSetter(newVal){
                console.log(newVal)
            }
        })
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test // 触发getter
//o._data.test = "hello,world.";  /* 视图更新啦～ */

