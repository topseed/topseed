'use strict'
loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){

		loadjs.done('ready') // page ready

		loadjs([
			//images
			,'/_js/libJs/jquery.fullpage.min.css'
			,'/_js/libJs/jquery.fullpage.min.js'

			//data
			,'/_js/libJs/jquery.jsForm.min.js'

			], { success: function(){
				console.log('loaded libs')
				startApp()
			}
	})//loadjs
	}//suc
})

function startApp(){
	// READY ///////////////////////////////////////////////////////////
	loadjs.done('main')

	sP.ScontentID ='#content-wrapper'
	sP.smoothPg.add(function(typ, $new, delta, $html) {
		console.log(typ)

		if(sP.PRE==typ)  {//start
			console.log($new)
			//$('#content-wrapper').fadeTo(1000/60,.2)

		}
		if(sP.PAGE==typ)  {//ready
			$(sP.ScontentID).html($new)
			//$('#content-wrapper').fadeTo(1000/30,1)

		}

	})


}//startApp()
