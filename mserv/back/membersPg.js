'use strict'
const express = require('express')
const router = express.Router()

const fake = require('./fake')

//methods ###################### 
router.all('/list', function (req, res) {
	var ret = fake._fakeDW()
	res.status(200).send(JSON.stringify(ret))
})

router.all('/mem', function (req, res) {
	var ret = fake._fakeBind()
	res.status(200).send(JSON.stringify(ret))
})

//###################### 
module.exports = router