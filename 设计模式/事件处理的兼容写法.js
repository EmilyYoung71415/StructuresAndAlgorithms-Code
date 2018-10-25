/**
 * 绑定事件工具类
 * @param el 绑定事件元素
 * @param eventName 绑定事件类型
 * @param callback 事件触发执行回调
 * @param opts addEventListener useCapture 自定义选项  {true: 捕获阶段触发, false: 冒泡阶段触发}
 */
export function on(el, eventName, callback, opts) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, opts || false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${eventName}`, (e) => {
      callback.call(el, e || window.event);
    });
  }
}
  
/**
 * 解绑事件工具类
 * @param el 解绑事件元素
 * @param eventName 解绑事件类型
 * @param callback 事件触发执行回调
 * @param opts removeEventListener useCapture 自定义选项 {true: 捕获阶段触发, false: 冒泡阶段触发}
 */
export function off(el, eventName, callback, opts) {
  if (el.removeEventListener) {
    el.removeEventListener(eventName, callback, opts || false);
  } else if (el.detachEvent) {
    el.detachEvent(`on${eventName}`, callback);
  }
}  