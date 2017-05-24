'use strict'
loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){
		console.log('main loading')

		loadjs([
			'https://cdn.rawgit.com/topseed/topseed-turbo/master/vendor/system-production.js'
			,'/_js/BDS.js'
			,'/_js/BLX.js'
			//,'/_js/vendor/jquery.jsForm.min.js'


			], { success: function(){
				startApp()
			}
	})//loadjs
	}//suc
})

var TTObj2 = {
  typ: null
, $new: null
, delta: null
, $html: null
, err: null
}

function startApp(){
	
	TS.signalAppReady()
	console.log('main js ready')

	TT.ScontentID ='#content-wrapper'
	TT.handle(function(evt) {
		console.log(':')
		if (TT.PRE == evt.typ)  {//start
			console.log(evt.$new)
			//$('#content-wrapper').fadeTo(100,.2)
		}
		if (TT.PAGE == evt.typ)  {//new pg loaded
			$(TT.ScontentID).html(evt.$new)
			//$('#content-wrapper').fadeTo(100,1)
		}
	})

}//startApp()
