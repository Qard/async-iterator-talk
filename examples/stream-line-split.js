const pipe = require('async-iterator-pipe')

async function* lineSplit (iterator) {
  let buffer = Buffer.alloc(0)

  for await (let chunk of iterator) {
    buffer = Buffer.concat([ buffer, chunk ])

    let position = buffer.indexOf(0x0a)
    while (position >= 0) {
      yield buffer.slice(0, position)

      buffer = buffer.slice(position + 1)
      position = buffer.indexOf(0x0a)
    }
  }

  if (buffer) {
    yield buffer
  }
}

async function* csv (iterator) {
  let keys

  for await (let line of iterator) {
    const values = line.toString().split(',')

    if (!keys) {
      keys = values
      continue
    }

    const data = {}
    for (let i = 0; i < values.length; i++) {
      data[keys[i]] = values[i]
    }

    yield data
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
