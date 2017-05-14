
class MyAuth {//should return promise
	static auth(jtoken) {// is json
		let token = {}
		try {
		 	token = JSON.parse(jtoken)
		} catch(err) {
			token = jtoken
		}
		console.log('auth',token)
		if('vic'== token.user && '123' == token.password)
			return true
		return false
	}

	static get clientsKey() {//could be encoded, or ignore first char on use
		return 'abc'
	}

	static getJToken(req) { // get the token from client's fetch
		return req.get('X-JToken')
	}
}
module.exports = MyAuth 