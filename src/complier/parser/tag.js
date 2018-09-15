import {
    parseTemplate
} from "./template";
import {
    isComponentType
} from "./../util";

const whitespaceRE = /^\s+$/;
const valueEndRE = /[\s/>]/;

/* 
    For instance: <component value="1"></component>
*/

export const parseAttributes = (index, input, length, attributes) => {
    while (index < length) {
        let char = input[index];
        if (char == "/" || char == ">") {
            break;
            //If state is whitespace, then jump over 
            /* 
            But, The motherfucker in the life that is but!
            First step, You should filter whitespace in the template.   
            */
        } else if (whitespaceRE.test(char)) {
            index += 1;
            continue;
        } else {
            let key = "";
            let value;
            let expression = false;
            while (index < length) {
                char = input[index];
                if (char === "/" || char === ">" || whitespaceRE.test(char)) {
                    // Judge whether terminal symbol. 
                    value = "";
                    break;
                    /*
                     <p class="value">Hello</p>
                    */
                } else if (char === "=") {
                    index += 1;
                    break;
                } else {
                    key += char;
                    index += 1;
                }
            }
            /* 
                For instance is: <p class="{$value}">{$post}</p>
            */
            if (value == undefined) {
                let quote;
                value = "";
                char = input[index];
                if (char == "\"" || char == "'") {
                    quote = char;
                    index += 1;
                } else if (char === "{") {
                    // Tell me why assignment quote is } ?
                    quote = "}";
                    expression = true;
                    index += 1;
                } else {
                    quote = valueEndRE;
                }
                while (index < length) {
                    char = input[index];
                    if ((typeof quote === "object" && quote.test(char)) || char === quote) {
                        // and why should jude quote is object?
                        index += 1;
                        break;
                    } else {
                        value += char;
                        index += 1;
                    }
                }
            }
            let dynamic = false;
            if (expression) {
                let dynamic = parseTemplate(value);
                value = template.expression;
                dynamic = template.dynamic;
            }
            attributes.push({
                key: key,
                value: value,
                expression: expression,
                dynamic: dynamic
            })
        }
    }
    return index;
}

export const parseOpeningTag = (index, input, length, stack) => {
    let element = {
        type: "",
        attributes: [],
        children: []
    };
    while (index < length) {
        const char = input[index];
        if (char === "/" || char === ">") {
            const attributes = element.attributes;
            const latestIndex = stack.length - 1;
            if (char === "/") {
                index += 1;
            } else {
                stack.push(element);
            }
            for (let i = 0; i < attributes.length;) {
                const attribute = attributes[i];
                /* Self-ref */
                if (isComponentType(attribute.key)) {
                    element = {
                        type: attribute.key,
                        attributes: [{
                            key: "",
                            value: attribute.value,
                            expression: attribute.expression,
                            dynamic: attribute.dynamic
                        }],
                        children: [element]
                    };
                    attribute.splite(i, 1)
                } else {
                    i += 1;
                }
            }
            // Push component into children stack. 
            stack[latestIndex].children.push(element);
            index += 1;
            break;
        } else if ((whitespaceRE.test(char) && (index += 1)) || char == "=") {
            index = parseAttributes(index, input, length, element.attributes);
        } else {
            element.type += char;
            index += 1;
        }
    }
}
//
export const parseClosingTag = (index, input, length, stack) => {

}