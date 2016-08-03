var indexmanage={
		
		queryIdnexPhotoList : function(param, successcb, errorcb) {
			var url = sys.contextPath + '/idnexPhoto/queryIdnexPhotoList';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		addIndexPhoto : function(param, successcb, errorcb) {
			var url = sys.contextPath + '/idnexPhoto/addIndexPhoto';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		indexPhotoToTop : function(param, successcb, errorcb) {
			var url = sys.contextPath + '/idnexPhoto/indexPhotoToTop';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		delIndexPhoto : function(param, successcb, errorcb) {
			var url = sys.contextPath + '/idnexPhoto/delIndexPhoto';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		queIndexPhoto : function(param, successcb, errorcb) {
			var url = sys.contextPath + '/idnexPhoto/queIndexPhoto';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		}
};