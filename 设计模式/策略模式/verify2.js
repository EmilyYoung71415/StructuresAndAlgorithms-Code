/**
 * 
 * 
 */

 // 策略config
// 可接收函数也可以 接收 数组[正则,错误提示信息]
 const strategies = {
    required:function(value){
        if(!value) return '必填项';
    },
    phone:function(value){
        if(!/^1\d{10}$/.test(value)) return '请输入正确手机号'
    },
    number:function(value){
        if(!value || isNaN(value)) return '只能填写数字'
    }
 }


 function Verify({dom,...arg}){
    this.dom = document.querySelector(dom);
    this.queue = [];
    let _this = this;    
    init()
    function init(){
        // 遍历 dom里面绑定了data-verify属性的 特定执行函数 
        const doms = _this.dom.querySelectorAll('[data-verify]');
        [...doms].forEach(node=>{
            const str = node.getAttribute("data-verify");
            const value = node.value;
            const strArr = str.split("|")// required
            strArr.forEach(item=>{
                _this.queue.push(()=>{
                    if(strategies[item]){
                        return strategies[item].call(node,value)
                    }
                    else if(arg[item]){
                       return arg[item].call(node,value)
                    }
                })
            })
        })
    }
 }

 Verify.prototype.start = function(){
    for(let validatorFunc of this.queue){
        let errorMsg = validatorFunc()//开始校验，并取得校验后的返回信息
        if (errorMsg) {//r如果有确切返回值，说明校验没有通过
            return errorMsg
        }
    }
 }
