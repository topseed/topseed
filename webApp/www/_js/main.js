'use strict'

loadjs.ready(['dependencyNotChrome', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		//dbind:
		'/_js/libJs/jquery.jsForm.min.js'

		,'/_js/libJs/jquery.fullpage.min.js'
		,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'
		//'//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js'
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
	$('#navPrev').click(function(e) { 
		console.log('#navPrev')
		toggleSide()
	})
	// READY ///////////////////////////////////////////////////////////
	A.loaded=true
	A.act(A.LOADED)

	var $body=$('body')
	$body.fadeTo(20,1)//shell sets it to 0

	//>===============================================================
	function toggleSide(){
		console.log('tog')
		var $sidedrawer=$('#sidedrawer')
		$sidedrawer.toggleClass('active')
	}
	function initSideDraw() {
		console.log('initSD')
		setTimeout(function(){
			$('#brand').on('click', toggleSide)
			$('#sidedrawer').on('click', toggleSide)
		}, 200)
	}
	initSideDraw()

	//>====================================================================
	//SS
	let ssoptions={
		debug: true,
		prefetch: true,
		cacheLength: 3,
		repeatDelay: 450,

		onStart: {
			duration: 0, 
			render: function (url, $container)  {
				A.inAction=true
				//console.log('-> ')
				A.act(A.PRE) //action
				$('#content-wrapper').fadeTo(100,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$('#content-wrapper').fadeTo(200,1)

				A.inAction= false
				A.act(A.PAGE)// main action
				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	const smoothState= $('#ss1').smoothState(ssoptions)

	let endTime = (new Date()).getTime() - _loadStarted
	console.log('load time ' + endTime)
}//startApp()
//====================================================================
