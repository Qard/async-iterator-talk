const toIter = require('http-iterator')
const http = require('http')

const server = http.createServer()
server.listen(3000)

for await (let { response } of toIter(server)) {
  response.end('hello world')
}
