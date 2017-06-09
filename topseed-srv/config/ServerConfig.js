'use strict'

class ServerConfig {
	get WEBROOT() {return 'topseed-webroot'}
	get WWW_PORT() {return 8091}
	get AMP_PORT() {return 8092}
	get WEB_SUBDOMAIN() {return 'www'}
	get AMP_SUBDOMAIN() {return 'm'} 
	get AMP_IS_DEFAULT() {return false}
} module.exports = ServerConfig