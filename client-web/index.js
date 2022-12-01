'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')

const CONFIG = require('../config.json')


// start webserver:

const app = express()
const proxy = httpProxy.createProxyServer({
    target: {
        host: 'localhost',
        port: CONFIG.server.port
    },
    ws: true
})
app.use('/', (req, res, next) => {
    console.log('request:', req.url)
    next()
})

// serve web client:
app.get('/', (req, res) => {
    const fileContents = fs.readFileSync(path.join(__dirname, 'index.html'))
    res.set('Content-Type', 'text/html')
    res.send(fileContents)
})

// proxy all other http get requests:
app.get('/*', (req, res) => {
    console.log('proxying http get request', req.url)
    proxy.web(req, res, { })
})

// start express and retreive http server instance:
const httpServer = app.listen(CONFIG.clientWeb.port, () => {
    console.log('Client is being served on port ' + CONFIG.clientWeb.port)
})

// proxy websockets:
httpServer.on('upgrade', (req, res, head) => {
    console.log('proxying websocket request', req.url)
    proxy.ws(req, res, head)
})
