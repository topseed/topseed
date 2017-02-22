
	function isW(req) { // should we serve SPA or mobile/AMP?
		if(req.path.startsWith('/w/')) return true
		if(req.subdomains.indexOf('www') > -1)  return true
		if(req.socket.localPort == 8082) return true
		if(req.query.w == '1') return true
		return false
	}