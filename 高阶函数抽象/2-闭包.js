function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数,一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
/***
 *  以上基于词法作用域
 * 
 *  这个词法作用域的例子介绍了引擎是如何解析函数嵌套中的变量的。
 *  词法作用域中使用的域，是变量在代码中声明的位置所决定的。
 *  嵌套的函数可以访问在其外部声明的变量。
 * 
 *   即沿着作用域往上查询
 */





function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();


/***
 *  这段代码的特殊之处？
 *  为什么输出效果和1一致？这种效果是正常的吗
 *  按照正常逻辑思考应该是怎样，既然不是正常输出，那么什么机制使得他出现这种行为。
 *  这种背后的机制即是闭包，即闭包的力量
 * 
 *  先来看正常逻辑是：
 *      makeFunc在执行完之后，name应该变得不可访问。
 *      因为按理说，函数的局部变量仅仅在函数的执行期间可用
 *  但事实上，返回的函数在macfunc执行完之后被调用执行时，仍能访问name变量，
 *      即name在makefunc执行完之后居然没被销毁？
 * 
 *  所以背后的机制？
 *      JavaScript中的函数会形成闭包。 
 *      闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量
 * 
 * 
 *      myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用，
 *      而 displayName 实例仍可访问其词法作用域中的变量
 * 
 *      即再次调用myFunc时，此引用仍能获得当时环境的词法作用域，
 *        即闭包 = 函数与声明该函数的词法环境的组合
 */



 // 再来看一个依赖闭包可保存(包住)当时的词法环境这一特性，我们实现一个高阶函数
 function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var add5 = makeAdder(5);// 词法环境中，x为5
  var add10 = makeAdder(10);// 词法环境中, x为10
  // add5 add10 都是闭包，共享函数定义  所以这样的高阶函数的作用？
  // 类似递归函数里，不同参数共享相同逻辑的思想
  // 高阶的目的在于，高阶出来一个可以入口，提供传不同参数


  // 话说回来，闭包不也和递归一样的么，压入执行栈
  
  console.log(add5(2));  // 7
  console.log(add10(2)); // 12

