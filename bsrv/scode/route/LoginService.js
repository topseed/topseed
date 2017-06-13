'use strict'
const express = require('express')
const router = express.Router()

//const Util = require('topseed-util')
//const U = new Util()
const TokenAuth = require('./ds/TokenAuth')

router.post('/', function (req, res) {	
	
	const credential = req.body
	
	TokenAuth.authPromise(credential).then(function (result){
		//On success, return a generated unique clientsKey
		//here it's simply 'abc'
		res.status(200).send(TokenAuth.ClientsKey)
		return
	}).catch(function (err){
		res.status(403).send(JSON.stringify(err.message)).end()
		return
	}) 
	
	/*if( !TokenAuth.auth(credential)) {
		res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
		return
	}
	//console.log('login successful, return '+TokenAuth.ClientsKey)

    //If successful, return a generated unique clientsKey, here it's simply 'abc'
	res.status(200).send(TokenAuth.ClientsKey) */

})

//###################### 
module.exports = router