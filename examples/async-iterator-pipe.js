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
  }
  
  if (typeof target === 'function') {
    return target(source)
  }

  throw new Error('Unrecognized target type')
}

function pipe (source, ...targets) {
  return targets.reduce(pipeDirect, source)
}

module.exports = pipe
