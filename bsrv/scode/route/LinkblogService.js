'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const Linkblog = require('./ds/Linkblog')
const linkblog = new Linkblog()

const TokenAuth = require('./ds/TokenAuth')

//###################### 
router.get('/', function (req, res) {	
	
	/*if (ApiConfig.REQUIRE_AUTH.linkblog.includes('read')) {

		const jt = TokenAuth.getJToken(req)
		if( !TokenAuth.isTokenValid(jt)) {
			console.log('Auth failed on select')
			res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
			return
		}
	}*/

	if (req.query.pk != null)
	{
		console.log('LinkblogService select')
		const _rowPromise = linkblog.select(req.query.pk)
		_rowPromise.then(function(row){
			res.status(200).send(JSON.stringify(row))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
	else
	{
		console.log('LinkblogService selectList')
		const _listPromise = linkblog.selectList()
		_listPromise.then(function(rows){
			res.status(200).send(JSON.stringify(rows))
		}).catch(function (er) {
			U.err(er,res)
		})//c
	}
})

router.post('/', function (req, res) {

    console.log('LinkblogService insert via post')

	if (ApiConfig.REQUIRE_AUTH.linkblog.includes('write')) {
		const jt = TokenAuth.getJToken(req)
		if (!TokenAuth.isTokenValid(jt)) {
			console.log('Auth failed on update')
			res.status(403).send(JSON.stringify('Auth required, IP Logged')).end()
			return
		}
	}

	const row = req.body
	const _promise = linkblog.update(row)
	_promise.then(function(data){
		console.log('LinkblogService.data:'+ data)
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
