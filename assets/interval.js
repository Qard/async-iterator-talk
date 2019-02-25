function timeout (ms) {
  return new Promise(done => {
    setTimeout(done, ms)
  })
}

async function* interval (ms) {
  while (true) {
    await timeout(ms)
    yield Date.now()
  }
}

for await (let time of interval(1000)) {
  console.log(time)
}
