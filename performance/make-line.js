const { spawn } = require('child_process')

const MeasureStream = require('./measure-stream')

let lastCpu = process.cpuUsage()

const computers = {
  bps (last, chunk) {
    return last + chunk.length
  },

  rss (last, next) {
    return process.memoryUsage().rss
  },

  heapTotal (last, next) {
    return process.memoryUsage().heapTotal
  },

  user (last) {
    if (last === 0) lastCpu = process.cpuUsage()
    return process.cpuUsage(lastCpu).user
  },

  system (last) {
    if (last === 0) lastCpu = process.cpuUsage()
    return process.cpuUsage(lastCpu).system
  }
}

module.exports = (test, metric, mode) => {
  const computer = computers[metric]
  if (!computer) throw new Error(`Unknown metric "${metric}"`)

  const gauge = new MeasureStream(mode, computer)

  requireAndRun(test, mode, gauge)
  // spawnAndRun(test, mode, gauge)

  return gauge.data
}

function requireAndRun (test, mode, gauge) {
  const producer = require(`./${test}/producer`)
  const run = require(`./${test}/${mode}`)
  run(producer(), gauge)
}

function spawnAndRun (test, mode, gauge) {
  const proc = spawn('node', ['container.js', test, mode], {
    cwd: __dirname
  })
  proc.stdout.pipe(gauge)
}