const matchRecursive = require('./matchRecursive');

const thenRegex = /\.then\s*\(/;
const thenOwnLineRegex = /\s\.then\s*\(/;
const endOfBlockRegex = /}\s*\)/

let returnsNeededAt = [];
const convert = (element, index, arr) => {
  const foundThen = element.match(new RegExp(thenRegex));
  if (foundThen) {
    const isOnOwnLine = element.match(new RegExp(thenOwnLineRegex));
    if (!isOnOwnLine) {
      return element.replace(new RegExp(/(\s*)(\S.+)/), '$1return $2');
    }
    // Only at beginning of promise chain
    if (!arr[index - 2].match(new RegExp(endOfBlockRegex))) {
      returnsNeededAt.push(index - 2);
    }
  }
  return element;
};

const convertAll = (fileContent) => {
  returnsNeededAt = [];
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
