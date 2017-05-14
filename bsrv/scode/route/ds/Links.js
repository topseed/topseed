'use strict'
const BaseFB = require('./BaseFB')
const Util = require('topseed-util')
const U = new Util() 

class Links extends BaseFB {
	constructor() {
		super()
		this.table = 'links2'
		this.ref = this.fdb.ref(this.table)
	}

	add(row) { // return a promise
		const pk = this.fdb.ref().child(this.table).push().key
		row['pk'] = pk
		const ut = Date.now()
		row['ts'] = ut
		return this.fdb.ref(this.table+'/'+ pk).setWithPriority(row, 0- ut).then(function(a,b){
			return pk
		})
	}//()

	listAll() {//returns all rows sorted backwards by date
		return this.ref.once('value').then(function(res){
				//.orderByChild('commentator')
				const row=res.val()
				const rows= BaseFB.toArray(row)
				//console.log(JSON.stringify(rows))
				console.log('bak')
				return rows
		})
	}//()

	delete() {//pk
	}//()

	update(pk, changes) {
	}//()


}//class
module.exports = Links

