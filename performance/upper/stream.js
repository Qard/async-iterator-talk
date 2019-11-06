const { Transform, pipeline } = require('stream')

class Upper extends Transform {
  _transform (data, encoding, callback) {
    this.push(data.toString().toUpperCase())
    setImmediate(callback)
  }
}

module.exports = (input, output) => {
  pipeline(
    input,
    new Upper(),
    output,
    err => console.error(err)
  )
}
