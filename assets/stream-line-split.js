const pipe = require('async-iterator-pipe')

async function* lineSplit (iterator) {
  let buffer = ''
  for await (let chunk of iterator) {
    buffer += chunk.toString()
    let position = buffer.indexOf('\n')
    while (position >= 0) {
      yield buffer.slice(0, position)
      buffer = buffer.slice(position + 1)
      position = buffer.indexOf('\n')
    }
  }
}

async function* csv (iterator) {
  let keys
  for await (let line of iterator) {
    const values = line.split(',')
    if (!keys) {
      keys = values
    } else {
      const data = {}
      for (let i = 0; i < values.length; i++) {
        data[keys[i]] = values[i]
      }
      yield data
    }
  }
}

async function* toJSON (iterator) {
  for await (let item of iterator) {
    yield JSON.stringify(item)
  }
}

const fs = require('fs')
pipe(
  fs.createReadStream('./assets/test.csv'),
  lineSplit,
  csv,
  toJSON,
  process.stdout
)
