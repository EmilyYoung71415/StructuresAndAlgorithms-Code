// 复杂版深克隆：基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。
const isObject = (target: unknown) => {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
};

export function deepClone<T extends object>(target: T, map = new WeakMap<T, boolean>()): T {
  if (map.get(target)) return target;
  // 获取当前值的构造函数：获取它的类型
  // let constructor = target.constructor;
  // // 检测当前对象target是否与正则、日期格式对象匹配
  // if (/^(RegExp|Date)$/i.test(constructor.name)) {
  //   // 创建一个新的特殊对象(正则类/日期类)的实例
  //   return new constructor(target);
  // }
  if (!isObject(target)) return target;

  map.set(target, true); // 避免clone的循环引用
  const newObj = Array.isArray(target) ? [] : {};

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      // @ts-ignore
      newObj[key] = deepClone(target[key]);
    }
  }

  return newObj as T;
}
