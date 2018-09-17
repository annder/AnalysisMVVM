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
      const isState = root.nextElement++;
      const isReference = root.nextElement++;
      const isConditions = root.nextElement++;
      const isPortions = root.nextElement++;
      let isConditionsCode = '[';
      let isPortionsCode = '[';
      let separator = '';
      // Deal with tree begin!
      const siblings = parent.children;
      for (let i = siblings.indexOf(element); i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling.type == 'If' || sibling.type === 'ElseIf' || sibling.type === 'Else') {

        }
      }
    }
  }
};
