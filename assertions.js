const assertionMap = {
  'ok': (args) => `expect(${args[0]}).to.be.ok;`,
  'notOk': (args) => `expect(${args[0]}).to.not.be.ok;`,
  'equal': (args) => `expect(${args[0]}).to.equal(${args[1]});`,
  'strictEqual': (args) => `expect(${args[0]}).to.equal(${args[1]});`,
  'notEqual': (args) => `expect(${args[0]}).to.not.equal(${args[1]});`,
  'notStrictEqual': (args) => `expect(${args[0]}).to.not.equal(${args[1]});`,
  'deepEqual': (args) => `expect(${args[0]}).to.deep.equal(${args[1]});`,
  'rejects': (args) => `expect(${args[0]}).to.eventually.be.rejected;`,
  'throws': (args) => `expect(${args[0]}).to.throw();`,
};

module.exports = Object.entries(assertionMap);