function LoginBusiness( ) {// 'closure|module'-iso.
	console.log('in LoginBusiness')

	//Better: load from serverside config file
	const urlSpec = {root:'http://localhost:8081', login: '/login'}

	//Login Data Access Object
    var LoginDao = BDS.extend({    

        login: function(data, token) { //login post
            return BDS._post(window.fetch, this.urlSpec.root, this.urlSpec.login, data, token)
                .then(function(value) { 
                    console.log('login post ret' +JSON.stringify(value))
                    return value
            })//BDS
        }//login
    }) 

	var SimpleBusiness = BLX.extend({

		login: function(e) {
			
			//console.log('LoginBusiness e.data.auth '+e.data.auth)

			const formData = $(e.currentTarget).jsForm('get') //form data 
			
			const _loginPromise = sb.loginDao.login(formData)
			_loginPromise.then(function(value) {
                
                console.log('login ret:'+JSON.stringify(value))
                //set as session cookie
                Cookies.set('auth', value)
                console.log('done set cookie:'+value)
				sb.redirect('/admin/home/') 
			}).catch(function(error) {
				//display error in dedicated div and remain on page
				if ('Forbidden'==error.message)
					$('#error').text('Unable to authenticate.')
				else
					$('#error').text(error.message)
				$(':input:first').focus().select() //select first input	
			})
		}
	})//class

	const sb = new SimpleBusiness()
	sb.loginDao = new LoginDao(urlSpec); 

	return sb //instance to page 
}