let expressRE =
/"[^"]*"|'[^']*|\d+[a-zA-Z$_]\w*|\.[a-zA-Z$_]\w*|[a-zA-Z]\w:*|([a-zA-Z$_]\w*)/g;
/*
    [""]
    ['']
    number[variable]
    [variable]
    [variable.attribute]
    [variable:attribute]
*/
let globals = ['NaN',
  'false', 'in', 'null',
  'this', 'true', 'typeof', 'undefined',
];

export const parseTemplate = (expression) => {
  let dynamic = false;

  /*
        For instance:
            {$todo.value}
    */
  expression = expression.replace(expressRE, (match, name) => {
    if (name === undefined || globals.indexOf(name) != -1) {
      return match;
    } else {
      dynamic = true;
      if (name[0] == '$') {
        return `locals.${name}`;
      } else {
        // eval(parseTemplate)?
        return `instance.${name}`;
      }
    }
  });
  return {
    expression: expression,
    dynamic: dynamic,
  };
};
