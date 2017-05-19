'use strict'

class ServerConfig {
	get PORT() { return 8081 }
	get DB_URL() { return 'https://topseed0-d5e0b.firebaseio.com' }
	get BLOG_API() { return 'http://localhost:8081' }
	
} module.exports = ServerConfig