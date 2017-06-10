'use strict'
loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){

		loadjs([
			//frp:
			'//cdn.jsdelivr.net/riot/3.4.4/riot+compiler.min.js'
			,'/_js/BLX2.js'
			,'/_js/BDS2.js'
			,'//cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js'
			,'//cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css'
			//,'//cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js'
			//,'//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js'
			,'//cdn.jsdelivr.net/momentjs/2.18.1/moment.min.js'
			,'//cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.7/dialog-polyfill.min.js' //login dialog

			,'/_js/vendor/jquery.jsForm.min.js',

			], { success: function(){
				console.log('loaded admin/data tables')
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
