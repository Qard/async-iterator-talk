function timeout (ms) {
  return new Promise(done => setTimeout(done, ms))
}

async function* numbers () {
  let n = 0
  while (true) {
    await timeout(10)
    yield n++
  }
}

async function* take (iterator, n) {
  while (n-- !== 0) {
    const item = await iterator.next()
    if (!item.done) yield item.value
  }
}

async function toArray (iterator) {
  const items = []
  for await (let item of iterator) {
    items.push(item)
  }
  return items
}

async function* batch (iterator, size) {
  while (true) {
    const page = take(iterator, size)
    const slice = await toArray(page)
    if (!slice.length) break
    yield slice
  }
}

function sum (items) {
  return items.reduce((m, v) => m + v, 0)
}

const batches = batch(numbers(), 8)
for await (let slice of take(batches, 10)) {
  console.log(sum(slice))
}
