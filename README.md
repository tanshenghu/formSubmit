## `formSubmit` By TanShenghu

<br>

**formSubmit组件只模拟html中select标签的组件，功能除了常用的选择以外，还可以通过参数控制，显示是可勾选(checkbox)下拉框**


[demo](http://www.tanshenghu.com/widget/formSubmit/examples/formSubmit.html)

```javascript
seajs.use(['formSubmit'], function(FormSubmit) {
    
    FormSubmit({
        param: {name:"张三", sex:"男", tel:"13512345678"}, // 支持两种参数格式，第一种如前面的json对象格式，第二种数组形式[{name:"name",value:"张三"},{name:"sex",value:"男"},{key:"tel",value:"13512345678"}]
        action: '/submit.json', // 注意：当传参时，action为必选项
        method: 'get', //get or post
        form: '#myform', // form表单节点
        enctype: false,
        callback: function(ifm, data){
            // this 指向 form
        }
    });
    
})
```

### 完     The End