class CappedArray extends Array {
  constructor(limit) {
    super()
    this.limit = limit
    for (let i = 0; i < limit; i++) {
      this.push(0)
    }
  }

  push (value) {
    super.push(value)
    while (this.length > this.limit) {
      this.shift()
    }
  }
}

module.exports = CappedArray
