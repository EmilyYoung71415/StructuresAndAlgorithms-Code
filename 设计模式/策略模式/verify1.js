/**
 * 策略模式
 *  定义一系列的算法,把它们一个个封装起来，
 *  并且使它们可相互替换，策略模式使得算法的变化可独立于使用它的客户
 * 
 * 
 * 典型应用：
 *   使用策略模式完成表单验证
 * 
 *   策略模式能针对不同的情景让你选择适合的算法；
 * 
 * 将做什么、怎么做分离
 * 抽象：
 *      1、 策略： 
 *              如果 校验成功则返回null 校验失败 返回错误提示信息
 *          required: 判断是否为空
 *          minLen(value,length,errMsg)
 *          isEmail()
 *      
 *      2、 策略对象绑定--- 客户端的什么字段对应了什么规则，该规则错误提示信息
 *                          一个字段校验可能是多个 校验规则
 * 
 *          add(dom.userName,[{
 *              strategy:'minLen:6',
 *              errMsg:"用户长度不能超过xxx"
 *          }])
 *          (接收自校验函数 比如：不大于等于xxx
 * 扩展：
 *      1、改变 代码调用入口方式
 *      2、react-form的 校验  
 */

const strategies = {
    isNonEmpty(value, errorMsg) {
        return value === '' ?
            errorMsg : void 0
    },
    minLength(value, length, errorMsg) {
        return value.length < length ?
            errorMsg : void 0
    },
    isMoblie(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
            errorMsg : void 0
    },
    isEmail(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
            errorMsg : void 0
    }
}
class Validator {
    constructor() {
        this.cache = [] //保存校验规则
    }
    add(dom, rules) {
        for (let rule of rules) {
            let strategyAry = rule.strategy.split(':') //例如['minLength',6]
            let errorMsg = rule.errorMsg //'用户名不能为空'
            this.cache.push(() => {
                let strategy = strategyAry.shift() //用户挑选的strategy
                strategyAry.unshift(dom.value) //把input的value添加进参数列表
                strategyAry.push(errorMsg) //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
                return strategies[strategy].apply(dom, strategyAry)
            })
        }
    }
    start() {
        for (let validatorFunc of this.cache) {
            let errorMsg = validatorFunc()//开始校验，并取得校验后的返回信息
            if (errorMsg) {//r如果有确切返回值，说明校验没有通过
                return errorMsg
            }
        }
    }
}

