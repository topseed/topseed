'use strict'
//globals
var _PRE = '_pre-action'
var _PAGE = '_PAGE'
var _LOADED = '_loaded'
var _inAction = false // set to true when user acts; false when effect is done
var _loaded=false

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
// <====================================================================

function preLImg(arg) {
	var imag = new Image()
	imag.src = arg
}

