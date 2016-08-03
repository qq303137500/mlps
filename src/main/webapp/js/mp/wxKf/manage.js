var manage = {
		querykfList: function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/queryKfList';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		addKfInfo: function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/addKfInfo';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		getKfById: function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/getKfById';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		editKfInfo: function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/editKfInfo';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		delKf:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/delKf';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		getKfByAccount: function(param, successcb, errorcb) {
			var url = sys.contextPath + '/kfInfo/getKfByAccount';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false,null,false);
		}
	
	
};