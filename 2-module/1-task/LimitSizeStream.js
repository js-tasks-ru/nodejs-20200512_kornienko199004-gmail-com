const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super({
      ...options,
      encoding: options.encoding || 'utf-8',
    });
    this.limit = options.limit;
    this.dataLength = 0;
  }

  _transform(chunk, encoding, callback) {
    this.dataLength += chunk.length;
    if (this.limit - this.dataLength >= 0) {
      callback(null, chunk);
    } else {
      callback(new LimitExceededError());
    }
  }
}

module.exports = LimitSizeStream;
