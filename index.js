#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander');
const http = require('http');

const generator = require('./lib/generator');
const config = require('./lib/config');
const app = require('./lib/app');

console.log(`docker-log-gen: started ${new Date()}`);

program
  .description('A quick and dirty tool to spew logs for benchmarking purposes')
  .usage('[options]')
  .option('-n, --number <size>', `Number of outputs to perform (default ${config.defaultLogLines})`)
  .option('-l, --length <size>', `Bytes to log per output (default ${config.defaultLogLength} bytes)`)
  .option('-d, --dated', 'Include date per output (default 0)')
  .option('-c, --counter', 'Include a consistently-spaced counter to each output (default 1)')
  .option('-i, --identifier <text>', 'Add an identifier per outputs')
  .option('-r, --repeat <delay>', `Repeat output every X seconds (default ${config.defaultRepeatDelay} sec), 0 to disable, incompatible with -w`)
  .option('-s, --separator <symbol>', `Use a symbol to separate log components (default ${config.defaultSpacer})`)
  .option('-m, --multiline', 'Add newline and tab control characters')
  .option('-w, --web', `Launch an HTTP server to log only during requests (default port = ${config.defaultPort})`)

  .parse(process.argv);

const options = {
  number: (program.number !== undefined)
    ? parseInt(program.number, 10)
    : config.defaultLogLines,
  length: program.length || config.defaultLogLength,
  identifier: program.identifier,
  dated: program.dated,
  spacer: program.separator || config.defaultSpacer,
  counter: (program.counter !== undefined)
    ? program.counter
    : config.defaultLineCount,
  repeat: (program.repeat !== undefined)
    ? parseInt(program.repeat, 10)
    : config.defaultRepeatDelay,
  multiline: program.multiline || false,
};

const output = () => generator.produce(options.number, options.length, options);
console.log(program.repeat);
if (!program.web) {
  if (program.repeat === '0') {
    output();
    process.exit(0);
  }

  // Convert seconds to milliseconds
  const intervalMsecs = options.repeat * 1000;
  const interval = setInterval(output, intervalMsecs);
  const stopProcess = () => {
    console.log('Stopping process...');
    clearInterval(interval);
  };

  // Required cleanup behavior
  process.on('SIGTERM', stopProcess);
  process.on('SIGINT', stopProcess);
  process.exit(0);
}

const port = normalizePort(config.defaultPort);

app.set('port', port);
app.set('options', options);

console.log(`Starting web server, port ${port}...`);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);

const stopServer = () => {
  console.log('Stopping web server...');
  server.close(() => process.exit(0));
};

// Required cleanup behavior
process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const portInput = parseInt(val, 10);

  if (Number.isNaN(portInput)) {
    // named pipe
    return val;
  }

  if (portInput >= 0) {
    // port number
    return portInput;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string')
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
