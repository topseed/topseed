'use strict'
const Util = require('topseed-util')
//const pug = require('pug')

const components = require('server-components')

//###################### 
class Cre{
	constructor() {
		const NEL = components.newElement()
		NEL.createdCallback = function () {
			// could be file: 
			const tpl = 

`{{~it.array :value:index}}
	<div>{{=value}}</div>
{{~}}`

			this.innerHTML = tpl // html
		}
		return NEL
	}//cpms
}

module.exports = Cre //node