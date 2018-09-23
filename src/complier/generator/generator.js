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
      const ifConditionsCode = '[';
      const ifPortionsCode = '[';
      let separator = '';
      // Deal with tree begin!
      const siblings = parent.children;
      for (let i = siblings.indexOf(element); i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling.type == 'If' ||
            sibling.type === 'ElseIf' ||
            sibling.type === 'Else') {
          ifConditionsCode += separator +
              (sibling.type === 'Else' ? 'true' :
                documentOperate.attributeValue(sibling.attributes[0]));
          ifPortionsCode += separator +
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
              documentOperate.directiveIf(ifState,
                  ifConditions,
                  parent.element)),
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
        documentOperate.setElement(forReference,
            documentOperate.createComment) +
          generateMount(forReference, parent.element, reference) +
          documentOperate.setElement(forPortion, `function (locals){
          ${generate({
    element: root.nextElement,
    nextElement: root.nextElement+1,
    type: 'Root',
    attributes: [],
    children: element.children,
  }, forReference)}  
        };`) +
          documentOperate.setElement(forPortions, '[];') +
          documentOperate.setElement(forLocals, '[];'),
        documentOperate.directiveFor(
            forIdentifier,
            forLocals,
            forValue,
            forPortion,
            parent.element),
        documentOperate.directiveFor(
            forIdentifiers,
            forLocals,
            '[]',
            forPortion,
            forPortions,
            parent.element),
      ];
    }
    case 'Text':
    {
      const textAttribute = element.attributes[0];
      const textElement = root.nextElement;
      const textCode = documentOperate.setTextContent(textElement,
          documentOperate.attributeValue(textAttribute));
      let createCode = documentOperate.setElement(
          textElement,
          documentOperate.createTextNode('\'\''));
      let updateCode = '';
      if (textAttribute.dynamic) {
        updateCode += textCode;
      } else {
        createCode += textCode;
      }
      return [
        createCode + generateMount(textElement, parent.element, reference),
        updateCode,
        documentOperate.removeChild(textElement, parent.element),
      ];
    }
    default:
    {
      const attributes = element.attributes;
      const children = element.children;
      if (isComponentType(element.type)) {
        element.component = root.nextElement++;
        let createCode = documentOperate.setElement(element.component,
            `new m.c.${element.type}()`);
        let updateCode = '';
        let dynamic = false;
        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          if (attribute.key[0] === '@') {
            createCode += `${documentOperate.getElement(element.component)}
            .on("${attribute.key.substring(1)}",function ($event) {
              locals.$event=$event;
              ${documentOperate.attributeValue(attribute)};
            })`;
          } else {
            const attributeCode = `
            ${documentOperate.getElement(element.component)}
            .${attribute.key} =
            ${attributeValue(attribute)}`;
            if (attribute.dynamic) {
              dynamic = true;
              updateCode += attributeCode;
            } else {
              createCode += attributeCode;
            }
          }
        }
        createCode += `${documentOperate.getElement(element.component)}
        .create(${documentOperate.getElement(parent.element)})`;
        if (dynamic) {
          updateCode +=
              `${documentOperate.getElement(element.component)}.update();`;
        } else {
          createCode +=
              `${documentOperate.getElement(element.component)}.update();`;
        }
        return [
          createCode,
          updateCode,
          `${documentOperate.getElement(element.component)}.destroy()`,
        ];
      } else {
        element.element = root.nextElement++;
        let createCode = documentOperate.setElement(element.element,
            documentOperate.createElement(element.type));
        let updateCode = '';
        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          let attributeCode;
          if (attribute.key[0] == '@') {
            let eventType;
            let eventHandler;
            if (attribute.key === '@bind') {
              const bindVariable = attributeValue(attribute);
              attributeCode = `${documentOperate.getElement(element.element)}
              .value=${bindVariable};`;
              eventType = 'input';
              eventHandler = `${bindVariable}=$event.target.value;
              instance.update();`;
            } else {
              attributeCode = '';
              eventType = attribute.key.substring(1);
              eventHandler = `locals.$event=$event;
              ${attributeValue(attribute)};`;
            }
            createCode +=
                documentOperate.addEventListener(element.element, eventType,
                    `function($event){${eventHandler}}`);
          } else {
            attribute =
                documentOperate.setAttributeValue(element.element, attribute);
          }
          if (attribute.dynamic) {
            updateCode += attributeCode;
          } else {
            createCode += attributeCode;
          }
        }
        for (let i = 0; i < children.length; i++) {
          const childCode = generateAll(children[i], element, root, null);
          createCode += childCode[0];
          updateCode += childCode[1];
        }
        return [createCode +
            generateMount(element.element, parent.element, reference),
        updateCode,
        documentOperate.removeChild(element.element, parent.element),
        ];
      }
    }
  }
};


// Should create producers function to handle can't parse complex expression.

export const generate = (root, reference) => {
  const children = root.children;
  let create = '';
  let update = '';
  let destroy = '';
  for (let i = 0; i < children.length; i++) {
    const generated = generateAll(children[i], root, reference);
    create += generated[0];
    update += generated[1];
    destroy += generated[s2];
  }
  let prelude = `var ${documentOperate.getElement(root, element)}`;
  for (let i = root.element + 1; i < root.nextElement; i++) {
    prelude += `,${documentOperate.getElement(i)}`;
  }
  return `${prelude};return [function (_0){
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
