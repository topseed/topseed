'use strict'

class ApiConfig {
    get PORT() { return 8081 }
	get DB_URL() { return 'https://mydb1-7b77e.firebaseio.com' }
	get WEBROOT() { return 'public'}
	get REQUIRE_AUTH() { return { linkblog: [/*'write'*/],
								  other: ['read','write']} } 
	get TOKEN_AUTH_USER() { return {username: 'demo', password: 'demo' } } 
} module.exports = ApiConfig