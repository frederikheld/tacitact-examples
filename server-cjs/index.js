const http = require('http')
const fs = require('fs')
const path = require('path')

const tacitact = require('tacitact')
const { Server } = require('tacitact')


// config:

const port = 8101


// smoke test:

console.log(tacitact.Server)
console.log(Server)


// start webserver:

const httpServer = http.Server()

const fileContents = fs.readFileSync(path.resolve('..', 'client-web', 'index.html'))

httpServer.on('request', (req, res) => {
    console.log('got request', req.url)
    if ([ '/', '/index.html' ].includes(req.url)) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(fileContents)
    }
})

httpServer.listen(port, () => {
    console.log('http server listening on port ' + port)
})

// start tacitact server:

const t = new Server(httpServer)

t.connected((socket) => {
    console.log('tacitact server connected to new client via socket ' + socket.id)
})

t.serveClientFiles()
