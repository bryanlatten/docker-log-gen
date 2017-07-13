var express = require('express');
var bodyParser = require('body-parser');
var generator = require('./lib/generator');
var config = require('./lib/config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {

  var logLines = req.query.n || config.defaultLogLines;
  var logLength = req.query.l || config.defaultLogLength;
  logLines = parseInt(logLines);
  logLength = parseInt(logLength);

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

  if (isNaN(logLines) || isNaN(logLength)) {
    return res.sendStatus(400);
  }

  var start = +new Date();
  var bytes = generator.generate(logLines, logLength, spacer, identifier, lineCount, lineDated);
  var end = +new Date();

  res.send('Logged ' + logLines + ' lines, ' + bytes + ' bytes' + ' in ' + (end - start) + 'ms');
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = app;
