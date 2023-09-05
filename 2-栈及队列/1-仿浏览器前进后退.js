/****
 * 浏览器有前进后退功能
 * 设计
 *  两个栈:history: 将不断产生的新页面浏览记录依次放入此栈
 *         前进head: 存放最近访问过的浏览记录
 *  即 当访问页面生成浏览记录的时候：依次将浏览记录放入栈中
 *     当点击后退，会从history栈里依次弹出浏览页面，
 *                弹出的元素又依次进入head栈
 *      点击前进：从head栈取出数据
 */
const { Stack } = require('../index');
class SampleBrowser {
  constructor() {
    this.history = new Stack(); // 存放正常浏览页面的栈
    this.head = new Stack(); // 存放后退操作弹出来的记录
  }
  // 正常浏览页面
  pushNormal(json) {
    this.history.push(json);
    this.head.clear(); // 清空
    this.printDetail();
  }
  back() {
    if (!this.history.length) {
      console.log('无法后退');
      return;
    }
    this.head.push(this.history.pop());
    this.printDetail();
  }
  front() {
    if (!this.head.length) {
      console.log('无法前进');
      return;
    }
    this.printDetail();
  }
  printDetail() {
    console.log('----后退页面-----');
    this.head.printf();
    console.log('----浏览页面-----');
    this.history.printf();
  }
}

const browser = new SampleBrowser();
browser.pushNormal('www.google.com');
browser.pushNormal('www.baidu.com');
browser.pushNormal('www.github.com');
browser.back();
browser.back();
// browser.front()
// browser.pushNormal('www.new.com')
