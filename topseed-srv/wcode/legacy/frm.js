'use strict'
const express = require('express')
const router = express.Router()

//###################### 

//https://stackoverflow.com/questions/18524125/request-query-and-request-param-in-expressjs
router.get('/', function (req, res) {
	console.log('legacy frm')
	console.log(req.query)

	const red = '/legacyFrm/thx.html'
	res.redirect(red)

})//get



//###################### 
module.exports = router