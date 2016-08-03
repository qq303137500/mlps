var manage = {
	/**
	 * 添加公告信息
	 */
		addSubscribeInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/addAndEditReply';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	   querySubscribeInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryReply';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	}
	
	
};