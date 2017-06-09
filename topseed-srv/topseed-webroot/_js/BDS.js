'use strict'
console.log('BDS')

class BDS { 

	constructor(_urlSpec) {
		this.urlSpec = _urlSpec
		this.fetch_ = window.fetch // Bsr - browser side
	}
	
	selectList(data, token) {
		return BDS._get(window.fetch, this.urlSpec.root, this.urlSpec.selectList, data, token)
			.then(function(values) { 
				//console.log(JSON.stringify(values))
				return values
		}).catch(function(error) {
			console.log('selectList error: '+error.message);
		})//BDS
	}//selectList

	update(data, token) { //insertOrUpdate
		return BDS._post(window.fetch, this.urlSpec.root, this.urlSpec.update, data, token)
			.then(function(value) { 
				console.log(JSON.stringify(value))
				return value
		}).catch(function(error) {
			console.log('update error: '+error.message);
		})//BDS
	}//update

	static _get(fetch_, ROOT_, url_, payload, jtoken ) {
		console.log('fetching ', url_, payload, jtoken)
		//convert payload to query string	
		var url = ROOT_ + url_;
		var queryString = BDS.objectToQueryString(payload)
		if (queryString != '')
			url = url + '?' +queryString 
		//console.log('url'+url)	

		return fetch_(url , { //1: call
				method: 'get'
				, headers: {
					'Content-Type': 'application/json'
					,'X-JToken' : JSON.stringify(jtoken)
					,'Accept':'application/json'
					, credentials: 'same-origin' //res.cookie returned
				}
				//no body for get
			}).then(function(response) { //2: returns a promise
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()

	static objectToQueryString(obj){
		var params = [];
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				params.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return params.join("&");
	}

	static _post(fetch_,ROOT_, url_, data_) {
		//var xjt_ = Cookies.get(BDS.XJT)
		//var xb_  = Cookies.get(BDS.XBASIC)
		console.log('fetching ', url_)
		return fetch_(ROOT_ + url_ , { //1 call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json',
				}
				, body: JSON.stringify(data_)
			}).then(function(response) { //2 returns a promise
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()


} // class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BDS //node


