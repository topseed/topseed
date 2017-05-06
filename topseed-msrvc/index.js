'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// /////////////////////////////
const microsrv = express()
microsrv.use(bodyParser.json())
const compression = require('compression')
microsrv.use(compression())
microsrv.use(cors())

microsrv.get('/', function (req, res) {
	res.send('nothing to see here')
})

// service routes matcch pages //////////////////////////
const membersPg = require('./sroute/memPg')
microsrv.use('/s/membPg', membersPg)

// /////////////////////////////
const PORT = 8090
microsrv.listen(PORT, '0.0.0.0', function () {
	console.log('App listening on port ' + PORT)
	console.log('Press Ctrl+C to quit.')
})
