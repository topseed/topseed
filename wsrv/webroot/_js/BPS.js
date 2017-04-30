class BPS  { //testable pg services class for pg component com, ds/fetch, non UI and such

constructor() {
	this._pgBus= new Bacon.Bus() 	//loosely coupled
}

get pgBus() {
	return this._pgBus
}

init( ) {
	console.log('ps')
}

}//class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BPS //node