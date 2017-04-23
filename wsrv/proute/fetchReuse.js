
//demo only
var fetch = require('node-fetch')
const CDS = require('./webroot/_js/CDS')

const ROOT = 'http://jsonplaceholder.typicode.com/'
class Page1CDS extends CDS {
	doFetch() {
		return CDS.fetch(fetch, ROOT, 'comments')
			.then(function(value) { 
				console.log('back')
				console.log(JSON.stringify(value))
				return value
		})//CDS
	}//doFetch
}//class

const _cds = new Page1CDS()
if(true) {
	const pro = _cds.doFetch()
	pro.then(function(val) {
		console.log(val)
	}).catch(function (er) {
		console.log(er)
	})//c
}