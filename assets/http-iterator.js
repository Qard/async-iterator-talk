const Channel = require('channel-surfer')

module.exports = function httpIterator (server) {
  const channel = new Channel()

  server.on('request', (request, response) => {
    channel.give({ request, response })
  })

  server.on('close', () => {
    channel.close()
  })

  return channel
}
