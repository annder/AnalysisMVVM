For Vue.js, You can utilize Vue prototype model to render a anonymous function.

For example:

```js
let Template =  Vue.complier(`<div>Hello</div>`);
console.log(toString(Template.render));
```

The conclude is:


> `function anonymous(
) {
with(this){return _c('div',[_v("Hello")])}
}`

This fragments created a anonymous function, for render a new fake template (just like virtual DOM).

And you may be have question on this fragments code blank, why in the fragment has for instance code:


```js
 with(this) {
     ///
 }
```


The codes was usage `Javascript` native model render a executable code. 

Exempla:`data.for`, You should detach it like `for` statement.

So, utilize `with` keyword eliminate superfluous object.

Back head to watch `Moonjs` that use parse and generate method to render abstract syntax tree.

```html
<p>Hello</p>
```

Transforms to  AST is:

ps: Further speaking, create a AST not use keywords verification it what whether correct, if you do that, such as foolish projecter. 

```js
{
    "element":0,
    "referenceElement":1,
    "nextElement":2,
    "type":"Root",
    "attributes":[],
    "children":[] 
}
```

That is fundamental AST, No more that one than conciseness. it is six keys put in object, but those six keys are represent every node conditions.

For attributes keyword is represent collects every HTML element attribute, and it storages by array.

The children keyword just store next parsed template by array.

First AST not simple parse HTML Element, it a command whole Element output.

But!

The life is best wonderful word is but.

If you writing a HTML Element in string of template, then their will additions peculiar element node tree. For instance:

```json
{
    "type": "div",
    "attributes": [],
    "children": [{
        "type": "Text",
        "attributes": [{
            "key":"",
            "value":"Hello\\n  ",
            "expression":false,
            "dynamic":false,
            "children":[]
        }]
    }]
}
```

Utilize express will additions abstract syntax tree complexity, and aggravating analytic strength.

For instance:
