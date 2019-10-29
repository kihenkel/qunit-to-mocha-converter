const fs = require('fs');
const path = require('path');
const replacements = require('./replacements');
const replace = require('./replace');
const convertHooks = require('./convertHooks');
const convertBeforeAfterEachs = require('./convertBeforeAfterEachs');
const returnPromises = require('./returnPromises');
const removeObsoleteLines = require('./removeObsoleteLines');
const addImports = require('./addImports');

const allTestFiles = require('./input/test-files.json');

allTestFiles.forEach(file => {
  Promise.resolve()
    .then(() => {
      console.log(`Starting to convert '${file.name}' ...`);
      return fs.readFileSync(path.normalize(file.fullPath));
    })
    .then(fileContentRaw => fileContentRaw.toString())
    .then(fileContent => convertHooks(fileContent).join(''))
    .then(fileContent => replace(fileContent, replacements))
    .then(fileContent => convertBeforeAfterEachs(fileContent).join(''))
    .then(fileContent => returnPromises(fileContent).join(''))
    .then(removeObsoleteLines)
    .then(addImports)
    .then(fileContent => {
      console.log(`Finished converting '${file.name}'! Saving to file ...`);
      const normalizedPath = path.normalize(file.fullPath);
      fs.writeFileSync(normalizedPath, fileContent, 'utf8');
      console.log(`Succesfully saved '${normalizedPath}'!`);
    })
    .catch(error => {
      console.error('ERROR', error);
    })
});
