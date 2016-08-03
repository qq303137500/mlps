var homeFunction = {
	/**
	 * 查询用户信息
	 */
	findPersonalInfo : function(params, successcb, errorcb) {
		var url = sys.contextPath + "/station/findStationList";
		utils.ajax(url, params, successcb, errorcb, "POST", "json", false,{});
	}
};