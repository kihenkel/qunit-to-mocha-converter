const matchRecursive = require('./matchRecursive');

const thenRegex = /\.then\s*\(/;
const thenOwnLineRegex = /\s\.then\s*\(/;

const returnsNeededAt = [];
const convert = (element, index) => {
  const foundThen = element.match(new RegExp(thenRegex));
  if (foundThen) {
    const isOnOwnLine = element.match(new RegExp(thenOwnLineRegex));
    if (!isOnOwnLine) {
      return element.replace(new RegExp(/(\s*)(\S.+)/), '$1return $2');
    }
    returnsNeededAt.push(index - 2);
  }
  return element;
};

const convertAll = (fileContent) => {
  const elements = matchRecursive(fileContent, /\n/);
  const results = elements.map(convert);
  returnsNeededAt.forEach(returnNeededAt => {
    const isOnOwnLine = results[returnNeededAt].match(new RegExp(thenOwnLineRegex));
    if (!isOnOwnLine) {
      results[returnNeededAt] = results[returnNeededAt].replace(new RegExp(/(\s*)(\S.+)/), '$1return $2');
    }
  });
  return results;
};

module.exports = convertAll;
