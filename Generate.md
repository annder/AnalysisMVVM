Evident to say, generate function is whole compiler process that most importance section.

That involving coding string function, generate consist of V8 procedure, and performance state of coding.

```js
{ "element": 0,
    "referenceElement": 1,
    "nextElement": 2,
    "type": "Root",
    "attributes": [],
    "children": [
        { "type": "div",
            "attributes": [],
            "children": [
                {
                    "type": "Text",
                    "attributes": [{
                            "key": "",
                            "value": "locals.$msg",
                            "expression": true,
                            "dynamic": true
                        }],
                    "children": []
                }
            ]
        }
    ]
};
```

And that abstract syntax will split tow parts to link to a function.

For instance, It is performance a new function that create a array then operate DOM.

```js
var m0,m1,m2; 
return [function (_0){
    m0 = _0;
    m2 = document.createElement("div");
    m2.addEventListener("click",function ($event){
    locals.$event = $event;
    instance.update($event);
    });
    m3 = document.createTextNode("");
    m2.appendChild(m3);
    m3.appendChild(m0);
    }];
```

And this method can render a truly HTML DOM.

If their has directive, generate Javascript will be:


```js
 var m0, m1, m2, m3, m4, m5;
return [function (_0) {
    m0 = _0;
    /* 
        So,First one is confirm whatever that is  if statement
        And as to render.
    */
    m3 = m.cc();
    /* createComment */
    /*  This step such as :
     `<div>Hello,<!----></div?`*/
    m.ac(m3, m0);
    /* appendChild */
    m5 = [function (locals) {
        var m6, m7, m8;
        return [function (_0) {
            m6 = _0;
            m7 = m.ce("div");
            /* createElement */
            m8 = m.ctn("");
            m.stc(m8, "\n    Hello\n");
            /* setTextContent */
            m.ac(m8, m7);
            /* appendChild */
            m.ib(m7, m3, m6);
            /* insertBefore */
        }, function () {}, function () {
            /* 
                Queen of removeChildren function.
            */
            m.rc(m7, m6);
        }];
    }({})];
}, function () {
    m4 = [instance.condition];
    /* 
        INSTANCE NAME
    */
    m2 = m.di(
        m2,
        /* Self? */
        m4,
        /* msg */
        m5,
        /*  */
        m0);
    /* 
        Translate directiveIf
    */
}, function () {
    /* 
    Establish 
    Function
     */
    m2[2]();
}];
```

The portion function judgement very simple.

The codes is:

```js
const directiveIf = (ifState, ifConditions, ifPortions, ifParent) => {
	for (let i = 0; i < ifConditions.length; i++) {
		if (ifConditions[i]) {
			const ifPortion = ifPortions[i];
			if (ifState === ifPortion) {
				ifPortion[1]();
			} else {
				if (ifState) {
					ifState[2]();
				}
				ifPortion[0](ifParent);
				ifPortion[1]();
				ifState = ifPortion;
			}
			return ifState;
		}
	}
};

```

So, use a big loop to cope Queue of function.

And first step is judge it is original arguments, if equal, render second function.

if should change state in template, then itself clean self.

else render create a HTML element function.

