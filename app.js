var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var getLorem = require('getlorem');

var app = express();

// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.get('/', function (req, res) {

  var logLines = req.query.n || 1;
  var logLength = req.query.l || 32;

  logLines = parseInt(logLines);
  logLength = parseInt(logLength);

  if (isNaN(logLines) || isNaN(logLength)) {
    return res.sendStatus(400);
  }

  // Generate an excessive number of words, trims by characters
  var text = getLorem.words(logLength).substr(0, logLength);
  var start = +new Date();

  for (var x=0; x<logLines; x++) {
    console.log(text);
  }

  var end = +new Date();

  res.send('Logged ' + logLines + ' lines, ' + (logLength * logLines) + ' bytes' + ' in ' + (end - start) + 'ms');
})

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = app;
