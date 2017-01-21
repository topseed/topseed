'use strict'
const express = require('express')
const server = express()
const path = require('path')
const fs = require('fs')

const jsrender = require('jsrender')
const AFilter = require('./util/AFilter')

// ###################### dynamic data for some pgs here:


// ###################### static
server.use(AFilter.filter)
server.use(express.static('www'))

//###################### start the server
const PORT = 8081
server.listen(PORT, '0.0.0.0', function() {
	console.log('App listening on port')
	console.log('Press Ctrl+C to quit.')
})
 
