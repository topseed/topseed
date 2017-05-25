'use strict'
console.log('BDS')
class BDS { //TODO: Move this method to day 3. Come up w/ a simpler base

	constructor(_urlSpec) {
		console.log('BDS constructor')
		this.urlSpec = _urlSpec
		this.fetch_ = window.fetch // Bsr - browser side
	}

	static _fetch(fetch_,ROOT_, url_, data_) {
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


	/*
	_selectList(data, token) {
		return BDS.get(window.fetch, this.urlSpec.root, this.urlSpec.selectList, data, token)
			.then(function(values) { 
				//console.log(JSON.stringify(value))
				return values
		})//BDS
	}//selectList
	*/

	_select(data, token) {
		console.log('BDS select()')
		return BDS.get(window.fetch, this.urlSpec.root, this.urlSpec.select, data, token)
			.then(function(value) { 
				console.log(JSON.stringify(value))
				return value
		})//BDS
	}//select

	_update(data, token) { //insertOrUpdate
		return BDS.post(window.fetch, this.urlSpec.root, this.urlSpec.update, data, token)
			.then(function(value) { 
				console.log(JSON.stringify(value))
				return value
		})//BDS
	}//update

	_delete(data, token) { //delete
		return BDS.delete(window.fetch, this.urlSpec.root, this.urlSpec.delete, data, token)
			.then(function(value) { 
				console.log(JSON.stringify(value))
				return value
		})//BDS
	}//delete

	/*
	static __post(fetch_, ROOT_, url_, payload, jtoken ) {
		console.log('posting ', url_, JSON.stringify(payload), jtoken)
		return fetch_(ROOT_ + url_ , { //1: call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json'
					,'X-JToken' : JSON.stringify(jtoken)
					,'Accept':'application/json'
					, credentials: 'same-origin' //res.cookie returned
				}
				, body: JSON.stringify(payload)
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
	*/

	static _delete(fetch_, ROOT_, url_, payload, jtoken ) {
		console.log('deleting ', url_, JSON.stringify(payload), jtoken)
		console.log('token:'+jtoken)
		return fetch_(ROOT_ + url_ , { //1: call
				method: 'delete'
				, headers: {
					'Content-Type': 'application/json'
					,'X-JToken' : jtoken //JSON.stringify(jtoken)
					,'Accept':'application/json'
					, credentials: 'same-origin' //res.cookie returned
				}
				, body: JSON.stringify(payload)
			}).then(function(response) { //2: returns a promise
				console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()

	/*
	static __get(fetch_, ROOT_, url_, payload, jtoken ) {
		console.log('fetching ', url_, payload, jtoken)
		//convert payload to query string	
		var url = ROOT_ + url_;
		var queryString = BDS.objectToQueryString(payload)
		if (queryString != '')
			url = url + '?' +queryString 
		console.log('url'+url)	

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

	static __objectToQueryString(obj){
		var params = [];
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				params.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return params.join("&");
	}
	*/

} // class

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BDS //node


