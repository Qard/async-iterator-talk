const pipe = require('async-iterator-pipe')

async function* upper (iterator) {
  for await (let item of iterator) {
    yield item.toString().toUpperCase()
  }
}

module.exports = (input, output) => {
  pipe(
    input,
    upper,
    output
  )
}
