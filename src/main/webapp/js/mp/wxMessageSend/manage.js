var manage = {
	
		queryGroup:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmessageinfo/queryGroup';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	sendMessage:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmessageinfo/sendMessage';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	querySendLog:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmessageinfo/querySendLog';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	queryAllSendLog:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmessageinfo/queryAllSendLog';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	}
};