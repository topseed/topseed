'use strict'
const express = require('express')
const server = express()
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C()

server.use(compression())
server.use(bodyParser.json())
server.use(cors())

//######################## sroute
const LP = require('./scode/route/LinksPg') 
server.use('/links', LP) 
const AP = require('./scode/route/AdminPg') 
server.use('/admin', AP) 


//###################### start the server
server.listen(ServerConfig.PORT, '0.0.0.0', function() {
	console.log('App listening on port '+ServerConfig.PORT)
	console.log('Press Ctrl+C to quit.')
})

