const fs = require('fs')
const useragent = require('useragent')
const isj = require('is_js')
const Util = require('topseed-util')
const U = new Util() 

useragent(true)

// ###################### middle filter
const ROOT = './webroot' 
const SPA = 'index.html'
const AMP = 'indexA.html'


function serveAmp(req) { 
if (req.socket.localPort == 8082) return true
		else 
	return false
}

//**************** */
exports.decide = function (req, res, next) {
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed
	//console.log('Decider ->')
	
	if (req.path.indexOf('.') >0 ) { // hasDot?
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {
			res.header('Content-Type', 'text/html')

			const pgPath = U.getPath(ROOT,req)
			const isAmp = serveAmp(req)

			console.log(isAmp,pgPath)

			if (isAmp && fs.existsSync(pgPath + AMP)) { //AMP
				
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

