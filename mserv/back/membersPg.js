'use strict'
const express = require('express')
const router = express.Router()

const fake = require('./fake')
const AUTH = require('./auth')

//methods ###################### 
router.all('/join', function (req, res) {
	console.log(req.body)
	const obj = req.body

	const pro = AUTH.authUser(obj.userEmail, obj.password)
	pro.then(function(tok){
		console.log(tok)
		res.status(200).send(JSON.stringify(tok))
	}).catch(function(err){
		console.log(err)
		res.status(200).send(JSON.stringify(err))
	})
})

router.all('/list', function (req, res) {
	const ret = fake._fakeDW()
	res.status(200).send(JSON.stringify(ret))
})

router.all('/mem', function (req, res) {
	const ret = fake._fakeBind()
	res.status(200).send(JSON.stringify(ret))
})

//###################### 
module.exports = router