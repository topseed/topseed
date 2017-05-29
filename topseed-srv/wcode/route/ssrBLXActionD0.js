'use strict'
const Util = require('topseed-util')
const pug = require('pug')
const ListEl = require('./ListComp')

const doT = require('dot')
const cheerio = require('cheerio')

//###################### 
const tpl = 
`{{~it.array :value:index}}
	<div>{{=value}}</div>
{{~}}`
class BLXAct {

	_fetchData() {
		const data = {'array':['banana','apple','orange']}
		return data
	}

	_renderComps(html, res) {
		console.log('binding')
		const tplFoo = doT.template(tpl) //compile
		const data = this._fetchData() //4: get data
		const bound = tplFoo(data)

		//now add bound html to the page, by replacing
		var $ = cheerio.load(html) // load in the HTML into cheerio
		$('#list1').replaceWith(bound)
		return $.html()
	}

	_getPage() {// should be file
		const p =`html
	head
	body
		p hi
		#list1
	`
		const pg = pug.render(p) // 1: page
		return pg
	}//pg

	renderPage(res) {
		const html = this._getPage()
		const bound = this._renderComps(html, res)	// 3: render 
		return bound
	}//()

}//class

module.exports = BLXAct //node