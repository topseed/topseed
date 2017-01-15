
'use strict'

const express = require('express')
const router = express.Router()

const fake = require('./backend/fake')

//methods ###################### 
router.post('/list', function (req, res) {
	var ret = fake._fakeBackCall()
	res.status(200).send(JSON.stringify(ret))
})

//###################### 
module.exports = router