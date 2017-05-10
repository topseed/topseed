class BPS  { //testable pg services class for pg component com, ds/fetch, FRP and such. base page services / 'middle layer'

constructor() {
	this._streams= {} 	//loosely coupled
}

regStream(key, stm)  {
	this._streams[key]=stm
}

stream(key) {//get
	return this._streams[key]
}

init( ) {
	console.log('bps')
}

}//class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BPS //node