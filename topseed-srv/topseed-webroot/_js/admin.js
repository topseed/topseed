TM = {

	loadLibs: function(){
		console.log('admin.js loadLibs called')

		//most of these could be in cache.mf
		return Promise.all([
			TS.load('//cdn.rawgit.com/topseed/topseed-turbo/master/vendor/jquery.jsForm.min.js')
			, TS.load('/_js/BLX.js')
			, TS.load('/_js/BDS.js')
			, TS.load('//rawgit.com/topseed/topseed-turbo/master/release/topseed-turbo-latest.js')
			, TS.load('//cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js')
			, TS.load('//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css')
			, TS.load('//cdn.jsdelivr.net/momentjs/2.18.1/moment.min.js')
			, TS.load('//cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.7/dialog-polyfill.min.js') //login dialog
		])
		.then(TM.libsLoaded)
	}

	, libsLoaded: function(){
		
		TS.signalAppReady()
		console.log('admin js ready')

		TT.ScontentID ='#content-wrapper'
		TT.handle(function(evt) {
			console.log(':')
			if (TT.PRE == evt.typ)  {//start
				//console.log(evt.$new)
				//$('#content-wrapper').fadeTo(100,.2)
			}
			if (TT.PAGE == evt.typ)  {//new pg loaded
				$(TT.ScontentID).html(evt.$new)
				//$('#content-wrapper').fadeTo(100,1)
			}
		})

	}//startApp()

} //class

TM.loadLibs()
