import {
    parseTemplate
} from "./template";

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
                const dynamic = parseTemplate(value);
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