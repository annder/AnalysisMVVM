import {
  parse,
} from './parser/parse';
import {
  generate,
} from './generator/generator';
export const compile = (input) => {
  return generate(parse(input), null);
};
