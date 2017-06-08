const express = require('express')
const router = express.Router()

const isj = require('is_js')
const fetch = require('node-fetch')
const fs = require('fs')
const riot = require('riot')
const cheerio = require('cheerio') //$ jQ

const C = require('../config/ServerConfig')
const ServerConfig = new C()
const Util = require('topseed-util')
const U = new Util() 
// /////////////////////////////////////////////////////

let ROOT = './' + ServerConfig.WEBROOT
const SPA = 'index.html'
const AMP = 'indexA.html'
const INDEX = 'index.html'


//************** */
router.get('/dBindSSR', function (req, res) {	
	U.cacheLong(res) // default is long, later we set to quick if needed
	console.log('->')

	try {
		console.log(agent.toAgent())
		res.header('Content-Type', 'text/html')

		const pgPath = U.getPath(ROOT,req)
		const isWWWW = U.isW(req)
		console.log(pgPath + ' ^ ' + isWWWW)

		if (fs.existsSync(pgPath + INDEX)) {// this is not compliant to SPA|AMP
			fs.readFile(pgPath + INDEX, 'utf8', function(err, data) {
				U.ifError(err, 'index', res)
				res.send(data)
			})				
		} else if(isWWWW) {//is it SPA/www? 
			fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
				U.ifError(err, 'spa', res)
				res.send(data)
			})
		} else { //AMP is default
			U.cacheQuick(res)
			console.log('amp')
			fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
				U.ifError(err, 'amp', res)

				bind(data,res)

			})// readfile
		} //else AMP
	} catch(err) {
		U.ifError(err, 'catch', res)
	}
	console.log('<-')

})

//tags: /////////////////////////////////////////////////////
const dbindComp = require('../' + ServerConfig.WEBROOT + '/_uiComps/d-bind.tag')

function bind(data, res) {

	let $ = cheerio.load(data)//page

	fetch('https://topseed.now.sh/membersPg/mem/', { //1 call
		method: 'post'
		}).then(function(response) { //2 promise
			return (response.json())
		}).then(function(value) { //3
			// your code here
			console.log('back')
			//console.log(JSON.stringify(value))

			const bound = riot.render(dbindComp, {users: value}) // we have a component
			$('d-bind').replaceWith(bound) //find the tag and replace w/ bound
			res.send($.html()) 

		//}).catch(function(err) {
		//	ifError(err, 'catchBind', res)
	})//fetch()
}

//###################### 
module.exports = router
