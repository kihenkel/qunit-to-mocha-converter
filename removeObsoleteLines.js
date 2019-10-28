const OBSOLETE_LINES = [
  /(?:const|let|var)\s+done\s*=\s*assert\.async\(.*\)\s*;\s*/g,
  /\s*done\s*\(\s*\)\s*;/g,
];

const addImports = (fileContent) => {
  return OBSOLETE_LINES.reduce((content, regex) => {
    return content.replace(new RegExp(regex), '');
  }, fileContent);
};

module.exports = addImports;