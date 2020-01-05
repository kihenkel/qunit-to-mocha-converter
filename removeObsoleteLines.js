const OBSOLETE_LINES = [
  /(?:const|let|var)\s+done\s*=\s*assert\.async\(.*\)\s*;\s*/g,
  /\s*done\s*\(\s*\)\s*;/g,
  /\s*\.then\s*\(\s*assert\.async\s*\(\s*\)\s*\)\s*/g,
  /\s*assert\.expect\s*\(.+\);?/g,
];

const removeObsoleteLines = (fileContent) => {
  return OBSOLETE_LINES.reduce((content, regex) => {
    return content.replace(new RegExp(regex), '');
  }, fileContent);
};

module.exports = removeObsoleteLines;