'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const Links = require('./ds/Links')
const links = new Links()
const MyAuth = require('./ds/MyAuth')

//###################### 
router.post('/login', function (req, res) {	
	console.log('login')
	const dat = req.body

	if( !MyAuth.auth(dat)) {
		res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
		return
	}
	//console.log('')

	res.status(200).send(JSON.stringify(MyAuth.clientsKey))

})

//###################### 
module.exports = router

