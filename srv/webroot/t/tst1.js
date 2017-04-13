
// class:
const ROOT = 'http://jsonplaceholder.typicode.com/'
class Page1CDS extends CDS {
	doFetch() {
		return CDS.fetch(window.fetch, ROOT, 'comments')
			.then(function(value) { 
				console.log('back')
				console.log(JSON.stringify(value))
				return value
		})//CDS
	}//doFetch
}//class

//tst
const _cds = new Page1CDS()
QUnit.test( 'test: fetch()', function( assert ) {
	assert.expect(0)
	var done = assert.async()

	const pro = _cds.doFetch()
	pro.then(function(val) {
		console.log(val)
	}).catch(function (er) {
		console.log(er)
	})//c

	var val = ''
	//assert.ok( val, 'we got something, check console' )
	done()
})
