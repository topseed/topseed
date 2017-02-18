'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const middle = express()
middle.use(bodyParser.json()) // parse application/json
middle.use(cors())
// ###################### 

//routes ###################### 
const membersPg = require('./route/membersPg')
middle.use('/membersPg', membersPg) //front route 1 - match the front end

//###################### 
// start the service
const PORT = 8083
middle.listen(PORT, '0.0.0.0', function() {
	console.log('App listening on port')
	console.log('Press Ctrl+C to quit.')
})



