async function* doUntilTimeout (task, ms) {
  let running = true
  setTimeout(() => {
    running = false
  }, ms)

  while (running) {
    yield await task()
  }
}

let n = 0
const numbers = doUntilTimeout(() => n++, 1000)

let sum = 0
for await (let number of numbers) {
  sum += number
}
console.log(sum)
