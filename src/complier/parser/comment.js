export function parseComment(index, input, length) {
    while (index < length) {
        const char0 = input[index];
        const char1 = input[index + 1];
        const char2 = input[index + 2];
        if (char0 === "<" && char1 === "!" && char2 === "-" && input[index + 3] === "-") {
            // <!--- for instance
            index = parseComment(index + 4, input, length);
        } else if (char0 === "-" && char1 === "-" && char2 === ">") {
            // for instance --->
            index += 3;
            break;
        } else {
            index += 1;
        }
    }
    return index;
}