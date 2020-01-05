const matchRecursive = require('./matchRecursive');
const assertions = require('./assertions');

const assertMatch = 'assert\\.(?!async)[\\s\\S]+?;';
const assertSubMatch = '\\(|\\)|\\[|\\]|\{|\}|,';

const openMatch = '\\(|\\[|\{';
const closeMatch = '\\)|\\]|\}';
const commaMatch = ',';

const splitAssertion = (subElements) => {
  let depth = 0;
  let currentArgument = '';
  const args = subElements.reduce((acc, element, index) => {
    if ([0, 1, subElements.length - 2, subElements.length - 1].includes(index)) return acc;
    if (element.match(new RegExp(commaMatch)) && depth === 0) {
      acc.push(currentArgument.trim());
      currentArgument = '';
      return acc;
    }
    currentArgument += element;
    if (index === subElements.length - 3) {
      acc.push(currentArgument.trim());
      currentArgument = '';
      return acc;
    } else if (element.match(new RegExp(openMatch))) {
      depth++;
    } else if (element.match(new RegExp(closeMatch))) {
      depth--;
    }
    return acc;
  }, []);

  const start = `${subElements[0]}${subElements[1]}`;
  const end = `${subElements[subElements.length - 2]}${subElements[subElements.length - 1]}`;
  return { start, args, end };
};

const convertAll = (fileContent) => {
  const assertRegex = new RegExp(assertMatch);
  const assertSubRegex = new RegExp(assertSubMatch);

  const elements = matchRecursive(fileContent, assertRegex);
  return elements.map((element) => {
    if (new RegExp(assertRegex).test(element)) {
      const subElements = matchRecursive(element, assertSubRegex);
      const { start, args, end } = splitAssertion(subElements);
      const assertion = assertions.find(([key]) => start.includes(key));
      if (!assertion) {
        console.error('ERROR: Unsupported assertion', start);
        return element;
      }
      return assertion[1](args);
    }
    return element;
  });
};

module.exports = convertAll;
