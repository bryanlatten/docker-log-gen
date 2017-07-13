var getLorem = require('getlorem');

module.exports = {

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
