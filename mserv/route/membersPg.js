"use strict";
const express = require('express');
const router = express.Router();
const DATA = require('./data');
const AUTH = require('./auth');
router.post('/join', function (req, res) {
	console.log(req.body);
	const obj = req.body;
	const pro = AUTH.authUser(obj.userEmail, obj.password);
	pro.then(function (tok) {
		console.log(tok);
		res.status(200).send(JSON.stringify(tok));
	}).catch(function (err) {
		console.log(err);
		res.status(200).send(JSON.stringify(err));
	});
});
router.post('/list', function (req, res) {
	const ret = DATA.fakeDW();
	res.status(200).send(JSON.stringify(ret));
});
router.post('/mem', function (req, res) {
	const ret = DATA.fakeRender();
	res.status(200).send(JSON.stringify(ret));
});
module.exports = router;
