const splitMatch = (match) => {
  const contentBefore = match.input.substr(0, match.index);
  const contentMatched = match[0];
  const contentAfter = match.input.substr(match.index + contentMatched.length);

  return [contentBefore, contentMatched, contentAfter];
};

const matchRecursive = (content, conversionRegex) => {
  const regex = new RegExp(conversionRegex);
  const match = content.match(regex);
  if (!match) {
    return [content];
  }
  const [before, matched, after] = splitMatch(match);
  return [before, matched, ...matchRecursive(after, conversionRegex)]
};

module.exports = matchRecursive;
