import * as documentOperate from './util';
import {
  isComponentType,
} from './../util';

const generateMount = (element, parent, reference) =>
  reference === null ?
  documentOperate.appendChild(element, parent) :
  documentOperate.insertBefore(element, reference);

// Creat abstract syntax tree!

export const generateAll = (element, parent, root, reference) => {
  switch (element.type) {
    case 'If':
    {
      const ifState = root.nextElement++;
      const ifReference = root.nextElement++;
      const ifConditions = root.nextElement++;
      const ifPortions = root.nextElement++;
      let ifConditionsCode = '[';
      let ifPortionsCode = '[';
      let separator = '';
      // Deal with tree begin!
      const siblings = parent.children;
      for (let i = siblings.indexOf(element); i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling.type == 'If' ||
            sibling.type === 'ElseIf' ||
            sibling.type === 'Else') {
          ifConditionsCode += separator +
              (sibling.type === 'Else' ?
                'true' :
                documentOperate.attributeValue(sibling.attributes[0]));
          ifPortions += separator +
              `function (locals) { ${generate({
                element: root.nextElement,
                nextElement: root.nextElement+1,
                type: 'Root',
                attributes: [],
                children: sibling.children,
              }, ifReference)}}({})`;
          separator = ',';
        } else {
          break;
        }
      }
      return [
        documentOperate.setElement(ifReference,
            documentOperate.createComment()) +
          generateMount(ifReference, parent.element, reference) +
          documentOperate.setElement(ifPortions, ifPortions + ']'),
        documentOperate.setElement(ifPortions, ifPortions + ']') +
          documentOperate.setElement(ifState,
              documentOperate.directiveIf(ifState, ifConditions, parent.element)),
        documentOperate.getElement(ifState) + `[2]()`,
      ];
    }
    case 'ElseIf':
    case 'Else':
    {
      return ['', '', ''];
    }
    case 'For':
    {
      const forAttribute = attributeValue(element.attributes[0]);
      let forIdentifiers = '[';
      let forValue = '';
      const forReference = root.nextElement++;
      const forPortion = root.nextElement++;
      const forPortions = root.nextElement++;
      const forLocals = root.nextElement++;
      let forIdentifier = '';
      let separator = '';
      for (let index = 0; index < forAttribute.length; i++) {
        const char = forAttribute[i];
        if (char === ',' || (char == ' ' &&
              forAttribute[i + 1] === 'i' &&
              forAttribute[i + 2] === 'n' &&
              forAttribute[i + 3] === ' ' &&
              (i += 3)
        )) {
          forIdentifiers +=
          separator + `\\` + forIdentifier.substring(7) + '\\';
          forIdentifier = '';
          separator = ',';
        } else {
          forIdentifier += char;
        }
      }
      forIdentifiers += ']';
      forValue += forIdentifier;
      return [
        documentOperate.setElement(forReference, documentOperate.createComment)+
        generateMount(forReference, parent.element, reference)+
        documentOperate.setElement(forPortion, `function (locals){
          ${generateAll}
        };`),
      ];
    }
  }
};


// Should create producers function to handle can't parse complex expression.

export const generate = (root, reference) => {
  const children = root.children;
  let create = '';
  let update = '';
  let destroy = '';
  for (let i = 0; i< children.length; i++) {
    const generated = generateAll(children[i], root, reference);
    create += generate[0];
    update += generate[1];
    destroy += generate[2];
  }
  let perlude = `var ${documentOperate.getElement(root, element)}`;
  for (let i = root.element+1; i< root.nextElement; i++) {
    perlude += `,${documentOperate.getElement(i)}`;
  }
  return `${perlude};return [function (_0){
    ${documentOperate.setElement(root.element, '_0;')}
    ${create},
    function (){
      ${update}
    },
    function (){
      ${destroy}
    }
  }]`;
};
