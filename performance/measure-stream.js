const { Writable } = require('stream')
const microtime = require('relative-microtime')

const CappedArray = require('./capped-array')

const colors = ['red', 'yellow']
let n = 0

class MeasureStream extends Writable {
  constructor(mode) {
    super()
    this.timer = microtime()

    this.data = {
      title: mode,
      x: new CappedArray(50),
      y: new CappedArray(50),
      style: {
        line: colors[n++]
      }
    }
  }

  _write (chunk, encoding, callback) {
    const { x, y } = this.data
    const now = this.timer() // ns
    const bucket = Math.floor(now / 1000 / 1000)

    if (!x.length || x[x.length - 1] !== bucket) {
      x.push(bucket)
      y.push(chunk.length)
    } else {
      y[y.length - 1] = chunk.length + y[y.length - 1]
    }

    setImmediate(callback)
  }
}

module.exports = MeasureStream
