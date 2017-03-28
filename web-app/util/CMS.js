
const fs = require('fs')

const express = require('express')
const router = express.Router()
// /////////////////////////////////////////////////////

const ROOT = './www/'
const INFO = '/info.json'

router.post('/dir', function (req, res) {	
	const dat = req.body
	console.log(dat)
	const dir = dat.dir //{ "dir":"post" }

	const folder = ROOT + dir + '/'
	console.log(folder)
	let ff = fs.readdirSync(folder)
	let ret = new Array()  
	ff.forEach(function(item){
		try {
			const stats = fs.statSync(folder+item)
			const d = stats.isDirectory()
			if(d) { 
					const f = folder + item + INFO
					let el = {}
					if (fs.existsSync(f)) {
						el = JSON.parse(fs.readFileSync(f, 'utf8'))
						//console.log(el)
					}//fi
				el['item'] = dir+'/'+item
				el['time'] = Date.parse(stats.ctime)
				ret.push(el)
			}//fi
		} catch(err) {
			console.log(err)
		}// try
	})

	//console.log(ret)
	res.status(200).send(JSON.stringify(ret))
})// /

router.post('/time', function (req, res) {	
	const t = {'time':Date.now()}

	res.status(200).send(JSON.stringify(t))
})// /

//###################### 
module.exports = router