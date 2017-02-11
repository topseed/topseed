const fs = require('fs')

// ###################### middle filter
const ROOT = './www'
const SPA = 'spa.html'
const AMP = 'amp.html'
const INDEX = 'index.html'

function endsWithSlash(str ) {
	let suffix = '/'
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function setNone(res) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
}
function setQuick(res) {//2hr, 45 minutes
	res.header('Cache-Control', 'public, s-maxage=7200, max-age=2700, proxy-revalidate')
}
function setLong(res) {//20hours, 2hr
	res.header('Cache-Control', 'public, s-maxage=72000, max-age=7200')
}

exports.filter = function (req, res, next) {
	setLong(res)
	if (req.path.indexOf('.') !=-1) { // hasDot?
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			const pgPath = ROOT + req.path
			let containsWWWW = (req.subdomains.indexOf('www') > -1) //for subdomain
			if(req.socket.localPort == 8082) containsWWWW = true
			const isWWWW = (req.query.w == '1') || containsWWWW
			
			console.log(pgPath + ' ^ ' + isWWWW)

			if(!endsWithSlash(req.path)) {
				res.redirect(req.path + '/')
			} else if (fs.existsSync(pgPath + INDEX)) {// this is not compliant to SPA|AMP
				console.log(pgPath + INDEX)
				fs.readFile(pgPath + INDEX, 'utf8', function(err, data) {
					if(err)  {
						console.log(err)
						res.redirect('/index.html')// error - go home
					}
					res.send(data)
				})				
			} else if(isWWWW) {//is it SPA/www? 
				fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
					if(err)  {
						console.log(err)
						res.redirect('/index.html')// error - go home
					}
					res.send(data)
				})
			} else { //AMP is default
				setQuick(res)
				fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
					if(err)  {
						console.log(err)
						res.redirect('/index.html')// error - go home
					}
					res.send(data)
				})// readfile
			} //else AMP
		} catch(err) {
			console.log(err)
			res.redirect('/index.html')// error - go home
		}
	} // else it is a path

}//()

