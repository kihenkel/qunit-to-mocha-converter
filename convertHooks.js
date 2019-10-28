const matchRecursive = require('./matchRecursive');

const matchRegex = /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\n/;
const replaceRegex = /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{/;
const replaceCloseRegex = /(?:\n\s*(}\s*,\s*\(\s*\)\s*=>\s*{))/;

const matchOpen = /{/;
const matchClose = /},?/;

let depth = -1;
const convert = (element, index) => {
  if (depth >= 0) {
    let match = element.match(replaceCloseRegex);
    if (match) {
      depth--;
      return element.replace(replaceCloseRegex, '');
    }
    match = element.match(new RegExp(matchOpen));
    if (!match) {
      match = element.match(new RegExp(matchClose));
      if (!match) {
        return element;
      }
      depth--;
      return element;
    }
    depth++;
    return element;
  }

  const match = element.match(new RegExp(matchRegex));
  if (!match) {
    return element;
  }
  depth = 0;
  return element.replace(replaceRegex, 'describe($1, () => {');
};

const convertAll = (fileContent) => {
  const elements = matchRecursive(fileContent, /(QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\n)|{|(?:\n\s*}\s*,\s*\(\s*\)\s*=>\s*{)|},?/);
  return elements.map(convert);
};

module.exports = convertAll;
