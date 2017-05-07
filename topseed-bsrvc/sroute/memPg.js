'use strict'
const express = require('express')
const router = express.Router()
const DS = require('./ds')

router.all('/list', function (req, res) {
	const ret = DS.dummyData()
	res.status(200).send(JSON.stringify(ret))
})

module.exports = router
