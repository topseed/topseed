// http://cloud.google.com/datastore/docs/datastore-api-tutorial
// http://cloud.google.com/datastore/docs/concepts/entities
// http://cloud.google.com/datastore/docs/concepts/queries
'use strict';
const DATASTORE = require('@google-cloud/datastore')
const jwts = require('jsonwebtoken')

const SIK = 'company_secret_code' // secret to change
////////////////////////////////
//sign up
function insertUser(userEmail, password) {
	console.log('insert',userEmail)
}
function requestCodeValidation(userEmail) {// emails or txts random code, clears validated flag
	console.log('code', userEmail)
}
function checkCodeValidation(userEmail, code) {// checks code, fails or sets validated flag
	console.log('check', userEmail)
}
function checkPassword(userEmail, password) {//if exists and validated: true, else false
		console.log('pswd', userEmail)
	const promise = new Promise(function(resolve, reject){
		//ds call
		if('123' == password) { //good
			resolve(true)
		} else {
			resolve(false)
		}
	})//pro
	return promise
}
//request password change section Page: 1. requestCodeValidation, 2. updatePasswordCodeValidation
function updatePasswordCodeValidation(userEmail, code, newPassword) {// checks code and update password or fail

}
// admin/maint section:
function listUsers() {
}
function userDetails(pk) {
}
function updateUser(pk) {// role: admin
}

// auth section ////////////////////////////

exports.authUser= function(userEmail, password) { // you can use this(A)
	const dsCheck = checkPassword(userEmail, password) // data service call
	const promise = new Promise(function(resolve, reject){
		//ds call
		dsCheck.then(function(dsCheckOK) {
			if(dsCheckOK) { //good
				let auth = { 
						userEmail: userEmail
						,foo: 'bar' 
					}
				const token = jwts.sign(auth,SIK)
				resolve(token)
			} else {
				reject('bad username|password')
			}
		})//dsCheck
	})//pro
	return promise
}//()
function authToken(token) { // or this(B) on other than 2 call
	const promise = new Promise(function(resolve, reject){
		jwts.verify(token, SIK, function(err, decoded) {
			if(err) // bad token
				reject('bad token')
			else { //good:
				let auth = {
					foo: 'bar' 
				}
				const token = jwts.sign(auth,SIK)
				resolve(token)
			}
		})//verify()
	})//pro
	return promise
}//()

// tst //////////////////////
/*
const tp0 = authUser('x','1234')
tp0.then(function(tok){
	console.log(0)
	console.log(tok)
}).catch(function(err){
	console.log(0)
	console.log(err)
})

if(true) return
let auth = { 
	foo: 'bar' 
}
const token1 = jwts.sign(auth,SIK)
const tokenB = 'bad'
const tp1 = authToken(tokenB)
tp1.then(function(tok){
	console.log(1)
	console.log(tok)
}).catch(function(err){
	console.log(1)
	console.log(err)
})
*/