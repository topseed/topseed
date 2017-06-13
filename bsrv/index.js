'use strict'
const express = require('express')
const server = express()
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')

const C = (require('./config/ApiConfig'))
global.ApiConfig = new C()

server.use(compression())
server.use(bodyParser.json())
server.use(cors())

//server.use(express.static(ApiConfig.WEBROOT)) for API response
server.use('/linkblog', require('./scode/route/LinkblogService')) 
server.use('/login', require('./scode/route/LoginService')) 

//###################### start the server
server.listen(ApiConfig.PORT, '0.0.0.0', function() {
	console.log('API server listening at http://localhost:'+ApiConfig.PORT)
	console.log('Press Ctrl+C to quit.')
})