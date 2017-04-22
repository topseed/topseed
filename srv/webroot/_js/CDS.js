'use strict'
console.log('CDS')
class CDS {

	static fetch(fetch_,ROOT_, url_, data_) {
		//var xjt_ = Cookies.get(CDS.XJT)
		//var xb_  = Cookies.get(CDS.XBASIC)
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
// browser and native:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = CDS //node


