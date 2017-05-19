'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const News = require('./ds/News')
const news = new News()

//###################### 
router.get('/', function (req, res) {	
	const dat = req.body
	console.log('selectList')
	const _promise = news.selectList()
	_promise.then(function(rows){
		res.status(200).send(JSON.stringify(rows))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/', function (req, res) {	
	
	const jt = MyAuth.getJToken(req)
	if( !MyAuth.auth(jt)) {
		res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
		return
	}

	const row = req.body
	const _promise = news.update(row)
	_promise.then(function(data){
		console.log('NewsAPI.data:'+ data)
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
