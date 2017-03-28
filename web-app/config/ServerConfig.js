'use strict'

class ServerConfig {
	get WEBROOT() {return 'helloworld-webroot'}
	get PORT() {return 8081}
	get WEB_SUBDOMAIN() {return 'www'}
	get AMP_SUBDOMAIN() {return 'www'} //change AMP_SUBDOMAIN to m if in DNS
	get AMP_IS_DEFAULT() {return true}
} module.exports = ServerConfig