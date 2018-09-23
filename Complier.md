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
