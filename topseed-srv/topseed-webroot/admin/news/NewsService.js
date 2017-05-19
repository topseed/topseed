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
		detail(formId, idParam) {
			$(formId).jsForm()

			console.log('NewsService detail');
			// if idParam is not blank, query and fill existing data
			if (idParam != null)
			{
				const _dataPromise = this.newsDS.select({pk:idParam}, Cookies.get('auth'))
				_dataPromise.then(function(values) {

					//This seems to accumulate tokens?
					console.log('data on detail:'+JSON.stringify(values));

					//fill the form with the data
					//doesn't work yet
					$(formId).jsForm({data: values, prefix: 'data'})
					//TODO: hidden field with the pk/id

				}) //TODO: handle failure
			}
			else //else we assume it's an insert
				$(formId).jsForm()
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

		//triggered from click, how to avoid double-submit?
		save(formId) {

			console.log('NewsService save');

			const formData = $(formId).jsForm('get') //form data
			
			console.log(JSON.stringify(formData))
			
			const _updatePromise = this.newsDS.update(formData, Cookies.get('auth'))
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

		list(listId) {

			console.log('NewsService list');

			const _listPromise = this.newsDS.selectList()  
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

            // Always assume `_listPromise` is a promise... cuts down on the code
            // `then` returns a promise, so let's use that instead of creating our own
            return _listPromise.then( //we return so we can chain more stuff
                // Success callback
                function(values) {

				   //column definition
				   var columns = [
						{title:'Date', data:'ts'},
						{title:'Story Name', data:'url', defaultContent:''},
						{title:'Abstract', data:'head_line', defaultContent:''}]

					//render first column as link	
					columns[0].render = function(data, type, row, meta) { return doLink(data, row) }; 
					
					function doLink(data, row) {
						return '<a href="/admin/news/detail.html?id='+row.pk+'">'+row.ts +'</a>';
					}

				    //we do know that DataTable has its own json loader, but we like our security module
					$(listId).DataTable({	
						columns: columns,
						data: values
					});	
                }
                // TODO: handle errors by adding promise failure callback
            );
        }
	}//class

	const ps = new PS()
	ps.newsDS = new NewsDS(urlSpec); //allows us to have multiple datasources in one module
	//BUT all DS could be static? And we may not need to couple them at all

	//not sure what triggers cleanup and what the cleanup is for
	flyd.on(cleanUp, ps.stream('TT'))

	function cleanUp() {
		console.log('NewsService cleanUP, TT')
	}//()

	return ps //instance to page 
}