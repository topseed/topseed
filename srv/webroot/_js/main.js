'use strict'
loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		'https://cdn.rawgit.com/topseed/topseed-npm/master/v1.08/deps/jquery.smoothState.js'

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
	A.loaded=true
	A.act(A.LOADED)

	//SS
	let ssoptions={
		debug: true,
		prefetch: true,
		cacheLength: 2,
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
	
	const smoothState= $('#ss1').smoothState(ssoptions)
	//var endTime = new Date().getTime() - _loadStarted
	//console.log('load time ' + endTime)
}//startApp()
