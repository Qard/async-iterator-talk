const test = process.argv[2]
const mode = process.argv[3]

const producer = require(`./${test}/producer`)
const run = require(`./${test}/${mode}`)

run(producer(), process.stdout)
