module.exports = {
  splitLine (line) {
    return line
      .match(/\s*(?:([^,]+)|"([^,]+)")/g)
      .map(value => value.trim().replace(/"/g, ''))
  },

  zipKeyValueLists (keys, values) {
    const data = {}
    for (let i = 0; i < values.length; i++) {
      data[keys[i]] = values[i]
    }
    return data
  }
}
