
var config = {
  defaultLogLength: process.env.LOGLENGTH || 64,
  defaultLogLines: process.env.LOGLINES || 1,
  defaultSpacer: process.env.SPACER || ' | ',
  defaultIdentifier: process.env.IDENTIFIER || '',
  defaultLineCount: process.env.LINECOUNT || 1,
  defaultLineDated: process.env.LINEDATED || 1
};

module.exports = config;
