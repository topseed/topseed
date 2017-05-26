class BLX	{ //testable pg services class for pg component com, ds/fetch, FRP and such. base page services / 'middle layer'

	constructor(ds) {
		this._ds = ds
		this._streams= {} 	//loosely coupled
		this.regObserver('TT', TT.smoothPg)//page stream
	}

	regObserver(key, stm)	{
		console.log('set')
		this._streams[key] = stm
	}

	observer(key) {//get
		console.log('get')
		return this._streams[key]
	}


/*
	static _getIdParam() {
		 var vars = [],
			 hash;
		 var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		 for (var i = 0; i < hashes.length; i++) {
			 hash = hashes[i].split('=');
			 if (hash[0]=='id') return hash[1];
		 }
		 return null;
	 }

	 static _convert(data, rules){ // needs a better name
		 for (name in rules)
		 {
			 if (data[name])
			 {
			 		//try {
						 rules[name](data)
				//} catch(e) {console.log(e)}	 //e.g. null or malformed data
			 }
		 }
	 }
*/

}//class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BLX //node