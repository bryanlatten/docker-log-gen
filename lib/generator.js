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

  } // produce

} // module.exports
