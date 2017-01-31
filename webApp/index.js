'use strict'
const fetch = require('node-fetch')
const express = require('express')
const server = express()
//const path = require('path')
const fs = require('fs')

const jsrender = require('jsrender')
const AFilter = require('./util/AFilter')

// ###################### dynamic data for some pgs here:
server.get('/members/dBindEx/', function (req, res) {
	const containsWWWW = (req.subdomains.indexOf('www') > -1) //for subdomain
	const isWWWW = (req.query.w == '1') || containsWWWW

	if(isWWWW) //is it SPA/www? 
		fs.readFile('./www//members/dBindEx/spa.html', 'utf8', function(err, data) {
			res.send(data)
		})
	else { //AMP
		fs.readFile('./www//members/dBindEx/amp.html', 'utf8', function(err, data) {
			if (err) throw err
			// js render
			let tmpl = jsrender.templates(data)
			fetch('https://rch-demo.appspot.com/membersPg/mem/', { //1 call
				method: 'get'
				}).then(function(response) { //2 promise
					return (response.json())
				}).then(function(value) { //3
					// your code here
					console.log('back')
					console.log(JSON.stringify(value))
					let html2 = tmpl.render( value )
					res.send(html2)
				}).catch(function(err) {
					console.log('error')
					console.log(err)
			})//fetch()
		})// readfile
	} //else

})//()

// ###################### static
server.use(AFilter.filter)
server.use(express.static('www'))

//###################### start the server
const PORT = 8080
server.listen(PORT, '0.0.0.0', function() {
	console.log('App listening on port')
	console.log('Press Ctrl+C to quit.')
})
 
