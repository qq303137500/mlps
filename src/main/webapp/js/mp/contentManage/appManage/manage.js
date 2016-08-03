var manage = {
	/**
	 * 添加公告信息
	 */
	addNoticeInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/addNoticeInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 推送广播公告
	 */
	broadcast : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/broadcast';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询公告列表
	 */
	queryNoticeList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/queryNoticeList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找信息
	 */
	getNoticeById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/getNoticeById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑公告信息
	 */
	editNoticeInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/editNoticeInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 置顶公告
	 */
	topNotice : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/topNotice';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除公告
	 */
	delNotice : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/noticeInfo/delNotice';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	
	
	/**
	 * 添加新闻信息
	 */
	addNewsInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/addNewsInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询新闻列表
	 */
	queryNewsList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/queryNewsList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找信息
	 */
	getNewsById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/getNewsById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑新闻信息
	 */
	editNewsInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/editNewsInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 置顶新闻
	 */
	topNews : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/topNews';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除新闻
	 */
	delNews : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/newsInfo/delNews';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 添加产品信息
	 */
	addProductInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/addProductInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找产品信息
	 */
	getProductById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/getProductById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑产品信息
	 */
	editProductInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/editProductInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 置顶产品
	 */
	topProduct : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/topProduct';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除产品
	 */
	delProduct : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/delProduct';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询产品列表
	 */
	queryProductList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/productInfo/queryProductList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除反馈
	 */
	delUserProblemReturn : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/userProblemReturn/delUserProblemReturn';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询反馈列表
	 */
	findUserProblemReturnList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/userProblemReturn/findUserProblemReturnList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询培训列表
	 */
	queryTrainList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/queryTrainList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 添加培训信息
	 */
	addTrainInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/addTrainInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找培训信息
	 */
	getTrainById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/getTrainById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑培训信息
	 */
	editTrainInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/editTrainInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 置顶培训
	 */
	topTrain : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/topTrain';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除培训
	 */
	delTrain : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/trainInfo/delTrain';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询内刊列表
	 */
	queryMagazineList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/queryMagazineList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 添加内刊信息
	 */
	addMagazineInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/addMagazineInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找内刊信息
	 */
	getMagazineById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/getMagazineById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑内刊信息
	 */
	editMagazineInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/editMagazineInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 置顶内刊
	 */
	topMagazine : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/topMagazine';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除内刊
	 */
	delMagazine : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/magazineInfo/delMagazine';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 获取在线申请列表
	 */
	getApplyList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/apply/api/getApplyList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 查询FAQ列表
	 */
	queryFaqList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/communityFaq/queryFaqList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 添加FAQ信息
	 */
	addFaq : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/communityFaq/addFaq';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 根据ID查找FAQ信息
	 */
	getFaqById : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/communityFaq/getFaqById';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 编辑FAQ信息
	 */
	editFaqInfo : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/communityFaq/editFaqInfo';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 删除FAQ
	 */
	delFaq : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/communityFaq/delFaq';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	
	
	/**
	 * 社区主题     获取社区主题列表
	 */
	getCommunityList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/getCommunityList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题     获取社区主题详情
	 */
	getCommunity : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/getCommunity';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题     删除社区主题
	 */
	delCommunity : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/delCommunity';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题     置顶
	 */
	toTopCommunity : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/toTopCommunity';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题详情     列表
	 */
	getCommunityReplyList : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/getCommunityReplyList';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题详情     删除
	 */
	delCommunityReply : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/delCommunityReply';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	},
	
	/**
	 * 社区主题详情     回复
	 */
	addCommunityReply : function(param, successcb, errorcb) {
		var url = sys.contextPath + '/community/addCommunityReply';
		utils.ajax(url, param, successcb, errorcb,"POST", "json", false);
	}
	
	
};