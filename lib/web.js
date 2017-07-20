const express = require('express');
const bodyParser = require('body-parser');
const generator = require('./generator');
const config = require('./config');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  var options = app.get('options');

  var mapping = {
    n: 'number',
    l: 'length',
    s: 'spacer',
    i: 'identifier',
    d: 'dated',
    c: 'counter'
  };

  Object.entries(mapping).forEach(([key, value]) => {
    if (req.query[key] != undefined ) {
      options[value] = req.query[key];
    }
  });

  options.number = parseInt(options.number);
  options.length = parseInt(options.length);
  options.dated = !!parseInt(options.dated);
  options.counter = !!parseInt(options.counter);

  if (isNaN(options.number) || isNaN(options.length)) {
    return res.sendStatus(400);
  }

  var start = +new Date();
  var bytes = generator.produce(options.number, options.length, options);
  var end = +new Date();

  res.send('Logged ' + options.number + ' lines, ' + bytes + ' bytes' + ' in ' + (end - start) + 'ms');
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = app;
