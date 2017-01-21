		fetch('http://jsonplaceholder.typicode.com/comments', { //1 call
				method: 'get'
			}).then(function(response) { //2 promise
				return (response.json())
				}).then(function(value) { //3
					// your code here
					console.log('back')
					console.log(JSON.stringify(value))
			}).catch(function(err) {
				console.log('error')
				console.log(err)
		})//fetch()