
const fs = require('fs')

const express = require('express')
const router = express.Router()
// /////////////////////////////////////////////////////

const ROOT = './www/'

router.post('/dir', function (req, res) {	
	const dat = req.body
	console.log(dat)
	let folder = dat.dir //{ "dir":"post" }
	folder = ROOT + folder + '/'
	console.log(folder)
	let ff = fs.readdirSync(folder)
	let ret = new Array()  
	ff.forEach(function(item){
		const stats = fs.statSync(folder+item)
		const d = stats.isDirectory()
		if(d) {
			let el = {name: item, date: Date.parse(stats.ctime) }
			ret.push(el)
		}
	})

	//console.log(JSON.stringify(ret))
	res.status(200).send(JSON.stringify(ret))
})// /

router.post('/time', function (req, res) {	
	const t = {'time':Date.now()}

	res.status(200).send(JSON.stringify(t))
})// /

//###################### 
module.exports = router