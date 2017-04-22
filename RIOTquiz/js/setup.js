
loadjs([ // load libs:
	'//cdn.jsdelivr.net/jquery/3.2.0/jquery.min.js'
	,'//cdn.jsdelivr.net/riot/3.3.2/riot+compiler.min.js'
	,'https://www.masons-foundation.org/_js/libJs/jquery.jsForm.min.js'
	,'https://cdn.rawgit.com/topseed/topseed-npm/master/v1/deps/js.cookie.min.js'

	], { success: function(){
		console.log('fw libs loaded');
		init()

	}, async: false
})

function readStore() {
	var ret =[]
	var cookies = document.cookie.split(';')
	for (var i = 0; i < cookies.length; i++){   
		var cook =  cookies[i].split('=')
		cook = cook[0].trim()
		//console.log(Cookies.get(cook))
		ret.push(cook)
	}
	console.log(ret)
	return ret
}

function deleteStore() {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++){
		var cook =  cookies[i].split('=');
		document.cookie = cook[0] +"=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	}
	//readStore()
}