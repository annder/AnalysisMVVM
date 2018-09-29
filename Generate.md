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

---

Generate For directive:

Well, we just parse Directive function that can helps comprehension Moon.

```js
const directiveFor = (forIdentifiers, forLocals, forValue, forPortion, forPortions, forParent) => {
	const previousLength = forPortions.length;
	const nextLength = forValue.length;
	const maxLength = previousLength > nextLength ? previousLength : nextLength;

	const keyIdentifier = forIdentifiers[1];
	const valueIdentifier = forIdentifiers[0];

	for (let i = 0; i < maxLength; i++) {
		if (i >= previousLength) {
			const forLocal = {};
			forLocal[keyIdentifier] = i;
			forLocal[valueIdentifier] = forValue[i];
			forLocals[i] = forLocal;

			const newForPortion = forPortion(forLocal);
			forPortions.push(newForPortion);

			newForPortion[0](forParent);
			newForPortion[1]();
		} else if (i >= nextLength) {
			forPortions.pop()[2]();
		} else {
			const forLocal = forLocals[i];
			forLocal[keyIdentifier] = i;
			forLocal[valueIdentifier] = forValue[i];

			forPortions[i][1]();
		}
	}
};
```

Observer that the function called 7 parameters, that is store array that calling parameters arrays in several new arrays. 

And every arrays that stored calling parameter, will be render arrays that stored function reserver calling that.

Well, stored function divide into 3 steps.

1. Compassing with their calling in parameter that whether shallow equals.
2. If else, rendering create truly DOM.
3. If truly DOM presented the views, performance empty function.
4. Or changed the DOM strut, and you will re-render function, or remove children's. 