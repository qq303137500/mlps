var sitesFunction = {
		
		
		/**
		 * 获取车辆品牌列表
		 */
		getCarFacList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getCarFacList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 获取车系列表
		 */
		getCarList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getCarList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		/**
		 * 获取省份列表
		 */
		getProvinceList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getProvinceList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 获取城市列表
		 */
		getCityList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getCityList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 添加二手车信息
		 */
		addOldCarInfo : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/addOldCarInfo';
			  utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 获取二手车列表
		 */
		getOldCarList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getOldCarList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 获取二手车记录详情
		 */
		getOldCarInfo : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/getOldCarInfo';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 删除二手车
		 */
		delOldCarById : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/usedcar/delOldCarById';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		/**
		 * 添加合作商
		 */
		addCoopNetWork : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/addCoopNetWorkInfo';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		/**
		 * 合作商列表
		 */
		getCoopNetWorkList : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/getCoopNetWorkList';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 删除
		 */
		delCoopNetWorkById : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/delCoopNetWorkById';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		/**
		 * 详情
		 */
		getCoopNetWork : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/getCoopNetWork';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		/**
		 * 根据网点名称获取
		 */
		getCoopNetWorkByname : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/getCoopNetWorkByname';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		
		/**
		 * 根据城市ID获取城市信息
		 */
		getCityBycid : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/city/getCityBycId';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		},
		
		
		
		/**
		 * 根据城市ID获取城市信息
		 */
		getCoopNetWorkListlatlng : function(params, successcb, errorcb) {
			  var url = sys.contextPath  + '/coopnw/getCoopNetWorkListlatlng';
			     utils.ajax(url, params, successcb, errorcb,"POST", "json", false);
		}
		
};