const getLorem = require('getlorem');

module.exports = {
  produce: (amount, length, options = {}) => {
    const text = getLorem.words(length);
    const maxChars = amount.toString().length;
    let numChars = 0;
console.log(amount, length);
    for (let ix = 1; ix <= amount; ix += 1) {
      const toLog = (options.dated)
        ? [new Date().toISOString()]
        : [];

      if (options.counter) {
        numChars = ix.toString().length;
        toLog.push(ix + ' '.repeat(maxChars - numChars));
      }

      if (options.identifier) {
        toLog.push(options.identifier);
      }

      if (options.multiline) {
        toLog.push('\n\t\t');
      }

      toLog.push(text);

      console.log(toLog.join(options.spacer).substr(0, length));
    }

    return amount * length;
  },
};
