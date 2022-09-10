import http from 'http'
import fs from 'fs'
import path from 'path'

// import tacitact from 'tacitact' // import default
import { Server } from 'tacitact' // import named


// config:

const port = 8100


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

// const t = new tacitact.Server(httpServer) // with default import
const t = new Server(httpServer) // with named import

t.connected((socket) => {
    console.log('tacitact server connected to new client via socket ' + socket.id)
})

t.serveClientFiles()
