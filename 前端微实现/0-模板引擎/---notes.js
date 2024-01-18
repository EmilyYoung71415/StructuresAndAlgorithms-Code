/**
 * 模板引擎：
 *      设计目的：传入数据，根据数据可以渲染出dom节点；
 *      开始：
 *         1、设计出理想的模板语言，如<% 等 划分 变量与html结构
 *              设计者与使用之间遵守的约定   
 *         2、依照约定，设计者通过约定体现的使用者意图，还原html结构
 *         3、难点： 怎么还原？
 *              将一群乱码还原为html结构然后父级.innerHtml = html
 *              怎么还原？
 *                  乱码里的语法、html结构、变量
 *                  <%  for(var i =0)
 *                  <% <li><a></a></li>
 *                  <%=use[i].name 
 *           <%for ( var i = 0; i < users.length; i++ ) { %>
                <li>
                    <a href="<%=users[i].url%>">
                        <%=users[i].name%>
                    </a>
                </li>
            <% } %>   


            var p = [];
            for (var i = 0; i < users.length; i++) {
                p.push('<li><a href="');
                p.push(users[i].url);
                p.push('">');
                p.push(users[i].name);
                p.push('</a></li>');
            }

            push(user[i].name)这个时就是变量转为常量了
            不过感觉es6已经可以这样了

            基本思路就是：
                将用户输入的约定模板（字符串）,将多余的标记符号；
                划分js语言与变量。
                变量翻译为 p.push(user[i].name);
                将翻译好的字符串（js）转换为可执行的js语言


    当然如果使用es6语法那不能再简单了
      const msg = `<ul>
            ${users.map((item,index)=>{
                return `<li><a href=${item.url}>${item.name}</a></li>`
            }).join("")}
        </ul>`
        results.innerHTML =  msg;
    
    方法1 使用eval解析字符串为可执行的js语言。，
    同样地思路：
            我们还可以使用方法2，Function函数
            new Function ([arg1[, arg2[, ...argN]],] functionBody)
            返回值为 functionbody 里定义的返回。
            好处是： functionbody 也可以字符串传入
    第二版：new Function()代替eval实现字符串指向js代码
        function tmpl(str, data) {
        var str = document.getElementById(str).innerHTML;

        var fn = new Function("obj",

        "var p = []; p.push('" +

        str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g,"p.push('")
        + "');return p.join('');");

        return fn(data);
    };
    with语句 扩充语句作用域链条，传入的参数，with(obj){}访问obj,;而不是obj.name而不是obj

    上述方法的实现核心是：数组push + join("")
    underscore是字符串拼接
        

*/