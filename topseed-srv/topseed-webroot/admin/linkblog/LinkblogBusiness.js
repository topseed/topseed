function LinkblogBusiness() {// 'closure|module'-iso.

	//when loading from static file:
	const urlSpec = {root:'http://localhost:8091', selectList: '/linkblog/dummy.json'}
	//when loading from API:
	//const urlSpec = {root:'http://localhost:8081', selectList: '/linkblog', update: '/linkblog'}

	//Data Access Object class
	class LinkblogDao extends BDS { /* additional functions here */} 
	//urlSpec is passed in constructor; BDS has generic select and insert

	//Business logic and message bus for page
	class SimpleBusiness extends BLX {

        //We use (separate instances of) LinkblogBusiness across the Linkblog Admin module.
		//Different pages call different functions.

		//set up the detail/add page and form
		detail(formId) {
			var dateStr = moment().format('MM/DD/YYYY') //today
			$(formId).jsForm({data: {dateStr: dateStr}, prefix: 'data'})
		}	

		//save what was entered on the detail/add page from
		save(e) {
			
			console.log('LinkblogBusiness save form.target '+e.currentTarget)
			
			//e.currentTarget refers to form element on a form.submit event
			const formData = $(e.currentTarget).jsForm('get') //form data

			//Function to obtain timestamp from  dateStr
			function dateStrOut(data) {
				data.ts = moment(data.dateStr, 'MM/DD/YYYY').valueOf();
			}
			//Converter, use when display format does not match DB format
			BLX.convert(formData, {dateStr: dateStrOut /*,param:func*/}) 
			
			const _updatePromise = sb.linkblogDao.update(formData, e.data.auth)
			_updatePromise.then(function(val) {
				sb.redirect('/admin/linkblog/') //Return to list
			}).catch(function(error) {
				alert('update error: '+error.message); //Remain on page
			})
            
		}

		list(listId) {

			console.log('LinkblogBusiness list');
			
			//Show the 'Add' button when using live data (insert enabled)
			if (urlSpec.update)
				$('#addButton').removeClass('mui--hide') //jQuery

			//Query for the list data		
			const _listPromise = sb.linkblogDao.selectList()  
            this.renderList(listId, _listPromise)
		}

       renderList(listId, _listPromise) {

		   console.log('LinkblogBusiness renderList');

           return _listPromise.then(function(values) {
	
					//Build DataTable 'component'
					
					//Column definitions
					var columns = [
						{title:'URL'}
						,{title:'Description', data:'head_line', defaultContent:''}
						,{title:'Creation Date', data:'dateStr', sClass:'dateCol'}
					]

					//Render first column as link	
					columns[0].render = function(data, type, row, meta) { return doLink(row) }
					//Define the link output	
					function doLink(row) {
						return '<a href="'+row.url+'" target="_blank">'+row.url +'</a>'
					}

					//We know that DataTable has its own json loader, but we want to use our own API calls
					$(listId).DataTable({	
						columns: columns,
						data: values
					})

					//Center date column
					$(listId+' td.dateCol').css('text-align', 'center') 

                }).catch(function(error) {
			  		console.log('LinkblogBusiness.selectList error: '+error.message);
				}
            );
        }
	}//class

	//Instantiate Business
	const sb = new SimpleBusiness()
	sb.linkblogDao = new LinkblogDao(urlSpec); //Add DAO to Business
	
	return sb //Return instance to page 
}