"use strict"
const jwts = require('jsonwebtoken')

const SIK = 'company_secret_code'
function insertUser(userEmail, password) {
	console.log('insert', userEmail)
}
function requestCodeValidation(userEmail) {
	console.log('code', userEmail)
}
function checkCodeValidation(userEmail, code) {
	console.log('check', userEmail)
}
function checkPassword(userEmail, password) {
	console.log('pswd', userEmail)
	const promise = new Promise(function (resolve, reject) {
		if ('123' == password) {
			resolve(true)
		}
		else {
			resolve(false)
		}
	})
	return promise
}
function updatePasswordCodeValidation(userEmail, code, newPassword) {
}
function listUsers() {
}
function userDetails(pk) {
}
function updateUser(pk) {
}

function authUser(userEmail, password) {
	const dsCheck = checkPassword(userEmail, password)
	const promise = new Promise(function (resolve, reject) {
		dsCheck.then(function (dsCheckOK) {
			if (dsCheckOK) {
				let auth = {
					userEmail: userEmail,
					foo: 'bar'
				}
				const token = jwts.sign(auth, SIK)
				resolve(token)
			}
			else {
				reject('bad username|password')
			}
		})
	})
	return promise
}

exports.authUser = authUser
function authToken(token) {
	const promise = new Promise(function (resolve, reject) {
		jwts.verify(token, SIK, function (err, decoded) {
			if (err)
				reject('bad token')
			else {
				let auth = {
					foo: 'bar'
				}
				const token = jwts.sign(auth, SIK)
				resolve(token)
			}
		})
	})
	return promise
}

exports.authToken = authToken
