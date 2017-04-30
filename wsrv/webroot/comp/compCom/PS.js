var PS = { //testable pg services class for pg component com, ds/fetch, non UI and such

	//pgBus0: new signals.Signal()

	pgBus: new Bacon.Bus() 	//loosely coupled

	, init: function( ) {
		console.log('ps')
	}

}//class

