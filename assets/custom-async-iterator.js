function interval (ms) {
  const iterator = {
    async next () {
      await timeout(ms)
      return {
        value: Date.now(),
        done: false
      }
    }
  }

  const generator = {
    [Symbol.asyncIterator] () {
      return iterator
    }
  }

  return generator
}
