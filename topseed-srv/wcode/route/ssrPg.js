'use strict'
const express = require('express')
const router = express.Router()
const Util = require('topseed-util')

const BLXA = require('./ssrBLXAction')
const BL = new BLXA()

const BLXAD0 = require('./ssrBLXActionD0')
const BLD0 = new BLXAD0()

//###################### 

router.get('/', function (req, res) {	
	console.log('ssr')


	/*
	BL.renderPage(req) // comp
		.then(function (html) {
			res.status(200).send(html)
		})
	*/

	
	var html = BLD0.renderPage(req) // dbind
	res.status(200).send(html)


})//get



//###################### 
module.exports = router