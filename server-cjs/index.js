const http = require('http')
const fs = require('fs')
const path = require('path')

// const tacitact = require('tacitact') // import default
const { Server } = require('tacitact') // import named


// config:

const CONFIG = require('../config.json')
console.log(CONFIG)


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

httpServer.listen(CONFIG.server.port, () => {
    console.log('http server listening on port ' + CONFIG.server.port)
})

// start tacitact server:

// const t = new tacitact.Server(httpServer) // with default import
const t = new Server(httpServer) // with named import

t.connected((socket) => {
    console.log('tacitact server connected to new client via socket ' + socket.id)
})

t.serveClientFiles()
