const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');

const generator = require('./generator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const options = _.cloneDeep(app.get('options'));
  const mapping = {
    n: 'number',
    l: 'length',
    s: 'spacer',
    i: 'identifier',
    d: 'dated',
    c: 'counter',
    m: 'multiline',
  };

  Object.entries(mapping).forEach(([key, value]) => {
    if (req.query[key] !== undefined) {
      options[value] = req.query[key];
    }
  });

  options.number = parseInt(options.number, 10);
  options.length = parseInt(options.length, 10);
  options.dated = !!parseInt(options.dated, 10);
  options.counter = !!parseInt(options.counter, 10);
  options.multiline = !!parseInt(options.multiline, 10);

  if (Number.isNaN(options.number) || Number.isNaN(options.length)) {
    return res.sendStatus(400);
  }

  const start = +new Date();
  const bytes = generator.produce(options.number, options.length, options);
  const end = +new Date();

  return res.send(`${new Date()} - Logged ${options.number} lines, ${bytes} bytes, in ${end - start}ms to stdout`);
});

// catch 404 and forward to error handler
app.use((req, res) => res.sendStatus(404));

module.exports = app;
