class BPS  { //testable pg services class for pg component com, ds/fetch, FRP and such. base page services / 'middle layer'

	constructor(ds) {
		this._ds = ds
		this._streams= {} 	//loosely coupled
		this.regStream('TT', TT.smoothPg)//page stream
	}

	regStream(key, stm)  {
		this._streams[key] = stm
	}

	stream(key) {//get
		return this._streams[key]
	}

	init( ) {
		console.log('bps')
	}

	static getIdParam() {
       var vars = [],
           hash;
       var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
       for (var i = 0; i < hashes.length; i++) {
           hash = hashes[i].split('=');
		   if (hash[0]=='id') return hash[1];
       }
       return null;
   }

}//class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BPS //node