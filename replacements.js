const REPLACEMENT = {
  moduleToDescribe1: {
    regex: /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\}\s*,\s*\(\s*\)\s*=>\s*\{/g,
    replaceWith: 'describe($1, () => {',
  },
  moduleToDescribe2: {
    regex: /QUnit\.module\s*\(\s*((?:'|").+(?:'|"))\s*,\s*\{\s*\}\s*,\s*function\s*\(\s*\)\s*\{/g,
    replaceWith: 'describe($1, () => {',
  },
  testToIt: {
    regex: /QUnit.test\(((?:'|").+(?:'|"))\s*,\s*\(.*\)\s*=>\s*\{/g,
    replaceWith: 'it($1, () => {',
  },
  assertOk: {
    regex: /assert.ok\(([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)[\s\S]*?))\s*(?:,\s*(?:'|").+(?:'|"))?\)/g,
    replaceWith: 'expect($1).to.exist'
  },
  assertStrictEqual: {
    regex: /assert.(?:strictEqual|equal)\(([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)))\s*,\s*([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)))(?:,\s*(?:'|").+(?:'|"))?\)/g,
    replaceWith: 'expect($1).to.equal($2)'
  },
  assertDeepEqual: {
    regex: /assert.deepEqual\(([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)))\s*,\s*([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)))(?:,\s*(?:'|").+(?:'|"))?\)/g,
    replaceWith: 'expect($1).to.deep.equal($2)'
  },
  assertRejects: {
    regex: /assert.rejects\(([^\(\)]+?|(?:[\s\S]+?\([\s\S]*?\)))\s*(?:,\s*(?:'|").+(?:'|"))?\)/g,
    replaceWith: 'expect($1).to.eventually.be.rejected'
  }
};

module.exports = [
  REPLACEMENT.moduleToDescribe1,
  REPLACEMENT.moduleToDescribe2,
  REPLACEMENT.testToIt,
  REPLACEMENT.assertOk,
  REPLACEMENT.assertStrictEqual,
  REPLACEMENT.assertDeepEqual,
  REPLACEMENT.assertRejects,
];
