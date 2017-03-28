const fs = require('fs')
const useragent = require('useragent')
const isj = require('is_js')
const Util = require('topseed-util')
const U = new Util() 

const C = require('../config/ServerConfig')
const ServerConfig = new C()

useragent(true)

// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT
const SPA = 'index.html'
const AMP = 'indexA.html'

function serveAmp(req) { // should we serve mobile/AMP
	//if (req.path.startsWith('/home/')) return !ServerConfig.AMP_IS_LANDING
	//if (req.socket.localPort == 8082) return ServerConfig.AMP_IS_LANDING
	if (req.subdomains.indexOf(ServerConfig.WEB_SUBDOMAIN) > -1)  return ServerConfig.AMP_IS_LANDING
	if (req.subdomains.indexOf(ServerConfig.AMP_SUBDOMAIN) > -1)  return true
	if (req.query.w == '1') return false
	if (req.query.a == '1') return true
	return ServerConfig.AMP_IS_LANDING
}

//**************** */
console.log('AF v17.021a')
exports.decide = function (req, res, next) {
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed
	//console.log('Decider ->')
	
	if (req.path.indexOf('.') >0 ) { // hasDot?
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			var agent = useragent.lookup(req.headers['user-agent'])
			console.log(agent.toAgent())
			res.header('Content-Type', 'text/html')

			const pgPath = U.getPath(ROOT,req)
			const isAmp = serveAmp(req)
			console.log(pgPath + ' ^ serve amp:' + isAmp)
			console.log('exists:'+pgPath + AMP)

			if (isAmp && fs.existsSync(pgPath + AMP)) { //AMP
				
				console.log('found '+pgPath + AMP)
				U.cacheQuick(res)
				fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
					U.ifError(err, 'amp', res)
					res.send(data)
				})// readfile
			} else { //non-amp
				fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
					U.ifError(err, 'spa', res)
					res.send(data)
				})
			} 
		} catch(err) {
			U.ifError(err, 'catch', res)
		}
		//console.log('<-')
	} // else it is a path

}//()

