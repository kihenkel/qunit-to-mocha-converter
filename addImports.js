const IMPORTS = [
  `import { expect } from 'chai';`
];

const addImports = (fileContent) => {
  return [...IMPORTS, fileContent].join('\n');
};

module.exports = addImports;