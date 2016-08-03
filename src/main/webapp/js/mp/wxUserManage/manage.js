var manage = {
		queryGroup:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/queryGroupList';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		
		queryUserAll:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/queryUserByGroupId';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		queryByInput:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/queryByInput';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		addUserGroupInfo:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/addUserGroup';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		updateData:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/updateData';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		getUserInfo:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/getUserInfo';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		changeUserRemark:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/changeUserRemark';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		delGroupByGroupId:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/delGroupById';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		changeUserGroup:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxuserinfo/changeUserGroup';
			utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
		},
		delAuthen:function(param, successcb, errorcb) {
			var url = sys.contextPath + '/wxAuthen/api/delAuthen';
			utils.ajax(url, param, successcb, errorcb,"POST", "jsonp", false);
		}
};