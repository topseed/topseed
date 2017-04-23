'use strict'
const express = require('express')
const server = express()

const cors = require('cors')
const compression = require('compression')
server.use(cors())
server.use(compression())

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

// ###################### 

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
const dbAdv = require('./proute/ssrPg')
server.use('/dBindAdvanced', dbAdv) 

// ###################### static
server.use(Decider.decide)
server.use(express.static('webroot'))

//###################### start the server
const PORT1 = 8081
server.listen(PORT1, '0.0.0.0', function() {
	console.log('App listening on port '+PORT1)
	console.log('Press Ctrl+C to quit.')
})
const PORT2 = 8082
server.listen(PORT2, '0.0.0.0', function() {
	console.log('App listening on port ' +PORT2)
	console.log('Press Ctrl+C to quit.')
})

