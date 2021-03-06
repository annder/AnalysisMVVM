export const mapReducer = (array, func) => {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += func(array[i]);
  }
  return result;
};

export const getElement = (element) => `m${element}`;
export const setElement = (element, code) => `${getElement(element)}=${code}`;
export const createElement = (type) => `m.ce${type}`;
export const createTextNode = (content) => `m.ctn(${content})`;
export const createComment = (_) => `m.cc()`;
export const attributeValue = (attribute) => attribute.expression ?
  attribute.value :
  `${attribute.value}`;
export const setAttributeValue = (element, attribute) =>
  `m.sa(${getElement(element)},
  "${attribute.key}",
  ${attributeValue(attribute)})`;
export const addEventListener = (element, type, func) =>
  `m.ael(${getElement(element)},"${type}",${handler})`;
export const setTextContent = (element, content) =>
  `m.stc(${getElement(element)},${content})`;
export const appendChild = (element, parent) =>
  `m.ac(${getElement(element)},${getElement(element)})`;
export const removeChild = (element, parent) =>
  `m.rc(${getElement(element)},${getElement(parent)});`;
export const insertBefore = (element, reference, parent) =>
  `m.ib(${getElement(element)},
  ${getElement(reference)},
  ${getElement(parent)});`;
export const directiveIf = (ifState, ifConditions, ifPortions, ifParent) =>
  `m.di(${getElement(ifState)},
    ${getElement(ifConditions)},
    ${getElement(ifPortions)},
    ${getElement(ifParent)});`;
export const directiveFor = (forIdentifiers, forLocals,
    forValue, forPortion,
    forPortions, forParent) => `m.df(${forIdentifiers},
    ${getElement(forLocals)},
    ${forValue},
    ${getElement(forPortion)},
    ${getElement(forPortions)},
    ${getElement(forParent)});`;
