const express = require('express')
const router = express.Router()

const fetch = require('node-fetch')
const jsrender = require('jsrender')
const fs = require('fs')
// /////////////////////////////////////////////////////

function setNone(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
}
function setQuick(res) {//3hr, 10 minutes
	res.header('Cache-Control', 'public, s-maxage=10800, max-age=600, proxy-revalidate')
}
function setLong(res) {//23 hours, 1hr
	res.header('Cache-Control', 'public, s-maxage=82800, max-age=3600')
}
function ifError(err, msg, res) {
	if(err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		return true
	} else return false
}
function getPath(req) {
	let path = req.path
	path = path.replace('undefined/','')
	path = path.replace('undefined','')
	return path
}
function isW(req) { // should we serve SPA or mobile/AMP?
	if(req.path.startsWith('/w/')) return true
	if(req.subdomains.indexOf('www') > -1)  return true
	if(req.socket.localPort == 8082) return true
	if (req.query.w == '1') return true
	return false
}

router.post('/dBind0Ren', function (req, res) {	
	setLong(res) // default is long, later we set to quick if needed
	console.log('->')
	console.log(req.originalUrl)
	console.log(req.path)
	try {
		var agent = useragent.lookup(req.headers['user-agent'])
		console.log(agent)
		res.header('Content-Type', 'text/html')

		const path = getPath(getPath(req))
		const pgPath = ROOT + path
		const isWWW = isW(req) 
		console.log(pgPath + ' ^ ' + isWWWW)

		if(!endsWithSlash(path)) {
			res.redirect(path + '/')
		} else if(isWWWW) {//is it SPA/www? 
			fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
				ifError(err, 'spa', res)
				res.send(data)
			})
		} else { //AMP is default
			setQuick(res)
			fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
				ifError(err, 'amp', res)

				bind(data, res) // bind the data

				res.send(data)
			})// readfile
		} //else AMP
	} catch(err) {
		ifError(err, 'catch', res)
	}
	console.log('<-')

})

function bind(data) {
	let tmpl = jsrender.templates(data)
	fetch('http://45.55.201.250:8083/membersPg/mem/', { //1 call
		method: 'post'
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
}

//###################### 
module.exports = router