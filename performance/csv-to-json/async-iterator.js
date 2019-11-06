const pipe = require('async-iterator-pipe')
const { splitLine, zipKeyValueLists } = require('./helper')

async function* csv (iterator) {
  let buffer = Buffer.alloc(0)
  let keys

  for await (let chunk of iterator) {
    buffer = Buffer.concat([ buffer, chunk ])

    let position = buffer.indexOf(0x0a)
    while (position >= 0 && buffer.length) {
      const line = buffer.slice(0, position).toString()

      const values = splitLine(line)
      if (!keys) {
        keys = values
      } else {
        yield zipKeyValueLists(keys, values)
      }

      buffer = buffer.slice(position + 1)
      position = buffer.indexOf(0x0a)
    }
  }
}

async function* toJSON (iterator) {
  for await (let item of iterator) {
    yield `${JSON.stringify(item)}\n`
  }
}

module.exports = (input, output) => {
  pipe(
    input,
    csv,
    toJSON,
    output
  )
}
