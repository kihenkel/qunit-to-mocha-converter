const util = require('util');
const fs = require('fs');
const replacements = require('./replacements');
const replace = require('./replace');
const convertHooks = require('./convertHooks');
const convertBeforeAfterEachs = require('./convertBeforeAfterEachs');

const allTestFiles = require('./input/test-files.json');

const readFile = util.promisify(fs.readFile);

const promises = allTestFiles.map(async (file) => {
  const fileContentRaw = await readFile(file.fullPath);
  const fileContent = fileContentRaw.toString();
  return fileContent;
});
Promise.all(promises)
  .then(fileContents => fileContents.map(fileContent => convertHooks(fileContent).join('')))
  .then(fileContents => fileContents.map(fileContent => replace(fileContent, replacements)))
  .then(fileContents => fileContents.map(fileContent => convertBeforeAfterEachs(fileContent).join('')))
  .then(fileContents => {
    fileContents.forEach((fileContent, index) => {
      const fileToWrite = `results/${allTestFiles[index].name}_${new Date().toISOString().substr(0, 19).replace(/[T\:]/g, '-')}.json`;
      fs.writeFileSync(fileToWrite, fileContent, 'utf8'); 
    });
  })
  .catch(error => {
    console.error('ERROR', error);
  })
