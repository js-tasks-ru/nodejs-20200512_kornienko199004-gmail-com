const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.buf = '';
  }

  _transform(chunk, encoding, callback) {
    this.buf += chunk.toString('utf-8');

    if (this.buf.includes(os.EOL)) {
      const [row, ...rest] = this.buf.split(os.EOL);
      this.push(row);
      this.buf = rest.join('');
    }
    callback();
  }

  _flush(callback) {
    if (this.buf) {
      this.push(this.buf);
    }
    callback();
  }
}

module.exports = LineSplitStream;