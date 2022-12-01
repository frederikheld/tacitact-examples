import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import { Server } from 'tacitact'


// config:

const CONFIG = JSON.parse(
    fs.readFileSync(
        new URL('../config.json', import.meta.url)
    )
)


// start webserver:

const corsConfig = {
    origin: 'http://localhost:' + CONFIG.clientVue3.port,
    methods: ['GET', 'POST']
}

const app = express()
// app.use(cors(corsConfig))
app.options('*', cors(corsConfig)) // enables preflight headers
app.use('/', (req, res, next) => {
    console.log('http request:', req.method, req.url)
    next()
})

// serve tacitact client files:

const __webdir = path.resolve('node_modules', 'tacitact', 'dist', 'web')

app.get('/tacitact/tacitact.min.js', (req, res) => {
    res.sendFile(path.resolve(__webdir, 'tacitact.min.js'),{
        headers: {
            'content-type': 'text/javascript'
        }
    })
})

app.get('/tacitact/tacitact.min.js.map', (req, res) => {
    res.sendFile(path.resolve(__webdir, 'tacitact.min.js.map'), {
        headers: {
            'content-type': 'application/json'
        }
    })
})

// start web server:

const httpServer = app.listen(CONFIG.server.port, () => {
    console.log('http server listening on port ' + CONFIG.server.port)
})

httpServer.on('upgrade', (req) => {
    console.log('ws request:', req.url)
})

// start tacitact server:

const socketIOServerConfig = {
    cors: corsConfig,
    debug: true
}

const ts = new Server(httpServer, socketIOServerConfig)

ts.connection((socket) => {
    console.log('tacitact server connected to new client via socket ' + socket.id)
})
