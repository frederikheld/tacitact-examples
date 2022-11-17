import path from 'path'
import express from 'express'

import { Server } from 'socket.io'


// config:

const web_port = 8102
const socketio_port = 8103


// start webserver:

const webApp = express()

webApp.get('/', (req, res) => {
    res.sendFile(path.resolve('..', 'client', 'index.html'))
})

webApp.listen(web_port, () => {
    console.log('[web server] listening on port ' + web_port)
})

// start socket.io server:

const socketsApp = express()

const httpServer = socketsApp.listen(socketio_port, () => {
    console.log('[sockets server] listening on port ' + socketio_port)
})

const socketIOSettings = {
    cors: {
        origin: ['http://localhost:' + web_port],
        methdos: ['GET', 'POST']
    }
}

const io = new Server(httpServer, socketIOSettings)

io.on('connection', (socket) => {
    console.log('[sockets server] new connection with ' + socket.id)

    socket.on('message', (message) => {
        console.log('[sockets server] message received:', message.text)
        setTimeout(() => {
            socket.emit('response', message.text.split('').reverse().join(''))
        }, 1000)
    })
})
