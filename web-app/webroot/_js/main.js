'use strict'

loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		'https://cdn.rawgit.com/topseed/topseed-npm/master/browserSide/deps/jquery.smoothState.js',

		//dbind:
		'/_js/libJs/jquery.jsForm.min.js'

		//,'/_js/libJs/jquery.fullpage.min.js'
		,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'
		//,'/zCDN/libJs/zingtouch.min.js'

		//dbind moar:
		,'//cdn.jsdelivr.net/jquery.datatables/1.10.10/js/jquery.dataTables.min.js'
		//,'//cdn.jsdelivr.net/jquery.datatables/1.10.10/css/jquery.dataTables.min.css'
		,'/_js/libJs/raphael.min.js'

		], { success: function(){
			console.log('loaded libs')
			startApp()
		}
	})//loadjs
	}//suc
})


//====================================================================
function startApp(){
	A.loaded=true
	A.act(A.LOADED)

	console.log('v17.02a')
	//>====================================================================
	//SS
	var ssoptions={
		debug: true,
		prefetch: true,
		cacheLength: 3,
		repeatDelay: 450,

		onStart: {
			duration: 0, 
			render: function (url, $container)  {
				//console.log('-> ')
				A.act(A.PRE) //action
				A.inAction=true

				$('#content-wrapper').fadeTo(1000/60,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$container.html($newContent)
				$('#content-wrapper').fadeTo(1000/30,1)

				A.act(A.PAGE)// main action
				A.inAction= false

				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	var smoothState= $('#ss1').smoothState(ssoptions)

	var endTime = (new Date()).getTime() - _loadStarted
	console.log('load time ' + endTime)
}//startApp()
//====================================================================

