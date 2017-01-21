const fs = require('fs')

// ###################### middle filter
const ROOT = './www'
const SPA = 'spa.html'
const AMP = 'amp.html'
const INDEX = 'index.html'

// nvm use 7.4.0 
// forever start index.js

exports.filter = function (req, res, next) {
	if (req.path.indexOf('.') !=-1) { // hasDot?
		next() // it is static
	} else { // no dot, it is a path:
		try {
			const pgPath = ROOT + req.path
			const containsWWWW = (req.subdomains.indexOf('www') > -1) //for subdomain
			const isWWWW = (req.query.w == '1') || containsWWWW
			console.log(pgPath + ' ^ ' + isWWWW)

			if (fs.existsSync(pgPath + INDEX)) {// this is not compliant to SPA|AMP
				console.log(pgPath + INDEX)
				fs.readFile(pgPath + INDEX, 'utf8', function(err, data) {
					res.send(data)
				})				
			} else if(isWWWW) //is it SPA/www? 
				fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
					res.send(data)
				})
			else { //AMP is default
				fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
					res.send(data)
				})// readfile
			} //else AMP
		} catch(err) {
			console.log(err)
			res.redirect('/index.html')// error - go home
		}
	} // else it is a path

}//()
