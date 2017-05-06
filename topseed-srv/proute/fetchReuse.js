
//demo only
var fetch = require('node-fetch')
const BDS = require('./' + ServerConfig.WEBROOT + '/_js/BDS')

const ROOT = 'http://jsonplaceholder.typicode.com/'
class Page1BDS extends BDS {
	doFetch() {
		return BDS.fetch(fetch, ROOT, 'comments')
			.then(function(value) { 
				console.log('back')
				console.log(JSON.stringify(value))
				return value
		})//BDS
	}//doFetch
}//class

const _BDS = new Page1BDS()
if(true) {
	const pro = _BDS.doFetch()
	pro.then(function(val) {
		console.log(val)
	}).catch(function (er) {
		console.log(er)
	})//c
}