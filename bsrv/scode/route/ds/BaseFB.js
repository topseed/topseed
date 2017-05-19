'use strict'
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

const fb = firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: bsrvConfig.DB_URL
})
//var fAuth = fb.auth()

class BaseFB {
	constructor(db_) {
		this.fdb = fb.database()
	}

	static toArray(ra){
		var array=[]
		for(var key in ra){
			array.push(ra[key])
		}
		return array
	}//()

}
module.exports = BaseFB 