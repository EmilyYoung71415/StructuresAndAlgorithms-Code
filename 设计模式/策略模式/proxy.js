/**
 * 属性拦截实现校验
 * 还是一个策略映射,validators
 * 然后const vali = validator({}, validators, errorMsg)
 *          然后给vali.name = node.value 触发 拦截器
 *          获取 dom的value 在set里面混合 validators实现校验
 * 技巧：
 *   let validatorNext = function*() {
        yield vali.name = registerForm.userName.value
        yield vali.passwd = registerForm.passWord.value
        yield vali.moblie = registerForm.phoneNumber.value
        yield vali.email = registerForm.emailAddress.value
    }
    let validator = validatorNext()
    validator.next();
    !vali.name || validator.next(); //上一步的校验通过才执行下一步

    用g函数包装实现一个一个校验
 */