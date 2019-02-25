async function concat (stream) {
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

const body = await concat(
  fs.createReadStream(__filename)
)
