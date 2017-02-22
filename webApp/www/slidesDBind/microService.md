
	router.post('/contact', function (req, res) {
		const dat = req.body
		const pro = sendContact(dat.email, dat.msg, dat.phone)
		setNone(res)

		pro.then(function (data) {// wait for it to be sent then come back
				var ret = 'OK'
				res.status(200).send(JSON.stringify(ret))
			}
		})
	})
