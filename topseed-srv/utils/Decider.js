const fs = require('fs')
const useragent = require('useragent')
const isj = require('is_js')
const Util = require('topseed-util')
const U = new Util() 

useragent(true)

// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT
const SPA = 'index.html'
const AMP = 'indexA.html'

const _slash = '/'
function endsWithSlash(str ) {
	if (isj.endWith(str,_slash)) 
		return str
	return str+_slash
}

function getQueryString(req) {
	let queryString = req.queryString
	console.log('queryString'+queryString)
	return queryString;
}


function ifError(err, msg, res) {
	if (err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}


function serveAmp(req) { 
	if (req.socket.localPort == ServerConfig.WWW_PORT) return true
	if (req.socket.localPort == ServerConfig.AMP_PORT) return false

	if (req.subdomains.indexOf(ServerConfig.WWW_SUBDOMAIN) > -1)  return ServerConfig.AMP_IS_DEFAULT
	if (req.subdomains.indexOf(ServerConfig.AMP_SUBDOMAIN) > -1)  return true
	if (req.query.w == '1') return false
	if (req.query.a == '1') return true
	return ServerConfig.AMP_IS_DEFAULT
}

//**************** */
exports.decide = function (req, res, next) {
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed
	//console.log('Decider ->')
	
	if (req.path.indexOf('.') > 0 ) { // hasDot?

		if (req.path.indexOf('.mf') > 0)
			U.cacheNone(res);

		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			const pgPath = U.getPath(ROOT,req)
			const returnAmp = serveAmp(req)
			console.log('requested:'+pgPath + ' ^ serve amp:' + returnAmp)
			const requestedResource = pgPath + (returnAmp?AMP:SPA);
			const fallbackResource = pgPath + (returnAmp?SPA:AMP);

			res.header('Content-Type', 'text/html')
			U.cacheQuick(res)
			
			//attempt to get the requested version, show the other version if not exists
			if (fs.existsSync(requestedResource)) { 
				console.log('found '+requestedResource)
				fs.readFile(requestedResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'amp':'spa', res)
					res.send(data)
				})// readfile
			} else { //the other version
				fs.readFile(fallbackResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'spa':'amp', res)
					res.send(data)
				})
			}

		} catch(err) {
			ifError(err, 'catch', res)
		}
	}

}//()

