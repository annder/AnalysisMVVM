# 分析MVVM框架

Fork for [moon](https://github.com/kbrsh/moon)


1. 处理文本的话，使用`replace`处理那些符号。

例如：`|`、`<`、`{`....

最后返回一个索引，保证在其中。

例如函数：

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
    }
```

这个作者非常鸡贼地在下面添加了`children`这个选项，于是每次处理物料的时候，就传入到里面去。