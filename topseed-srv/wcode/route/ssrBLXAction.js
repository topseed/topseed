'use strict'
const Util = require('topseed-util')
const pug = require('pug')
const ListEl = require('./ListComp')
const components = require('server-components')

const doT = require('dot')

//###################### 
components.registerElement('list-el', { prototype: new ListEl() })

class BLXAct {

	_fetchData() {
		const data = {'array':['banana','apple','orange']}
		return data
	}

	_renderComps(html, res) {
		console.log('binding')
		const tplFoo = doT.template(html) //compile
		const data = this._fetchData() //4: get data
		const bound = tplFoo(data)
		return bound
	}

	_getPage() {// should be file
		const p =`html
	head
	body
		p hi
		list-el
	`
		const pg = pug.render(p) // 1: page
		return pg
	}//pg

	renderPage(res) {
		const pg = this._getPage()
		const thiz = this
		return components.renderPage(pg) // 2: components
			.then(function (html) {
				const bound = thiz._renderComps(html, res)	// 3: render 
				return bound
		})//comps
	}//()

}//class

module.exports = BLXAct //node