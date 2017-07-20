const getLorem = require('getlorem');

module.exports = {

  produce: function(amount, length, options = {}) {

    var text = getLorem.words(length);
    var maxChars = amount.toString().length;
    var numChars = 0;

    for (var ix=1; ix<=amount; ix++) {

      var toLog = [];

      toLog = (options.dated)
              ? [new Date().toISOString()]
              : [];

      if (options.counter) {
        numChars = ix.toString().length;
        toLog.push(ix + ' '.repeat(maxChars - numChars));
      }

      if (options.identifier) {
        toLog.push(options.identifier);
      }

      toLog.push(text);

      console.log(toLog.join(options.spacer).substr(0, length));

    } // for ix

    return amount * length;

  }, // produce

  generate: function(logLines, logLength, spacer, identifier, lineCount, lineDated) {

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

  } // generate

} // module.exports
