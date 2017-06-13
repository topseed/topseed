class TokenAuth { 

	static authPromise(credential_){

		let credential = {}
		try {
		 	credential = JSON.parse(credential_)
		} catch(err) {
			credential = credential_
		}

		//Match to ApiConfig.TOKEN_AUTH_USER. Replace with call to DB etc.
		return new Promise(function (resolve, reject){
			if (!credential_)
				reject(new Error('Credentials incomplete'))
			else if (ApiConfig.TOKEN_AUTH_USER.username == credential.user 
				  && ApiConfig.TOKEN_AUTH_USER.password == credential.password)
				resolve(JSON.stringify('OK'))
			else	
				reject(new Error('Unable to authenticate'))
		})	
	}

	static get ClientsKey() {//could be encoded, or ignore first char on use
		return JSON.stringify('abc')
	}

	//Match to "abc". Replace with more advanced token (e.g. JWT, OAuth2 etc)
	static isTokenValidPromise(token) {
		return new Promise(function (resolve, reject){
			if (TokenAuth.ClientsKey == token)
				resolve(JSON.stringify('OK'))
			else	
				reject(new Error('Invalid token'))
		})	
	}

	static getJToken(req) { // get the token from client's fetch
		const jtoken = req.get('X-JToken')
		return jtoken
	}
}
module.exports = TokenAuth 