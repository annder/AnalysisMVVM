# 分析MVVM框架

Fork for [moon](https://github.com/kbrsh/moon)


1. 处理文本的话，使用`replace`处理那些符号。

例如：`|`、`<`、`{`....

最后返回一个索引，保证在其中。

例如函数：

Notes:

> Creating a Tree node should needs array.
> stack ---> 
>       type ---> 
>              attribute --->
>              \ key
>              \ value
>              \ expression
>              \ dynamic


```js
    export const parseText = (index,input,length,stack) => {
        if (...) {
            stack[stack.length - 1].chidren.push({
                type:"Text",
                attribute:[{
                    key:"",
                    //Strip content symbols.
                    value:content.replace(eascapRE,(match) => easpaMap[math]),
                    expression:false,
                    dynamic:false
                }],
                children:[]
            })
        }
        return index;
    }
```

这个作者非常鸡贼地在下面添加了`children`这个选项，于是每次处理物料的时候，就传入到里面去。

解析Attribute是这样解析的：

```js
    while( index < length) {
        // First 
        char = input[index];
        if (char == "\\" || char == ">") {
            break;
        };
        // Pause cycle, and index value automatic add 1. 
        if (char == "=") {
            index += 1;
        // And why it is break this fragment code black, but why utilize continue keyword to skip   tokens?
            break;
        }
        else {
            // Store char and ....?
            key += char;
            index += 1;
        }
    }
```

<!-- Let us reproduce it again -->

作者写了三种解析`Tag`的方式，分别是：

1. 解析属性
2. 解析开合标签
3. 解析闭合标签

其中解析属性的是按照是否有`<`、`\`、`{`、`=`这三样标签来解析的。

然后判断是否为表达式，也就是说通过`Tempalte`的解析的判断有`$`符号。

然后将属性全部`push`到`stack`里面去，代码为：

```js
    if (expression) {
        let dynamic = parseTemplate(value);
        // !important
        value = template.expression;
        dynamic = template.dynamic;
    }
    attributes.push({
        key:key,
        value:value,
        expression:expression,
        dynamic:dynamic
    })
```

还有就是开合标签和闭合标签的解析是一毛一样，但是吧，开和标签处要判断是否为`component`。

也就是说开头要判断是否为`component`，代码如下：

```js
    const isComponent = (type) => {
        if (type[0].toUppcase() != type[1].toLowwerCase()) {
            return true;
        }
        return false;
    }
```

如果是`Component`的话，就是将它解析一次，然后在推到`stack.children`中就行了。


闭标签的话，有一个判断。指的是如果解析的值没有和最后一个闭合标签的话，就是出错。

举一个例子：

```js
    // template <p> </p
    /* 
        stack.type = "span"
        type == "p";
        
    */
   throw new Error("value");
```
 

> !import

如何解析`Node`在文档树中呢，代码如下：

1. 找到子节点.
2. 循环找出相应的节点，技术用法是`siblings.indexOf(element)`

```js
    const siblings = parent.children;
    for(let i = siblings.indexOf(element); i < siblings.length; i++) {
        \\
    }
 ```

而`generator`则是简单粗暴的将`expression`代码类似：

If、Else、For之类的全部解析。

代码框架是：

```js
export const generateAll = (element,parent,root) {
    switch (element.type) {
    case 'If':{
        // Handle state, handle reference,
        // Handel conditions
        // Handle conditionsCode
        // Handle PortionsCode 
        
        // Separator
        // Do a big loop to handle that.
        for (let i = siblings.indexOf(element);
        i < sibling.length;
        i++
        ) {
                // Something
        }
        }
    }
}
```