import {
  parseExpression,
} from './expression';
import {
  parseText,
} from './parserText';
import {
  parseOpeningTag,
  parseClosingTag,
} from './tag';
import {
  parseComment,
} from './comment';

export function parse(input) {
  let length = input.length;
  let root = {
    element: 0,
    referenceElement: 1,
    nextElement: 2,
    type: 'Root',

  };
  const stack = [root];
  for (let i = 0; i < length;) {
    const char = input[i];
    if (char == '<') {
      if (input[i + 1] === '!' &&
                input[i + 2] === '-' &&
                input[i + 3] == '-'
      ) {
        i = parseComment(i + 4, input, length);
      } else if (input[i + 1] === '/') {
        i = parseClosingTag(i + 2, input, length, stack);
      } else {
        i = parseOpeningTag(i + 1, input, length, stack);
      }
    } else if (char == '{') {
      i = parseExpression(i + 1, input, length, stack);
    } else {
      i = parseText(i, input, length, stack);
    }
  } {
    return root;
  }
}
