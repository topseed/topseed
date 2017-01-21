		function init() {
			//fetch().then(" pass data to components")
		}

		if(_loaded) init()
		else {
			_act.addOnce(function(arg1, arg2) {
				init()
				return false
			})
		}
