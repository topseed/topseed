const express = require('express')
const router = express.Router()

const isj = require('is_js')
const useragent = require('useragent')
const fetch = require('node-fetch')
const jsrender = require('jsrender')
const fs = require('fs')

// /////////////////////////////////////////////////////

const ROOT = './www'
const SPA = 'spa.html'
const AMP = 'amp.html'
const INDEX = 'index.html'

function setNone(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
}
function setQuick(res) {//3hr, 10 minutes
	res.header('Cache-Control', 'public, s-maxage=10800, max-age=600, proxy-revalidate')
}
function setLong(res) {//23 hours, 1hr
	res.header('Cache-Control', 'public, s-maxage=82800, max-age=3600')
}

const _slash = '/'
function endsWithSlash(str ) {
	if(isj.endWith(str,_slash)) 
		return str
	return str+_slash
}
function ifError(err, msg, res) {
	if(err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}
function getPath(req) {
	let path = req.path
	path = ROOT + req.baseUrl + path//***** */
	console.log(path)

	path = path.replace('undefined/','')
	path = path.replace('undefined','')
	path = endsWithSlash(path)
	return path
}
function isW(req) { // should we serve SPA or mobile/AMP?
	if(req.path.startsWith('/w/')) return true
	if(req.subdomains.indexOf('www') > -1)  return true
	if(req.socket.localPort == 8082) return true
	if(req.query.w == '1') return true
	return false
}

//************** */
router.get('/dBind0Ren', function (req, res) {	
	setLong(res) // default is long, later we set to quick if needed
	console.log('->')

	try {
		var agent = useragent.lookup(req.headers['user-agent'])
		console.log(agent.toAgent())
		res.header('Content-Type', 'text/html')

		const pgPath = getPath(req)
		const isWWWW = isW(req)
		console.log(pgPath + ' ^ ' + isWWWW)

		if (fs.existsSync(pgPath + INDEX)) {// this is not compliant to SPA|AMP
			fs.readFile(pgPath + INDEX, 'utf8', function(err, data) {
				ifError(err, 'index', res)
				res.send(data)
			})				
		} else if(isWWWW) {//is it SPA/www? 
			fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
				ifError(err, 'spa', res)
				res.send(data)
			})
		} else { //AMP is default
			setQuick(res)
			console.log('amp')
			fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
				ifError(err, 'amp', res)

				bind(data,res)

			})// readfile
		} //else AMP
	} catch(err) {
		ifError(err, 'catch', res)
	}
	console.log('<-')

})

function bind(data, res) {
	let tmpl = jsrender.templates(data)
	console.log('bind')
	fetch('https://middle4top-vgylwtpbxs.now.sh/membersPg/mem/', { //1 call
		method: 'post'
		}).then(function(response) { //2 promise
			return (response.json())
		}).then(function(value) { //3
			// your code here
			console.log('back')
			console.log(JSON.stringify(value))
			let html2 = tmpl.render( value )

			let pro = renComps(html2) // optional: scomps
			pro.then(function(output){
				//res.send(output) // enable for comps
			})
			res.send(html2) //disable for comps

		}).catch(function(err) {
			ifError(err, 'catchBind', res)
	})//fetch()
}

//###################### 
module.exports = router

//***** comp */
const comps = require('server-components')
var SComp1 = comps.newElement()
SComp1.createdCallback = function () {
	this.innerHTML = 'Hi there'
}
comps.registerElement('s-comp1', { prototype: SComp1 })
function renComps(html) {
	console.log('comps')
	let pro =  comps.renderPage(html)
	return pro
}
console.log('comps read')