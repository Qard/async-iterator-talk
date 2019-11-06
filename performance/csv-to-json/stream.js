const { Transform, pipeline } = require('stream')
const { splitLine, zipKeyValueLists } = require('./helper')

const csv = new Transform({
  readableObjectMode: true,
  transform (data, encoding, callback) {
    if (!this.buffer) this.buffer = Buffer.alloc(0)
    let buffer = Buffer.concat([ this.buffer, data ])

    let position = buffer.indexOf(0x0a)
    while (position >= 0 && buffer.length) {
      const line = buffer.slice(0, position).toString()

      const values = splitLine(line)
      if (!this.headers) {
        this.headers = values
      } else {
        this.push(zipKeyValueLists(this.headers, values))
      }

      buffer = buffer.slice(position + 1)
      position = buffer.indexOf(0x0a)
    }

    if (buffer.length) {
      this.buffer = buffer
    }

    setImmediate(callback)
  }
})

const ldjson = new Transform({
  writableObjectMode: true,
  transform (data, encoding, callback) {
    this.push(`${JSON.stringify(data)}\n`, encoding)
    setImmediate(callback)
  }
})

module.exports = (input, output) => {
  pipeline(
    input,
    csv,
    ldjson,
    output,
    err => console.error(err)
  )
}
