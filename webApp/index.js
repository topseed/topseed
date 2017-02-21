'use strict'
const express = require('express')
const server = express()
const cors = require('cors')
const compression = require('compression')

const membersAmp = require('./route/membersAmp')
const AFilter = require('./util/AFilter')

server.use(cors())
server.use(compression())

// ###################### dynamic data for some pgs here:
server.use('/members', membersAmp) 

// ###################### static
server.use(AFilter.filter)
server.use(express.static('www'))

//###################### start the server
const PORT = 8081
server.listen(PORT, '0.0.0.0', function() {
	console.log('App listening on port '+PORT)
	console.log('Press Ctrl+C to quit.')
})
 
