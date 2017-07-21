
var config = {
  defaultPort: process.env.PORT || 3000,
  defaultLogLength: process.env.LOGLENGTH || 64,
  defaultLogLines: process.env.LOGLINES || 10,
  defaultSpacer: process.env.SPACER || ' | ',
  defaultIdentifier: process.env.IDENTIFIER || '',
  defaultLineCount: process.env.LINECOUNT || 1,
  defaultLineDated: process.env.LINEDATED || 0,
  defaultRepeatDelay: process.env.REPEATDELAY || 2
};

module.exports = config;
