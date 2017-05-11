'use strict'
loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){

		loadjs([
			//frp:
			'//cdn.jsdelivr.net/riot/3.4.4/riot+compiler.min.js'
			,'/_js/BPS.js'

			//data
			,'/_js/vendor/jquery.jsForm.min.js'
			,'/_js/vendor/jquery.fullpage.min.css'
			,'/_js/vendor/jquery.fullpage.min.js'

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
	// READY ///////////////////////////////////////////////////////////
	ST.signalAppReady()

	console.log('main js ready')

	TT.ScontentID ='#content-wrapper'
	TT.handle(function(evt) {
		console.log(':')
		if(TT.PRE==evt.typ)  {//start
			console.log(evt.$new)
			//$('#content-wrapper').fadeTo(100,.2)
		}
		if(TT.PAGE==evt.typ)  {//new pg loaded
			$(TT.ScontentID).html(evt.$new)
			//$('#content-wrapper').fadeTo(100,1)
		}
	})

}//startApp()

// /////////////////////////
function preLImg(arg) { // helper function start loading an image so browser has it ready
	var imag = new Image()
	imag.src = arg
}
