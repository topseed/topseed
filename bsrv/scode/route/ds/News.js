'use strict'
const BaseFB = require('./BaseFB')
const Util = require('topseed-util')
const U = new Util() 

class News extends BaseFB {
	constructor() {
		super()
		this.table = 'links10'
		this.ref = this.fdb.ref(this.table)
	}

	update(row) { // insert or update automatic, if key included. Return a promise
		const pk = this.fdb.ref().child(this.table).push().key
		row['pk'] = pk
		const ut = Date.now()
		row['ts'] = ut
		return this.fdb.ref(this.table+'/'+ pk).setWithPriority(row, 0- ut).then(function(a,b){
			return pk
		})
	}//()

	selectList() {//returns all rows sorted backwards by date
		return this.ref.once('value').then(function(res){
				//.orderByChild('commentator')
				const row = res.val()
				const rows = BaseFB.toArray(row)
				//console.log(JSON.stringify(rows))
				console.log('select list res')
				return rows
		})
	}//()

	select(pk) {
		return this.ref.child(pk).once('value').then(function(res){
				const row = res.val()
				console.log(JSON.stringify(row))
				console.log('select res')
				return row
		})		
	}//()

	delete(pk) {
	}//()

	update(pk, changes) {
	}//()


}//class
module.exports = News

