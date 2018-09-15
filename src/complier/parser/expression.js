import {
    parseTemplate
} from "./template";

export const parseExprssion = (index, input, length, stack) => {
    let expression = "";
    for (; index < length; index++) {
        const char = input[index];
        if (char == "}") {
            index += 1;
            break;
        } else {
            expression += char;
        }
    }
    const template = parseExprssion(expression);
    stack[stack.length - 1].children.push({
        type: "Text",
        attributes: [{
            key: "",
            value: template.expression,
            express: true,
            dynamic: template.dynamic
        }],
        children: []
    })
    return index;
}