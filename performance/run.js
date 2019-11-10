const test = process.argv[2]
let modes = process.argv[3]

if (!modes || modes === 'all') {
  modes = 'async-iterator,stream'
}

modes = modes.split(',')
const metric = process.argv[4] || 'bps'

const blessed = require('blessed')
const blessedContrib = require('blessed-contrib')

const makeLine = require('./make-line')

const screen = blessed.screen()

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

const line = blessedContrib.line({
  label: test,
  showLegend: true
})

screen.append(line)

function update () {
  line.setData(data)
  screen.render()
}

const data = modes.map(makeLine.bind(null, test, metric))

update()
setInterval(update, 1000 / 1)
