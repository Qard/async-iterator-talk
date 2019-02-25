const pipe = require('async-iterator-pipe')
const zlib = require('zlib')

async function* upper (iterator) {
  for await (let item of iterator) {
    yield item.toString().toUpperCase()
  }
}

pipe(
  process.stdin,
  zlib.createGunzip(),
  upper,
  zlib.createGzip(),
  process.stdout
)
