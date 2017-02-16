'use strict'
const _PRE = '_pre-action'
const _stateA = '_stateAion'
const _LOADED = '_loaded'
var _loaded = false
var _inAction = false // set to true when user acts; false when effect is done

//> ====================================================================
// for user actions/'control'
 const _stateA = new signals.Signal()
 const _compA = new signals.Signal()

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
