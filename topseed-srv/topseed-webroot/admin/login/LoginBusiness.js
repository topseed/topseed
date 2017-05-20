function LoginBusiness( ) {// 'closure|module'-iso.
	console.log('in LoginBusiness')

	//const ROOT = 'http://localhost:8081' 
	//TODO: load from serverside config file
	const urlSpec = {root:'http://localhost:8081', login: '/me/login'}

	//Login Data Access Object
    class LoginDao extends BDS {

        login(data, token) { //login post
            return BDS.post(window.fetch, this.urlSpec.root, this.urlSpec.login, data, token)
                .then(function(value) { 
                    console.log('login post ret' +JSON.stringify(value))
                    return value
            })//BDS
        }//update
    } 

	class SimpleBusiness extends BPS {

		//get nav() { return this._nav }

		//triggered from submit, how to avoid double-submit?
		login(e) {
			
			//console.log('LoginBusiness e.data.auth '+e.data.auth)

			//e.currentTarget works when it's a form.submit event
			const formData = $(e.currentTarget).jsForm('get') //form data, 
			
			const _loginPromise = sb.dao.login(formData)
			_loginPromise.then(function(value) {
                console.log('login ret:'+JSON.stringify(value))
                //set as session cookie
                Cookies.set('auth', value)
                console.log('done set cookie:'+value)
				//thiz.nav(val) //page nav
				TT.loadPg('/admin/home/') //navigate to admin home
			})
            //TODO: remain on page on error, display error
		}
	}//class

	const sb = new SimpleBusiness()
	sb.dao = new LoginDao(urlSpec); 

	//trigger cleanup on TT signal
	flyd.on(cleanUp, sb.stream('TT'))

	function cleanUp() {
		console.log('LoginBusiness cleanUp on TT signal')
	}//()

	return sb //instance to page 
}