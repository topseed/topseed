'use strict'

class ApiConfig {
	get PORT() { return 8081 }
	get DB_URL() { return 'https://topseed0-d5e0b.firebaseio.com' }
	get REQUIRE_AUTH() { return { news: [/*'read', 'write'*/],
								  other: ['read','write']} } 
	get BASIC_AUTH_USER() { return { username: 'admin', password: 'admin' } } 							  
	
} module.exports = ApiConfig