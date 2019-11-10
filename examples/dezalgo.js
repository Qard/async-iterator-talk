async function* dezalgo (iterator) {
  for await (const item of iterator) {
    await new Promise(setImmediate)
    yield item
  }
}