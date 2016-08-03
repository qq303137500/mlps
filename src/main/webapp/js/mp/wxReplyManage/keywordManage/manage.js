var manage = {
	/**
	 * 添加公告信息
	 */
		queryReplyById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryReplyById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	queryKeyWord : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryKeyWord';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	addKeyWordInfo:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/addKeyWord';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	queryReplyById:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryReplyById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	upKeyWordInfo: function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/upKeyWordInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	delKeyWordInfo: function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/delKeyWordInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	addNewsList:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/addNewsList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false,null,null,"application/json");
	},
	upNewsList:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/upNewsList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false,null,null,"application/json");
	},
	queryContentById:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryContentById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
};