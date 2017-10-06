'use strict'
const express = require('express')
const server = express()

const cors = require('cors')
const compression = require('compression')
server.use(cors())
server.use(compression())

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

/* optional:
const scribe = require('scribe-js')()
const console = process.console
server.use(scribe.express.logger()) //Log each request for now
server.use('/logs', scribe.webPanel())
const debug = require('debug')('my-app')
debug('oh hi')
*/

const Decider = require('./utils/Decider')

// ###################### static
server.use(Decider.decide)
server.use(express.static(ServerConfig.WEBROOT))

//###################### start the server

server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('Web server listening at http://localhost:'+ ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})

server.listen(ServerConfig.AMP_PORT, '0.0.0.0', function() {
	console.log('Web server listening at http://localhost:' + ServerConfig.AMP_PORT)
	console.log('Press Ctrl+C to quit.')
})

