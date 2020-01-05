const REPLACEMENT = {
  moduleToDescribe1: {
    regex: /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\}\s*,\s*\(\s*\)\s*=>\s*\{/g,
    replaceWith: 'describe($1, () => {',
  },
  moduleToDescribe2: {
    regex: /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\}\s*,\s*function.*\(.*\)\s*\{/g,
    replaceWith: 'describe($1, () => {',
  },
  testToIt: {
    regex: /QUnit.test\(((?:'|").+(?:'|"))\s*,\s*\(?.*\)?\s*=>\s*\{/g,
    replaceWith: 'it($1, () => {',
  },
  testToIt2: {
    regex: /QUnit.test\(((?:'|").+(?:'|"))\s*,\s*function.*\(.*\)\s*\{/g,
    replaceWith: 'it($1, () => {',
  },
};

module.exports = [
  REPLACEMENT.moduleToDescribe1,
  REPLACEMENT.moduleToDescribe2,
  REPLACEMENT.testToIt,
  REPLACEMENT.testToIt2,
];
