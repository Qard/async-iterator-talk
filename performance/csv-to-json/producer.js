const { Readable } = require('stream')

module.exports = (headerCount = 10, batchSize = 10) => {
  const headers = []
  for (let i = 0; i < headerCount; i++) {
    headers.push(`header_${i}`)
  }
  const headerBuffer = Buffer.from(`${headers.join(',')}\n`)

  function makeLine () {
    const values = []
    for (let i = 0; i < headerCount; i++) {
      values.push(Math.random() * 1000)
    }
    return values.join(',')
  }

  function makeLines (n) {
    const lines = []
    for (let i = 0; i < n; i++) {
      lines.push(makeLine())
    }
    return lines.join('\n')
  }

  let buffer = Buffer.from(headerBuffer)

  return new Readable({
    read (size) {
      while (buffer.length < size) {
        buffer = Buffer.concat([
          buffer,
          Buffer.from(makeLines(batchSize))
        ])
      }

      setImmediate(() => {
        this.push(buffer.slice(0, size))
        buffer = buffer.slice(size + 1)
      })
    }
  })
}
