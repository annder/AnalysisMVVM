// const escapRE  = /(?:(?:&(?:amp|gt|lt|nbsp|qout;)|"|\\|\n)/g;
const whitespaceRE = /^\s+$/;
const eacapMap = {
    "&amp;": "&",
    "&gt;": ">",
    "&lt;": "<",
    "&nbsp;": ' ',
    "&quot;": "\\\"",
    "\\": "\\\\",
    '"': "\\\"",
    "\n": "\\n"
}

export const parseText = (index, input, length, stack) => {
    let content = "";
    for (; index < length; index++) {
        const char = input[index];
        if (char === "<" || char === "{") {
            break;
        }
        else {
            content += char;
        }
    }
    if (!whitespaceRE.test(content)) {
        stack[stack.length - 1].children.push({
            type:"Text",
            attributes:[{
                key:"",
                value:content.replace(escapeRE)
            }]
        })
    }
}