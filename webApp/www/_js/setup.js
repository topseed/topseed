'use strict'

if(bowser.msie) {
	console.log('*** you got ie, this site wont work, please use edge or better, or go to AMP/M sub-domain')
	// redirect to amp.DOMAIN
}

// page actions
var A = { // v17.2a the page static 'object'
	stateA : new signals.Signal()
	,inAction : false // set to true when user acts; false when effect is done
	,loaded : false
	,PRE : '_pre-action'
	,PAGE : '_new-page'
	,LOADED : '_loaded'

	,act: function (arg) {
		A.stateA.dispatch(arg, window.location)
	}//()

	,onLoaded: function(cb) { // on loading + riot compile
		if(A.loaded) {
			riot.compile(function(){ // make component, and wait for it
				cb()
			})//r
		} //fi
		else {
			A.stateA.addOnce(function(arg1, arg2) {
				riot.compile(function(){ // make component, and wait for it
					console.log(arg1)
					cb()
					return false
				})//r
			})//added once
		}//else
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
		'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'
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
	,'/_js/libJs/riotComp.min.js'

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

