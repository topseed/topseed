'use strict'
const firebase = require("firebase-admin")
//const serviceAccount = require("./serviceKey.json")
const serviceAccount = require("./mydb1-7b77e-firebase-adminsdk-8swi6-f46e592e60.json")
const fb = firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: ApiConfig.DB_URL
})
//var fAuth = fb.auth()

class BaseFB {
	constructor(db_) {
		this.fdb = fb.database()
	}

	selectList() { //returns all rows
		return this.ref.once('value').then(function(res){
			const rows = res.val()
			return BaseFB.toArray(rows)
		})	
	}//()

	update(row) { // insert or update automatic, if key included. Return a promise
 		if (!row.pk) //empty, obtain new pk for insert
			row.pk = this.fdb.ref().child(this.table).push().key
		return this.fdb.ref(this.table+'/'+ row.pk).update(row).then(function(a,b){
			return row.pk
		})
	}//()

	static toArray(ra){
		var array=[]
		for (var key in ra){
			array.push(ra[key])
		}
		return array
	}//()


}
module.exports = BaseFB 