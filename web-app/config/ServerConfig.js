'use strict'

class ServerConfig {
	get WEBROOT() {return 'webroot'}
	get PORT() {return 8081}
	get WEB_SUBDOMAIN() {return 'www'}
	get AMP_SUBDOMAIN() {return 'm'} //change AMP_SUBDOMAIN to m if in DNS
	get AMP_IS_LANDING() {return true} // default is not clear, landing page is clear
} module.exports = ServerConfig