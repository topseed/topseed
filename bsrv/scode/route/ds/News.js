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

}//class
module.exports = News

