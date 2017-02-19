'use strict'

if(bowser.msie) {
	console.log('*** you got ie, this site wont work, please use edge or better, or go to AMP/M sub-domain')
	// redirect to amp.DOMAIN
}

// page actions
var A = {
	stateA : new signals.Signal()
	,inAction : false // set to true when user acts; false when effect is done
	,loaded : false
	,PRE : '_pre-action'
	,PAGE : '_new-page'
	,LOADED : '_loaded'

	,act: function (arg) {
		A.stateA.dispatch(arg, window.location)
	}//()

	,onLoaded: function(cb) {
		if(A.loaded) cb()
		else {
			A.stateA.addOnce(function(arg1, arg2) {
				console.log(arg1)
				cb()
				return false
			})//added once
		}//e
	}//()

}//

//> ====================================================================
/*ex pg:
function init() {
	//
}
A.onLoaded(init)
*/

console.log('act setup')

// load <====================================================================
function loadNotChrome() {
	loadjs([
		'/_js/libJs/shadydom.min.js'
		,'/_js/libJs/custom-elements.min.js'
		,'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'

		], { success: function(){
			console.log('loaded dependencyNotChrome')
			loadjs.done('dependencyNotChrome')
		}, async: false
	})
}
if ( !bowser.blink) {//detect
	console.log('not new chrome')
	loadNotChrome()
} else {
	console.log('is chrome')
	loadjs.done('dependencyNotChrome')
}

loadjs([
	'//code.jquery.com/jquery-2.2.4.min.js'
	,'/_js/libJs/jquery.smoothState.js'

	], { success: function(){
		console.log('key libs')
		loadjs.done('keyLibs')
	}, async: false
})

// foo <====================================================================
function preLImg(arg) {
	var imag = new Image()
	imag.src = arg
}

