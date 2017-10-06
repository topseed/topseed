'use strict'
const BaseFB = require('./BaseFB')
const Util = require('topseed-utils')
const U = new Util() 

class Linkblog extends BaseFB {

	constructor() {
		super()
		this.table = 'links11'
		this.ref = this.fdb.ref(this.table)
	}

}//class
module.exports = Linkblog