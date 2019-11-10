const { Writable } = require('stream')
const microtime = require('relative-microtime')

const CappedArray = require('./capped-array')

const colors = ['red', 'yellow']
let n = 0

class MeasureStream extends Writable {
  constructor(mode, compute) {
    super()
    this.timer = microtime()
    this.compute = compute

    this.data = {
      title: mode,
      y: new CappedArray(60),
      x: new CappedArray(60),
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
      y.push(this.compute(0, chunk, now))
    } else {
      y[y.length - 1] = this.compute(y[y.length - 1], chunk, now)
    }

    setImmediate(callback)
  }
}

module.exports = MeasureStream
