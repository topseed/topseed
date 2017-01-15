'use strict'

const express = require('express')
const router = express.Router()


// local filter ###################### 
router.use(function timeLog (req, res, next) {
	console.log('Time: ', Date.now())
	next()
})

router.get('/logout', function (req, res) {
	res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
	return res.sendStatus(401)
})

//###################### 
module.exports = router