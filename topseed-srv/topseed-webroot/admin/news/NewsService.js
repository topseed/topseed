function NewsService( ) {// 'closure|module'-iso.
	console.log('in NewsService')

	//const ROOT = 'http://localhost:8081' 
	//TODO: load from serverside config file
	const urlSpec = {root:'http://localhost:8081', select: '/me/news', selectList: '/me/news', update: '/me/news', delete:'/me/news'}

	//generic select, selectList, update and delete are in BDS
	//urlSpec is passed in constructor
	class NewsDS extends BDS { /* additional functions here */} 

	class PS extends BPS {

        //the idea is to use NewsService across the News Admin module, different pages call different functions

		//get nav() { return this._nav }

		//set up the detail/edit/add page and form
		detail(formId) {

			const idParam = BPS.getIdParam(); //URL parameter: id
			console.log('NewsService detail:'+idParam);
			// if idParam is not blank, query and fill existing data
			if (idParam != null)
			{
				const _dataPromise = ps.newsDS.select({pk:idParam}, Cookies.get('auth'))
				_dataPromise.then(function(values) {

					//Data seems to accumulate tokens?
					console.log('data on detail:'+JSON.stringify(values));

					//fill the form with the data
					$(formId).jsForm({data: values, prefix: 'data'})
					//note that there's a hidden field with the pk

				}) //TODO: handle failure
			}
			else //else we assume it's an insert
				$(formId).jsForm({data: {ts: moment().format('MM/DD/YYYY')}, prefix: 'data'})
		}	

		//I don't see the added value in using streams for navigation
		//component communication, yes
		//e.g. when the item has been inserted or updated, just update the list
		//component instead of refreshing it. Set cursor on list,etc.
		/*detail(nam, auth_) {
			console.log(auth_)
			this._auth = JSON.parse(auth_)
			console.log(this._auth)

			//clicks and nav is confusing
			this.clicks = flyd.stream()
			this._nav = flyd.stream() // to navigate away

			const thiz = this
			flyd.on(function(e) {
				thiz.save(nam, thiz._auth)
			}, thiz.clicks)
			this.regStream(nam, this.clicks)
			console.log('init ')
		}//() */

		//triggered from submit, how to avoid double-submit?
		save(e) {
			e.preventDefault()
			//console.log('NewsService save form.target '+e.currentTarget)

			//e.currentTarget works when it's a form.submit event
			const formData = $(e.currentTarget).jsForm('get') //form data, 
			
			//use ps.
			const _updatePromise = ps.newsDS.update(formData, Cookies.get('auth'))
			_updatePromise.then(function(val) {
				//thiz.nav(val) //page nav
				TT.loadPg('/admin/news/list.html') //navigate to list
			})
            //TODO: remain on page on error, display error
		}


		/*save(nam, auth) {
			console.log(auth)
			const obj = $('#frm1').jsForm('get') 
			console.log(JSON.stringify(obj))

			const thiz = this
			const _promise = this._ds.doFetch(obj, auth)
			_promise.then(function(val) {
				thiz.nav(val) //page nav
			}).catch(function (er) {
				console.log(er)
			})//c
		}//() */

		delete(pk) {
			const _deletePromise = ps.newsDS.delete({pk:pk}, Cookies.get('auth'))
			_deletePromise.then(function(val) {
				//BETTER: reload grid, how?
				TT.loadPg('/admin/news/list.html') //navigate to list
			})
		}

		list(listId) {

			console.log('NewsService list');
			const _listPromise = ps.newsDS.selectList()  
            this.renderList(listId, _listPromise)

			//I understand this but thiz looks funky.
			//this._div = div
            //const thiz = this
            //const _promise = this._blogDS.selectList()
			//_promise.then(function(values) {
			//	console.log('_promise res:'+values)
			//	thiz.renderList(thiz._div, values)
			//}).catch(function (er) {
			//	console.log(er)
			//})//c */
		}

       renderList(listId, _listPromise) {

		   console.log('NewsService renderList');

           return _listPromise.then(function(values) {

				   //column definition
				   var columns = [
						{title:'Date', data:'ts', sClass:'dateCol'},
						{title:'Story Name', data:'url', defaultContent:''},
						{title:'Abstract', data:'head_line', defaultContent:''},
						{title:'', sClass:'actionCol', orderable:false}
					]

					//render first column as link	
					columns[0].render = function(data, type, row, meta) { return doLink(data, row) }; 
					columns[3].render = function(data, type, row, meta) { return doDel(data, row) }; 
					
					function doLink(data, row) {
						var m = moment.utc(row.ts).utcOffset(moment().format('ZZ'));
						var dt = m.format('MM/DD/YYYY');	

						return '<a href="/admin/news/detail.html?id='+row.pk+'">'+dt +'</a>';
					}
					function doDel(data, row) {
						return '<a href="#" onclick="doDelete(\''+row.pk+'\')">[Delete]</a>';
					}

				    //we know that DataTable has its own json loader, but we like our security module
					$(listId).DataTable({	
						columns: columns,
						data: values
					});	

					$(listId+' td.dateCol').css('text-align', 'center');
					$(listId+' td.actionCol').css('text-align', 'right');
                }
                // TODO: handle errors by adding promise failure callback
            );
        }
	}//class

	console.log('new PS');
	const ps = new PS()
	ps.newsDS = new NewsDS(urlSpec); //we can have more than one DataSource in a Service
	console.log('set ps.newsDS');

	//not sure what triggers cleanup and what the cleanup is for
	flyd.on(cleanUp, ps.stream('TT'))

	function cleanUp() {
		console.log('NewsService cleanUP, TT')
	}//()

	return ps //instance to page 
}