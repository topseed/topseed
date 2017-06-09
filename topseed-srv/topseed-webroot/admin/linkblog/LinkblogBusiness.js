function LinkblogBusiness() {// 'closure|module'-iso.
	console.log('in LinkblogBusiness')

	//TODO: load from serverside config file
	const urlSpec = {root:'http://localhost:8081', selectList: '/linkblog', update: '/linkblog'}

	//generic select and insert are in BDS
	//urlSpec is passed in constructor
	class LinkblogDao extends BDS { /* additional functions here */} 

	class SimpleBusiness extends BLX {

        //We use (separate instances of) LinkblogBusiness across the Linkblog Admin module.
		//Different pages call different functions.

		//set up the detail/add page and form
		detail(formId) {
			var dateStr = moment().format('MM/DD/YYYY') //today
			$(formId).jsForm({data: {dateStr: dateStr}, prefix: 'data'})
		}	

		save(e) {
			
			console.log('LinkblogBusiness save form.target '+e.currentTarget)
			
			//e.currentTarget refers to form element on a form.submit event
			const formData = $(e.currentTarget).jsForm('get') //form data

			//convert dateStr to timestamp
			function dateStrOut(data) {
				data.ts = moment(data.dateStr, 'MM/DD/YYYY').valueOf();
			}
			BLX.convert(formData, {dateStr: dateStrOut}) //add more pairs with ', '
			
			const _updatePromise = sb.linkblogDao.update(formData, e.data.auth)
			_updatePromise.then(function(val) {
				sb._redirect('/admin/linkblog/') //using instance to avoid 'thiz'
			})
            //TODO: remain on page on error, display error
		}

		list(listId) {

			console.log('LinkblogBusiness list');
			const _listPromise = sb.linkblogDao.selectList()  
            this.renderList(listId, _listPromise)
		}

       renderList(listId, _listPromise) {

		   console.log('LinkblogBusiness renderList');

           return _listPromise.then(function(values) {
	
					//column definition
					var columns = [
						{title:'URL'}
						,{title:'Description', data:'head_line', defaultContent:''}
						,{title:'Creation Date', data:'dateStr', sClass:'dateCol'}
					]

					//render first column as link	
					columns[0].render = function(data, type, row, meta) { return doLink(row) }

					function doLink(row) {
						return '<a href="'+row.url+'" target="_blank">'+row.url +'</a>'
					}

					//we know that DataTable has its own json loader, but we want to be able use our own security module later
					$(listId).DataTable({	
						columns: columns,
						data: values
					})

					$(listId+' td.dateCol').css('text-align', 'center') //center date column

                }).catch(function(error) {
			  		console.log('LinkblogBusiness.selectList error: '+error.message);
				}
            );
        }
	}//class

	//console.log('new PS');
	const sb = new SimpleBusiness()
	sb.linkblogDao = new LinkblogDao(urlSpec); //we can have more than one DataSource
	//console.log('set sb.linkblogDao');

	//not sure what triggers cleanup and what the cleanup is for
	//flyd.on(cleanUp, sb.stream('TT'))

	function cleanUp() {
		console.log('LinkblogBusiness cleanUP, TT')
	}//()

	return sb //instance to page 
}