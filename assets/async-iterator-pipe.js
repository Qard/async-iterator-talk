async function pipeStream (iterator, stream) {
  for await (let chunk of iterator) {
    stream.write(chunk)
  }
  stream.end()
}

function pipeDirect (source, target) {
  if (target.write && target.end) {
    pipeStream(source, target)
    return target
  } else if (typeof target === 'function') {
    return target(source)
  } else {
    throw new Error('Unrecognized target type')
  }
}

function pipe (source, ...transforms) {
  return transforms.reduce(pipeDirect, source)
}

module.exports = pipe
