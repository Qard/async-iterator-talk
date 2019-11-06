const test = process.argv[2]
const modes = (process.argv[3] || 'async-iterator,stream').split(',')

const blessed = require('blessed')
const blessedContrib = require('blessed-contrib')

const makeLine = require('./make-line')

const screen = blessed.screen()

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

const line = blessedContrib.line({
  label: test,
  showLegend: true
})

screen.append(line)

function update () {
  line.setData(data)
  screen.render()
}

const data = modes.map(makeLine.bind(null, test))

update()
setInterval(update, 1000 / 60)
