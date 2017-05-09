class BPS  { //testable pg services class for pg component com, ds/fetch, state machine and such. base page services 'middle api layer'

constructor() {
	this._streams= {} 	//loosely coupled
}

regStream(key, strm)  {
	this._streams[key]=str
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