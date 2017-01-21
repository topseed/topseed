'use strict'
const _PRE = '_pre-action'
const _ACT = '_action'
const _LOADED = '_loaded'
var _loaded = false
var _inAction = false // set to true when user acts; false when effect is done

//> ====================================================================
// for user actions/'control'
 const _act = new signals.Signal()

/*ex 
function init() {
	//
}
if(_loaded) init()
else {
	_act.addOnce(function(arg1, arg2) {
		init()
		return false
	})
}

_act.addOnce(function(arg1, arg2) {
	console.log(arg1, arg2)
	return false
})
*/
console.log('act setup')
// <====================================================================

function preLImg(arg) {
	var imag = new Image()
	imag.src = arg
}
