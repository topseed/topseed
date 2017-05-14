'use strict'
const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util()
const Links = require('./ds/Links')
const links = new Links()

//###################### 
router.all('/list', function (req, res) {	
	const dat = req.body
	console.log('list')
	const pro = links.listAll()
	pro.then(function(rows){
		res.status(200).send(JSON.stringify(rows))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
