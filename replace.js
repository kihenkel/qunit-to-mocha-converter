const exec = (fileContent, replacements) => {
  return replacements.reduce((currentFileContent, replacement) => {
    return currentFileContent.replace(new RegExp(replacement.regex), replacement.replaceWith);
  }, fileContent);
};

module.exports = exec;