'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')

const CONFIG = require('../config.json')


// start webserver:

const app = express()


// proxy client files from server:
// This allows to hard-code the tacitact.js path in the client
// and still be able to change the server port in the global config.
app.use('/tacitact/tacitact.js', async (req, res) => {
    try {
        const response = await fetch('http://localhost:' + CONFIG.server.port + '/tacitact/tacitact.js')

        if (!response.ok) {
            res.status(response.status).send('ERROR: Could not proxy request to server. Route does not exist.')
        } else {
            const payload = await response.text()

            res.set('Content-Type', 'text/javascript')
            res.send(payload)
        }
    } catch (error) {
        res.status(500).send('ERROR: Could not proxy request to server. Server did not answer. Don\'t forget to start a server!')
    }
})

// serve web client:
app.use('/', (req, res) => {
    const fileContents = fs.readFileSync(path.join(__dirname, 'index.html'))
    res.set('Content-Type', 'text/html')
    res.send(fileContents)
})


app.listen(CONFIG.clientWeb.port, () => {
    console.log('Client is being served on port ' + CONFIG.clientWeb.port)
})
