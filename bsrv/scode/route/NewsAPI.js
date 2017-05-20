'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const News = require('./ds/News')
const news = new News()

const MyAuth = require('./ds/MyAuth')

//###################### 
router.get('/', function (req, res) {	
	
	if (ApiConfig.REQUIRE_AUTH.news.includes('read')) {

		const jt = MyAuth.getJToken(req)
		if( !MyAuth.auth(jt)) {
			console.log('Auth failed on select')
			res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
			return
		}
	}

	if (req.query.pk != null)
	{
		//console.log('NewsAPI select')
		const _rowPromise = news.select(req.query.pk)
		_rowPromise.then(function(row){
			res.status(200).send(JSON.stringify(row))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
	else
	{
		//console.log('NewsAPI selectList')
		const _listPromise = news.selectList()
		_listPromise.then(function(rows){
			res.status(200).send(JSON.stringify(rows))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
})

router.post('/', function (req, res) {	
	
	if (ApiConfig.REQUIRE_AUTH.news.includes('write')) {

		const jt = MyAuth.getJToken(req)
		if( !MyAuth.auth(jt)) {
			console.log('Auth failed on update')
			res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
			return
		}
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

router.delete('/', function (req, res) {	
	
	if (ApiConfig.REQUIRE_AUTH.news.includes('write')) {

		const jt = MyAuth.getJToken(req)
		if( !MyAuth.auth(jt)) {
			console.log('Auth failed on delete')
			res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
			return
		}
	}

	const row = req.body
	const _deletePromise = news.delete(row)
	_deletePromise.then(function(data){
		console.log('NewsAPI.data:'+ data)
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
