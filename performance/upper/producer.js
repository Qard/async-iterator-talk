const { Readable } = require('stream')
const { randomBytes } = require('crypto')

module.exports = () => {
  return new Readable({
    read (size) {
      randomBytes(size, (error, buffer) => {
        if (error) return this.emit('error', error)
        this.push(buffer)
      })
    }
  })
}
