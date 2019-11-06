const MeasureStream = require('./measure-stream')

// const { join } = require('path')
// const { spawn } = require('child_process')
// 
// module.exports = (test, mode) => {
//   const gauge = new Measure(mode)
// 
//   const proc = spawn('node', ['container.js', test, mode], {
//     cwd: __dirname
//   })
//   proc.stdout.pipe(gauge)
// 
//   return gauge.data
// }

module.exports = (test, mode) => {
  const gauge = new MeasureStream(mode)

  const producer = require(`./${test}/producer`)
  const run = require(`./${test}/${mode}`)
  run(producer(), gauge)

  return gauge.data
}
