const fs = require('fs')
const useragent = require('useragent')
const isj = require('is_js')

useragent(true)

// ###################### middle filter
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
	if(isj.not.existy(path)) path = ''
	path = ROOT + req.baseUrl + path//***** */
	//console.log(path)

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

//**************** */
console.log('AF v17.02a')
exports.filter = function (req, res, next) {
	setLong(res) // default is long, later we set to quick if needed
	//console.log('->')
	
	if (req.path.indexOf('.') >0 ) { // hasDot?
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
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
				fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
					ifError(err, 'amp', res)
					res.send(data)
				})// readfile
			} //else AMP
		} catch(err) {
			ifError(err, 'catch', res)
		}
		//console.log('<-')
	} // else it is a path

}//()

