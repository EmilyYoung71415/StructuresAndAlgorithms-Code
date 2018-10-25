/*****
 * verify1、策略模式：
 *      一个 策略对象  val:function 的映射
 *      一个开放接口 add(node.value,[{val,errmsg}]) // 一个字段对应多个策略
 *      一个执行 start 
 *     
 *      基本思路是：通过　开放接口　注入的字段和　对应的策略与　策略对象绑定
 *              　　返回　校验函数
 *      start开始校验的时候 一一执行校验函数 校验值是否合法
 * 
 * 
 * verify2、修改了开发接口的方式---直接在html元素上定义校验绑定data-verify
 *          同时开放了 自定义校验模式 运行用户自定义函数 并通过类传递
 * 
 * 
 * verify3、一些优秀的现代开发框架的思想
 *      1、react-form 演讲
 *      2、使用React和HTML5表单验证API处理表单元素 拥抱原生
 *          原文：
 *          http://dsheiko.com/weblog/handling-forms-with-react-and-html5-form-validation-api
 * 
 * verify4: 直接元素拦截？proxy
 * 
 */