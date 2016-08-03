var ershouchemanage={
		
		/**
		 * 获取二手车列表
		 */
		getOldCarListwz : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getOldCarListwz';
			var url = sys.contextPath + '/usedcar/getOldCarListwz';
 
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 根据城市拼音获取城市列表
		 */
		getCityListBypy : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getOldCarListwz';
			var url = sys.contextPath + '/usedcar/getCityListBypy';
 
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 根据品牌拼音获取品牌列表
		 */
		getCarListBypy : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getOldCarListwz';
			var url = sys.contextPath + '/usedcar/getCarListBypy';
 
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 根据品牌获取车系列表
		 */
		getCarListBybn : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getOldCarListwz';
			var url = sys.contextPath + '/usedcar/getCarListBybn';
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 获取二手车详情
		 */
		getOldCarInfowz : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getOldCarInfowz';
			var url = sys.contextPath + '/usedcar/getOldCarInfowz';
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 获取省份列表
		 */
		getProvinceList : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getProvinceListjp';
			   var url = sys.contextPath  + '/usedcar/getProvinceListjp';
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		
		/**
		 * 合作商列表
		 */
		getCoopNetWorkList : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/coopnw/getCoopNetWorkListjp';
			  var url = sys.contextPath  + '/coopnw/getCoopNetWorkListjp';
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		/**
		 * 获取城市列表
		 */
		getCityList : function(params, cb, errorcb) {
			//var url = utils.leaseApi + utils.content + '/usedcar/getCityListjp';
			  var url = sys.contextPath  + '/usedcar/getCityListjp';
			utils.ajaxJSONP(url, params, cb, errorcb);
		},
		/**
		 * 保存个人申请
		 */
		savePersonalApply : function(params,succCB,errorCB){
			 var url = sys.contextPath  +  "/apply/api/addApply";
			utils.ajaxJSONP(url, params, succCB, errorCB);
		}
};