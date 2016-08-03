var org_interface = {
	
	/**
	 * 查询用户列表
	 */
	querySecurUserList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/securUser/querySecurUserList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 添加用户信息
	 */
	addSecurUser : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/securUser/addSecurUser';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找用户信息
	 */
	getSecurUserById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/securUser/getSecurUserById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑用户信息
	 */
	editSecurUser : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/securUser/editSecurUser';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除用户
	 */
	delSecurUser : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/securUser/delSecurUser';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	}
};