import {
  expect,
} from 'chai';
import {
  parseAttributes,
} from './../src/complier/parser/tag';

describe('Test parse Tag', function() {
  it('should stripping attribute value?', function() {
    const template = `<p class="Hello"></p>`;
    const result = parseAttributes(template);
    expect(result).to.equal('Hello');
  });
});
