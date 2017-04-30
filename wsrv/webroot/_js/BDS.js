'use strict'
console.log('BDS')
class BDS {

	static fetch(fetch_,ROOT_, url_, data_) {
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


