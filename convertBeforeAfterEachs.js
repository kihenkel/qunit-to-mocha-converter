const matchRecursive = require('./matchRecursive');

const matchRegex = /(?:(?:before|after).*\s*\(\s*\)\s*\{)/;
const replaceRegex = /((?:before|after)[^\s]*)\s*\(\s*\)\s*\{/;

const matchOpen = /{/;
const matchClose = /},?/;

let depth = -1;
const convert = (element) => {
  if (depth >= 0) {
    let match = element.match(new RegExp(matchOpen));
    if (!match) {
      match = element.match(new RegExp(matchClose));
      if (!match) {
        return element;
      }
      depth--;
      return depth === -1 ? '});' : element;
    }
    depth++;
    return element;
  }

  const match = element.match(new RegExp(matchRegex));
  if (!match) {
    return element;
  }
  depth = 0;
  return element.replace(replaceRegex, '$1(() => {');
};

const convertAll = (fileContent) => {
  const elements = matchRecursive(fileContent, /(?:(?:before|after).*\s*\(\s*\)\s*\{)|{|},?/);
  return elements.map(convert);
};

module.exports = convertAll;
