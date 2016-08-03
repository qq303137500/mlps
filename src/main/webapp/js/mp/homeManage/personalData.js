var personalData = {
		pageIdx : 0,
		pageSize : 10,
		initPage : function() {
			personalData.initStyle();
			personalData.initOperator();
			personalData.initLoad();
		},
		initStyle : function() {},
		initOperator : function() {},
		initLoad : function() {
			personalData.loadList(0);
		},
		/**
		 * 加载列表
		 */
		loadList : function(pageIndex) {
			personalData.pageIdx = (pageIndex+1);
		},
		loadList_CB : function(data) {}
};