var plan_interface = {

	/**
	 * 查询计划列表
	 */
	queryWorkPlanList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/workPlan/queryWorkPlanList';
		utils.ajax(url, param, successcb, errorcb, "POST", "json", false);
	},

	/**
	 * 删除计划
	 */
	delWorkPlan : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/workPlan/delWorkPlan';
		utils.ajax(url, param, successcb, errorcb, "POST", "json", false);
	},
	/**
	 * 查看计划详情
	 */
	findWorkPlanDetails : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/workPlan/findWorkPlanDetails';
		utils.ajax(url, param, successcb, errorcb, "POST", "json", false);
	}
};