import http from 'http'
import fs from 'fs'
import path from 'path'

// import tacitact from 'tacitact' // import default
import { Server } from 'tacitact' // import named


// config:

const CONFIG = JSON.parse(
    fs.readFileSync(
        new URL('../config.json', import.meta.url)
    )
)


// start webserver:

const httpServer = http.Server()

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
