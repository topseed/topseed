'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const Links = require('./ds/Links')
const links = new Links()
const MyAuth = require('./ds/MyAuth')


//###################### 
router.post('/add', function (req, res) {	
	console.log('add')

	const jt = MyAuth.getJToken(req)
	if( !MyAuth.auth(jt)) {
		res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
		return
	}

	const dat = req.body
	const pro = links.add(dat)
	pro.then(function(data){
		console.log('AdminPg.data:'+data)
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router

