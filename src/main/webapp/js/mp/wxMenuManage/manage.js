var manage = {
	
	queryWxMenu:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/queryWxMenu';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	addSaveMenu:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/addSaveMenu';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	addSubMenu:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/addSubMenu';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	addSaveMenuAndSub:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/addSaveMenuAndSub';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	changeMenuState : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/changeMenuState';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	queryMenuById:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/queryMenuById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	updateMenu:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/updateMenu';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	delMenu:function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxmenuinfo/delMenu';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	queryKeyWord : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/wxreplyinfo/queryKeyWord';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	}
};