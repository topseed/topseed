'use strict'
if(bowser.msie) {
	console.log('*** you got ie, this site wont work, please use edge or better, or go to AMP/M sub-domain')
	// redirect to amp.DOMAIN
}

//globals:
var _PRE = '_pre-action'
var _PAGE = '_page'
var _LOADED = '_loaded'
var _inAction = false // set to true when user acts; false when effect is done
var _loaded = false

var _stateA = new signals.Signal()
var _compA = new signals.Signal()
//> ====================================================================

/*ex pg:
function init() {
	//
}
if(_loaded) init()
else {
	_stateA.addOnce(function(arg1, arg2) {
		init()
		return false
	})
}
*/
console.log('act setup')
// load <====================================================================
function loadNotChrome() {
	loadjs([
		'/zCDN/libJs/shadydom.min.js'
		,'/zCDN/libJs/custom-elements.min.js'
		,'//cdn.jsdelivr.net/fetch/2.0.1/fetch.min.js'

		], { success: function(){
			console.log('loaded dependencyNotChrome')
			loadjs.done('dependencyNotChrome')
		}
	})
}
if ( !bowser.blink) {//detect
	loadNotChrome()
} else {
	console.log('is chrome')
	loadjs.done('dependencyNotChrome')
}

loadjs([
	'//code.jquery.com/jquery-2.2.4.min.js'
	,'/zCDN/libJs/jquery.smoothState.js'

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

