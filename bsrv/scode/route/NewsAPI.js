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
	
	console.log('NewsAPI req.query.pk'+req.query.pk)
	//console.log('NewsAPI req.queryString'+req.queryString)
	

	if (req.query.pk != null)
	{
		console.log('NewsAPI select')
		const _rowPromise = news.select(req.query.pk)
		_rowPromise.then(function(row){
			res.status(200).send(JSON.stringify(row))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
	else
	{
		console.log('NewsAPI selectList')
		const _listPromise = news.selectList()
		_listPromise.then(function(rows){
			res.status(200).send(JSON.stringify(rows))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
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
