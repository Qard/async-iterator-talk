const http = require('http')
const httpIterator = require('http-iterator')

const server = http.createServer()
server.listen(3000)

const requests = httpIterator(server)
for await (let { response } of requests) {
  response.end('hello world')
}
