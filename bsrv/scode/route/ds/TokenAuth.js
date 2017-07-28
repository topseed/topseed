class TokenAuth { 

	static authPromise(credential_){

		let credential = {}
		try {
		 	credential = JSON.parse(credential_)
		} catch(err) {
			credential = credential_
		}

		console.log('')	

		//In real life, we might do an asynchronous call to an authentication service or database
		//Here we just match to ApiConfig.TOKEN_AUTH_USER. 
		//Typically, a user has been added to a database during registration.
		//When registering a user, you can use npm bcrypt as follows:
		//var encryptedPw = bcrypt.hashSync(user.password, 14)
		//user.password = encryptedPw
		//Then below, when you've retrieved the user from the db, you can test with:
		//var passwordMatches = bcrypt.compareSync(credential.password, user.password)

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

	//In real life, tokens would likely be more advanced.
	//Encoded, expiring, and checked in relation to individual user credentials.
	//Here we just show the flow, and simply match to "abc". 
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