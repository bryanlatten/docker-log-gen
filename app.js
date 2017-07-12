var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var getLorem = require('getlorem');
var config = require('./lib/config');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.get('/', function (req, res) {

  var logLines = req.query.n || config.defaultLogLines;
  var logLength = req.query.l || config.defaultLogLength;
  var spacer = req.query.s || config.defaultSpacer;
  var identifier = req.query.i || config.defaultIdentifier;
  var lineCount = (req.query.x !== undefined)
                  ? req.query.x
                  : config.defaultLineCount;
  var lineDated = (req.query.d !== undefined)
                  ? req.query.d
                  : config.defaultLineDated;

  lineDated = !!parseInt(lineDated);
  lineCount = !!parseInt(lineCount);

  logLines = parseInt(logLines);
  logLength = parseInt(logLength);

  if (isNaN(logLines) || isNaN(logLength)) {
    return res.sendStatus(400);
  }

  var start = +new Date();
  var bytes = _performLog(logLines, logLength, spacer, identifier, lineCount, lineDated);
  var end = +new Date();

  res.send('Logged ' + logLines + ' lines, ' + bytes + ' bytes' + ' in ' + (end - start) + 'ms');
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404);
});

function _performLog(logLines, logLength, spacer, identifier, lineCount, lineDated) {

  // Generate an excessive number of words, trim later
  var maxChars = logLines.toString().length;
  var numChars = 0;
  var toLog = [];
  var text = getLorem.words(logLength);

  for (var ix=1; ix<=logLines; ix++) {

    toLog = (lineDated)
            ? [new Date().toISOString()]
            : [];

    if (lineCount) {
      numChars = ix.toString().length;
      toLog.push(ix + ' '.repeat(maxChars - numChars));
    }

    if (identifier) {
      toLog.push(identifier);
    }

    toLog.push(text);

    console.log(toLog.join(spacer).substr(0, logLength));

  } // for ix

  return logLines * logLength;

} // _performLog

module.exports = app;
